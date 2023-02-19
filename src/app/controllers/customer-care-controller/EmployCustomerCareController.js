const Customer = require("../../models/Customer");
const User = require("../../models/User");
const { mongooseToObject, multipleMongooseToObject } = require("../../../util/mongoose");
const ServiceNote = require('../../models/ServiceNote');
const Reexamination = require('../../models/Reexamination');
const fs = require('fs');
const path = require('path');
const rootPath = path.sep;
require('dotenv').config();


class EmployCustomerCareController {
	//BUSINESS EMPLOY

	showProfile(req, res, next) {
		User.findById({ _id: req.userId })
			.then(user => {
				res.render('profile', {
					user: mongooseToObject(user),
					title: 'Thông tin cá nhân'
				})
			})
			.catch(next);
	}

	showDashboard(req, res, next) {
		res.redirect('/customer-care/employ/customers')
	}

	/** Customer */
	showCustomer(req, res, next) {
		ServiceNote.find({ status: "Xuất viện"}).populate({
			path: 'scheduleID',
			populate: {
				path: 'cusID',
				model: 'Customer'
			}
		}).sort({updatedAt: 1})
		.then((serviceNote) => {
			res.render('customer-care/employ/employ-customer', {
				serviceNote: multipleMongooseToObject(serviceNote),
				title: 'Hồ sơ khách xuất viện - thay băng'
			})
		})
		.catch(next);
	}

	// Show customer detail
	showCustomerDetail(req, res, next) {
		ServiceNote.findById({ _id: req.params.id}).populate({
			path: 'scheduleID',
			populate: {
				path: 'cusID',
				model: 'Customer',
				populate: {
					path: 'reexamID',
					model: 'Reexamination'
				}
			}
		})
		.populate('performer')
		.then(serviceNote => {
			res.render("customer-care/employ/employ-service-note-detail", {
				serviceNote: mongooseToObject(serviceNote),
				title: 'Thông tin chi tiết của khách hàng'
			})
		})
		.catch(next);
	}

	// Tạo phiếu tái khám
	createReExam(req, res, next) {
		const reexamination = new Reexamination({ 
			createName: req.userId,
			cusID: req.body.cusID,
			serviceNoteId: req.params.id,
			status: 'Tạo mới',
			stored: 'No',
			schedule: req.body.schedule,
			times: req.body.times,
			logSchedules: [
				{
					schedule: req.body.schedule,
					reason: 'Lịch hẹn tái khám đầu tiên'
				}
			]
		})
		reexamination.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { reexamID: reexamination.id } }),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { reExamID: reexamination.id } })
		])
		.then(() => {
			req.flash('messages_createReExamination_success', 'Tạo lịch tái khám thành công');
			res.redirect("back");
		})
		.catch(next);
	}
	
	showReExamination(req, res, next) {
		Promise.all([Reexamination.find({ $or: [{ status: "Đang xử lý"}, {status: "Đã cập nhật"}, {status: "Tạo mới" }]}).populate('customerID').populate('createName').populate('serviceNoteId').sort({ schedule: 1 }), User.findById({ _id: req.userId })])
			.then(([reExams, user]) => {
				res.render('customer-care/employ/employ-re-examination', {
					title: 'Danh sách lịch thay băng',
					user: mongooseToObject(user),
					reExams: multipleMongooseToObject(reExams)
				})
			})
			.catch(next);
	}

	showReExaminationDetail(req, res, next) {
		Reexamination.findById({ _id: req.params.id }).populate('cusID').populate('serviceNoteId').populate('createName')
			.then(reExam => {
				res.render('customer-care/employ/employ-re-exam-detail', {
					reExam: mongooseToObject(reExam),
					title: "Chi tiết phiếu tái khám"
				})
			})
			.catch(next);
	}

	// Sửa lịch hẹn tái khám
	editReExam(req, res, next) {
		Reexamination.findByIdAndUpdate({ _id: req.params.id }, { schedule: req.body.schedule,
			$push: {logSchedules: [{ 
				schedule: req.body.schedule,
				reason: req.body.reason
			}]}
		})
		.then(() => {
			req.flash('messages_editReExamination_success', 'Sửa lịch hẹn tái khám thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Cập nhật phiếu tái khám hoàn thành
	updateReExamDone(req, res, next) {
		Reexamination.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: "Hoàn thành"} })
		.then(() => {
			res.redirect('back');
		})
		.catch(next);
	}

	// Cập nhật hồ sơ khách hàng hoàn thành
	updateServiceNoteDone(req, res, next) {
		let updateCus = {
			$set: { statusCus: { statusVi: 'Lưu hồ sơ', statusEng: 'records'}, storage: 'Yes' },
			$push: { logStatus: { statusCus: {statusVi: 'Lưu hồ sơ', statusEng: 'records'}, surgeryDay: req.body.surgeryDay}}
		}
		Promise.all([
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: "Lưu hồ sơ"} }),
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateCus)
		])
		.then(() => {
			res.redirect('back');
		})
		.catch(next);
	}

	// Hiển thị hồ sơ lưu trữ khách hàng
	showStorage(req, res, next) {
		Customer.find({ statusCus: { statusVi: 'Lưu hồ sơ', statusEng: 'records' }, storage: 'Yes'}).populate('serviceNoteID')
			.then(customers => {
				res.render('customer-care/employ/employ-customer-storage', {
					customers: multipleMongooseToObject(customers),
					title: "Kho hồ sơ khách hàng"
				})
			})
			.catch(next);
	}

	// Hiển thị chi tiết khách hàng trong kho hồ sơ
	showCustomerStorageDetail(req, res, next) {
		Customer.findById({ _id: req.params.id }).populate({
			path: 'serviceNoteID',
			match: {
				status: 'Lưu hồ sơ'
			},
			populate: {
				path: 'performer'
			}
		})
		.then((customer) => {
			res.render('customer-care/employ/employ-customer-storage-detail', {
				title: 'Chi tiết khách hàng',
				customer: mongooseToObject(customer)
			})
		})
		.catch(next);
	}
}

module.exports = new EmployCustomerCareController();
