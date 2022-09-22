const { mongooseToObject, multipleMongooseToObject } = require('../../../util/mongoose');
const ServiceNote = require('../../models/ServiceNote');
const Reexamination = require('../../models/Reexamination');
const User = require('../../models/User');
const path = require('path');
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

	showDashboard(req, res, next){
		Promise.all([
			User.findById({ _id: req.userId }),
			ServiceNote.find({status: "Hoàn thành", doctor: req.userId}).populate('recept').populate('customerID').populate('performer').populate('nursing')
		])
		.then(([user, serviceNotes]) => {
			res.render("operating/doctor/over-view", {
				user: mongooseToObject(user),
				serviceNotes: multipleMongooseToObject(serviceNotes),
				title: "Phiếu hoàn thành"
			})
		})
		.catch(next);
	}

	showServiceNote(req, res, next) {
		Promise.all([ServiceNote.findOne({ stored: "No", status: "Đang xử lý", performer: req.userId }).populate('recept').populate('customerID').populate('performer').populate('nursing'), User.findById({ _id: req.userId })])
			.then(([serviceNote, user]) => {
				res.render("operating/doctor/operating-service-note", {
					serviceNote:  mongooseToObject(serviceNote),
					user: mongooseToObject(user), 
					title: "Phiếu phẩu thuật"
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
