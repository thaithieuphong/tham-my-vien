const { mongooseToObject, multipleMongooseToObject } = require('../../../util/mongoose');
const ServiceNote = require('../../models/ServiceNote');
const Counselor = require('../../models/Counselor');
const Reexamination = require('../../models/Reexamination');
const User = require('../../models/User');
const bcrypt = require("bcryptjs");


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
		User.findById({ _id: req.userId })
			.then(() => {
				res.redirect('/operating-room/doctor/service-note')
			})
			.catch(next);
	}

	showServiceNote(req, res, next) {
		Promise.all([ServiceNote.find({ stored: "No", status: "Đang xử lý", performer: req.userId }).populate('recept').populate('customerID').populate('performer').populate('nursing'), User.findById({ _id: req.userId })])
			.then(([serviceNote, user]) => {
				res.render("operating/doctor/operating-service-note", {
					serviceNote:  multipleMongooseToObject(serviceNote),
					user: mongooseToObject(user), 
					title: "Chi tiết khách hàng"
				});
			})
			.catch(next);
	}

	showReExamination(req, res, next) {
		Promise.all([Reexamination.find({ stored: "No", status: "Đang xử lý", performer: req.userId }).populate('recept').populate('customerID').populate('performer').populate('nursing').populate('serviceNoteId'), User.findById({ _id: req.userId })])
			.then(([reExam, user]) => {
				res.render("operating/doctor/operating-re-exam", {
					reExam: multipleMongooseToObject(reExam),
					user: mongooseToObject(user),
					title: "Chi tiết khách hàng"
				})
			})
			.catch(next);

	}

	changePassword(req, res, next) {
		User.findById({ _id: req.userId })
			.then((user) => {
				var result = bcrypt.compareSync(req.body.oldPass, user.password)
				if(result){
					User.findByIdAndUpdate({ _id: req.userId },{ password: bcrypt.hashSync(req.body.newPass, 8)})
						.then(() =>{
							res.redirect('/')
						})
				}
			})
			.catch(next);
		// res.json(req.body);
	}



}

module.exports = new DoctorOperationRoomController;
