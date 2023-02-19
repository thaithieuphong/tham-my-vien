const User = require("../../models/User");
const ServiceNote = require("../../models/ServiceNote");
const Reexamination = require("../../models/Reexamination");
const Customer = require("../../models/Customer");
const {
	mongooseToObject,
	multipleMongooseToObject,
} = require("../../../util/mongoose");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const path = require("path");
const rootPath = path.sep;

class ManagerController {

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
		res.redirect('/manager/general-manager')
	}

	/** Customer */
	showCustomer(req, res, next) {
		Customer.find({}).populate('userID').populate('scheduleID').populate('serviceNoteID').populate('reexamID')
			.then((customers) => {
				res.render('manager/manager-customer', {
					customers: multipleMongooseToObject(customers),
					title: 'Danh sách khách hàng'
				})
			})
			.catch(next);
		// Promise.all([Customer.find({}), User.findById({ _id: req.userId }),
		// Customer.find({storage: 'No'}), Customer.find({storage: 'Yes'})])
		// 	.then(([customers, user, customerDischargeFromHospital, customerStorage]) => {
		// 		let cusNew = [];
		// 		let cusPotential = [];
		// 		let createCusInfo = [];
		// 		let updateCusInfo = [];
		// 		let updateCusService = [];
		// 		let uploadCounselor = [];
		// 		let uploadBefore = [];
		// 		let uploadInsurgery = [];
		// 		let uploadAfter = [];
		// 		let cusSchedule = [];
		// 		let cusFail = [];
		// 		customers.forEach(customer => {
		// 			if(customer.statusCus.statusEng === 'New') {
		// 				cusNew.push(customer);
		// 			}
		// 			if(customer.statusCus.statusEng === 'Potential') {
		// 				cusPotential.push(customer);
		// 			}
		// 			if(customer.statusCus.statusEng === 'createAProfile') {
		// 				createCusInfo.push(customer);
		// 			}
		// 			if(customer.statusCus.statusEng === 'updateAProfile') {
		// 				updateCusInfo.push(customer);
		// 			}
		// 			if(customer.statusCus.statusEng === 'updateService') {
		// 				updateCusService.push(customer);
		// 			}
		// 			if(customer.statusCus.statusEng === 'uploadCounselor') {
		// 				uploadCounselor.push(customer);
		// 			}
		// 			if(customer.statusCus.statusEng === 'uploadBefore') {
		// 				uploadBefore.push(customer);
		// 			}
		// 			if(customer.statusCus.statusEng === 'uploadInsurgery') {
		// 				uploadInsurgery.push(customer);
		// 			}
		// 			if(customer.statusCus.statusEng === 'uploadAfter') {
		// 				uploadAfter.push(customer);
		// 			}
		// 			if(customer.statusCus.statusEng === 'Schedule') {
		// 				cusSchedule.push(customer);
		// 			}
		// 			if(customer.statusCus.statusEng === 'Fail') {
		// 				cusFail.push(customer);
		// 			}
		// 		})
		// 		res.render("manager/manager-customer", {
		// 			cusNew: multipleMongooseToObject(cusNew),
		// 			cusPotential: multipleMongooseToObject(cusPotential),
		// 			createCusInfo: multipleMongooseToObject(createCusInfo),
		// 			updateCusInfo: multipleMongooseToObject(updateCusInfo),
		// 			updateCusService: multipleMongooseToObject(updateCusService),
		// 			uploadCounselor: multipleMongooseToObject(uploadCounselor),
		// 			uploadBefore: multipleMongooseToObject(uploadBefore),
		// 			uploadInsurgery: multipleMongooseToObject(uploadInsurgery),
		// 			uploadAfter: multipleMongooseToObject(uploadAfter),
		// 			cusSchedule: multipleMongooseToObject(cusSchedule),
		// 			cusFail: multipleMongooseToObject(cusFail),
		// 			user: mongooseToObject(user),
		// 			customerDischargeFromHospital: multipleMongooseToObject(customerDischargeFromHospital),
		// 			customerStorage: multipleMongooseToObject(customerStorage),
		// 			title: 'Danh sách khách hàng'
		// 		});
		// 	})
		// 	.catch(next);
	}

	showCustomerDetail(req, res, next) {
		Customer.findById({ _id: req.params.id }).populate({
			path: 'serviceNoteID',
			populate: {
				path: 'performer',
				model: 'User'
			}
		})
		.populate({
			path: 'logIDs',
			model: 'Log',
			populate: {
				path: 'userID',
				model: 'User'
			}
		})
		.then((customer) => {
			console.log(customer)
			res.render('manager/manager-customer-timeline', {
				customer: mongooseToObject(customer),
				title: 'Chi tiết khách hàng'
			});
		})
		.catch(next);
	}

	userProfile(req, res, next) {
		User.findById({ _id: req.params.id })
			.then((user) => {
				res.render('manager/manager-user-profile', {
					user: mongooseToObject(user)
				})
			})
	}

	showServiceNoteDetail(req, res, next) {
		Promise.all([
			ServiceNote.findById({ _id: req.params.id }).populate({
				path: 'scheduleID',
				populate: {
					path: 'cusID',
					model: 'Customer'
				}
			}).populate('performer'),
			Reexamination.find({ serviceNoteId: req.params.id }).populate('performer')
		])
		.then(([serviceNote, reExams]) => {
			res.render('manager/manager-service-note-detail', {
				serviceNote: mongooseToObject(serviceNote),
				reExams: multipleMongooseToObject(reExams),
				title: 'Chi tiết phiếu dịch vụ'
			});
		})
		.catch(next);
	}

	showReExamDetail(req, res, next) {
		Reexamination.findById({ _id: req.params.id }).populate('customerID').populate('performer').populate('serviceNoteId')
			.then(reExam => {
				console.log(reExam)
				res.render('manager/manager-re-exam-detail', {
					reExam: mongooseToObject(reExam),
					title: 'Chi tiết phiếu tái khám'
				})
			})
	}

	// Hiển thị trang thống kê
	showStatistical(req, res, next) {
		ServiceNote.find({})
		.then(serviceNote => {
			// let services, deposit, total, equal, metaData = [];

			// serviceNote.forEach(element => {
			// 	if(element.deposit !== undefined && element.deposit !== NaN || element.total !== undefined && element.total !== NaN ) {
			// 		console.log(element.deposit)
			// 		console.log(element.total)
			// 		// console.log(element.service)
			// 		deposit = element.deposit;
			// 		total = element.total;
			// 		equal = parseFloat(deposit.replace(/\D/g, ''), 10) + parseInt(total.replace(/\D/g, ''));
			// 		if (equal !== NaN) {
			// 			metaData.push(equal)
			// 		}
			// 	}
			// })
			// console.log(metaData)
			// console.log(typeof(metaData))
			res.render('manager/manager-statistical', {
				// totalRevenue: metaData,
				serviceNote: multipleMongooseToObject(serviceNote),
				title: 'Bảng thống kê'
			})
		})
	}

	showReport(req, res, next) {
		ServiceNote.find({}).populate({
			path: 'scheduleID',
			populate: {
				path: 'cusID',
				model: 'Customer',
				populate: {
					path: 'userID',
					model: 'User'
				}
			}
		})
		.lean()
		.then(serviceNotes => {
			res.render('manager/manager-report', {
				serviceNotes: serviceNotes,
				title: 'Báo cáo doanh thu'
			});
		})
		.catch(next);
	}
}

module.exports = new ManagerController();
