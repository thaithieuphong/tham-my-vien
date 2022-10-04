const { mongooseToObject, multipleMongooseToObject } = require('../../../util/mongoose');
const ServiceNote = require('../../models/ServiceNote');
const Reexamination = require('../../models/Reexamination');
const Customer = require('../../models/Customer');
const User = require('../../models/User');
const path = require('path');
const { model } = require('mongoose');
const rootPath = path.sep;

class DoctorOperationRoomController {

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

	showSchedule(req, res, next){
		Promise.all([
			User.findById({ _id: req.userId }),
			ServiceNote.find({ status: "Tạo mới" }).populate('customerID')
		])
		.then(([user, serviceNotes]) => {
			console.log('service notes', serviceNotes)
			res.render("operating/doctor/schedule", {
				user: mongooseToObject(user),
				serviceNotes: multipleMongooseToObject(serviceNotes),
				title: "Lịch hẹn phẩu thuật"
			})
		})
		.catch(next);
	}

	showScheduleDetail(req, res, next) {
		ServiceNote.findById({ _id: req.params.id}).populate('customerID').populate('createName')
			.then((serviceNote) => {
				console.log('service note', serviceNote)
				res.render('operating/doctor/schedule-detail', {
					serviceNote: mongooseToObject(serviceNote),
					title: 'Chi tiết lịch hẹn'
				})
			})
			.catch(next);
	}

	showCustomer(req, res, next) {
		Promise.all([Customer.find({}).populate({
			path: 'serviceNoteID',
			model: 'ServiceNote'
		}), User.findById({ _id: req.userId })])
			.then(([customers, user]) => {
				res.render("operating/doctor/customers", {
					customers:  multipleMongooseToObject(customers),
					user: mongooseToObject(user), 
					title: "Danh sách khách hàng"
				});
			})
			.catch(next);
	}

	showReExamination(req, res, next) {
		Promise.all([Reexamination.findOne({ stored: "No", status: "Đang xử lý", performer: req.userId }).populate('recept').populate('customerID').populate('performer').populate('nursing').populate('serviceNoteId'), User.findById({ _id: req.userId })])
			.then(([reExam, user]) => {
				res.render("operating/doctor/operating-re-exam", {
					reExam: mongooseToObject(reExam),
					user: mongooseToObject(user),
					title: "Phiếu tái khám"
				})
			})
			.catch(next);

	}
}

module.exports = new DoctorOperationRoomController;
