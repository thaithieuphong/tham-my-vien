const { mongooseToObject, multipleMongooseToObject } = require('../../../util/mongoose');
const ServiceNote = require('../../models/ServiceNote');
const Counselor = require('../../models/Counselor');
const Reexamination = require('../../models/Reexamination');
const User = require('../../models/User');


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
			.then(user => {
				res.render('operating/doctor/over-view', {
					user: mongooseToObject(user),
					title: 'Thông tin cá nhân'
				})
			})
			.catch(next);
	}

	showServiceNote(req, res, next) {
		Promise.all([ServiceNote.find({ stored: "No", status: "Đang xử lý", performer: req.userId }).populate('recept').populate('customerID').populate('performer').populate('nursing'), User.findById({ _id: req.userId })])
			.then(([serviceNote, user]) => {
				// console.log(serviceNote)
				const cln = [];
				serviceNote.forEach(element => {
					let clns = element.counselorName;
					for( const element of clns){
						cln.push(element);
					}
					return cln;

				})
				Counselor.find({ filename: {$in: cln} })
					.then((counselors) => {
						console.log(counselors)
						res.render("operating/doctor/operating-service-note", {
							serviceNote:  multipleMongooseToObject(serviceNote),
							counselors: multipleMongooseToObject(counselors), 
							user: mongooseToObject(user), 
							title: "Chi tiết khách hàng"
						});
					})
			})
			// })
			.catch(next);
	}

	showReExamination(req, res, next) {
		Reexamination.find({ stored: "No", status: "Đang xử lý", performer: req.userId }).populate('recept').populate('customerID').populate('performer').populate('nursing').populate('serviceNoteId')
			.then((reExam) => {
				res.render("operating/doctor/operating-re-exam", {
					reExam: multipleMongooseToObject(reExam),

					title: "Chi tiết khách hàng"
				})
			})
			// })
			.catch(next);

	}




}

module.exports = new DoctorOperationRoomController;
