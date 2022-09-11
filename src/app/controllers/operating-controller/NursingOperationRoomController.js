const User = require('../../models/User');
const { multipleMongooseToObject, mongooseToObject } = require('../../../util/mongoose');
const ServiceNote = require('../../models/ServiceNote');
const Reexamination = require('../../models/Reexamination');
const Customer = require('../../models/Customer');
const path = require('path');
const rootPath = path.sep;

class NursingController {

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
		Promise.all([
			User.findById({ _id: req.userId }),
			ServiceNote.find({status: "Hoàn thành", nursing: req.userId}).populate('recept').populate('customerID').populate('performer').populate('nursing')

		])
		.then(([user, serviceNotes]) => {
			res.render("operating/nursing/over-view", {
				user: mongooseToObject(user),
				serviceNotes: multipleMongooseToObject(serviceNotes),
				title: "Chi tiết khách hàng"
			})
		})
		.catch(next);
	}

	showServiceNote(req, res, next) {
		Promise.all([ServiceNote.find({ stored: "No", status: "Đang xử lý", nursing: req.userId }).populate('recept').populate('customerID').populate('performer').populate('nursing'),
		User.findById({ _id: req.userId })])
			.then(([serviceNote, user]) => {
				res.render("operating/nursing/operating-service-note", {
					serviceNote: multipleMongooseToObject(serviceNote),
					title: "Chi tiết khách hàng"
				})
			})
			// })
			.catch(next);
	}

	showReExamination(req, res, next) {
		Promise.all([Reexamination.find({ stored: "No", status: "Đang xử lý", nursing: req.userId }).populate('recept').populate('customerID').populate('performer').populate('nursing').populate('serviceNoteId'), User.findById({ _id: req.userId })])
			.then(([reExam, user]) => {
				res.render("operating/nursing/operating-re-exam", {
					reExam: multipleMongooseToObject(reExam),
					user: mongooseToObject(user),
					title: "Chi tiết khách hàng"
				})
			})
			// })
			.catch(next);

	}

	updateServiceNote(req, res, next) {
		console.log('req body', req.body)
		ServiceNote.find({ _id: req.params.id }).updateOne({ $set: { status: "Hoàn thành", stepsToTake: req.body.stepsToTake } })
			.then(() => {
				res.redirect('back')
			})
			.catch(next);
	}

	updateReExamination(req, res, next) {
		Reexamination.find({ _id: req.params.id }).updateOne({ $set: { status: "Hoàn thành", stepsToTake: req.body.stepsToTake } })
			.then(() => {
				res.redirect('back')
			})
			.catch(next);
	}


	uploadBefore(req, res, next) {
		const file = req.files;
		const fnimg = [];
		const fnvideo = []
		file.forEach(element => {
			if (element.mimetype === 'image/jpg' || element.mimetype === 'image/jpeg' || element.mimetype === 'image/png') {
				fnimg.push(element.filename);
				return fnimg;
			} else if (element.mimetype === 'video/avi' || element.mimetype === 'video/flv' || element.mimetype === 'video/wmv' || element.mimetype === 'video/mov' || element.mimetype === 'video/mp4' || element.mimetype === 'video/webm') {
				fnvideo.push(element.filename);
				return fnvideo;
			}
		})
		ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { beforeImg: fnimg, beforeVideo: fnvideo } })
			.then(() => {
				res.redirect('back')
			})
			.catch(next);
	}

	uploadAfter(req, res, next) {
		const file = req.files;
		const fnimg = [];
		const fnvideo = []
		file.forEach(element => {
			if (element.mimetype === 'image/jpg' || element.mimetype === 'image/jpeg' || element.mimetype === 'image/png') {
				fnimg.push(element.filename);
				return fnimg;
			} else if (element.mimetype === 'video/avi' || element.mimetype === 'video/flv' || element.mimetype === 'video/wmv' || element.mimetype === 'video/mov' || element.mimetype === 'video/mp4' || element.mimetype === 'video/webm') {
				fnvideo.push(element.filename);
				return fnvideo;
			}
		})
		ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { afterImg: fnimg, afterVideo: fnvideo } })
			.then(() => {
				res.redirect('back')
			})
			.catch(next);
	}

	uploadReExam(req, res, next) {
		const file = req.files;
		const fnimg = [];
		const fnvideo = []
		file.forEach(element => {
			if (element.mimetype === 'image/jpg' || element.mimetype === 'image/jpeg' || element.mimetype === 'image/png') {
				fnimg.push(element.filename);
				return fnimg;
			} else if (element.mimetype === 'video/avi' || element.mimetype === 'video/flv' || element.mimetype === 'video/wmv' || element.mimetype === 'video/mov' || element.mimetype === 'video/mp4' || element.mimetype === 'video/webm') {
				fnvideo.push(element.filename);
				return fnvideo;
			}
		})
		Reexamination.findByIdAndUpdate({ _id: req.params.id }, { $push: { reExamImg: fnimg, reExamVideo: fnvideo } })
			.then(() => {
				res.redirect('back')
			})
			.catch(next);
	}

	createReExam(req, res, next) {
		const reexamination = new Reexamination({
			customerID: req.body.customerID,
			createName: req.body.createName,
			serviceNoteId: req.body.serviceNoteID,
			status: "Tạo mới",
			schedule: req.body.schedule,
			comments: { comment: req.body.comment },
		})
		reexamination.save();
		console.log('re-ex id', reexamination.id);
		Customer.findByIdAndUpdate({ _id: req.body.customerID }, { $push: { reexamID: reexamination.id } })
			.then(() => {
				req.flash('messages_createReExamination_success', 'Tạo phiếu tái khám thành công');
				res.redirect('back');

			})
	}
}

module.exports = new NursingController;
