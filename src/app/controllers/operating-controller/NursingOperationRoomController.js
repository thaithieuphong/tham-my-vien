const User = require('../../models/User');
const { multipleMongooseToObject, mongooseToObject } = require('../../../util/mongoose');
const ServiceNote = require('../../models/ServiceNote');
const Reexamination = require('../../models/Reexamination');

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

	showDashboard(req, res, next){
		User.findById({ _id: req.userId })
			.then((user) => {
				res.render("operating/nursing/over-view", {
					user: mongooseToObject(user),
					title: 'Tong Quan'
				})
			})
	}

	showServiceNote(req, res, next) {
		Promise.all([ServiceNote.find({ stored: "No", status: "Đang xử lý", nursing: req.userId }).populate('recept').populate('customerID').populate('performer').populate('nursing'), User.findById({ _id: req.userId})])
			.then(([serviceNote, user]) => {
				// const cln = [];
				// serviceNote.forEach(element => {
				// 	let clns = element.counselorName;
				// 	for (const element of clns) {
				// 		cln.push(element);
				// 	}
				// 	return cln;

				// })
				// Counselor.find({ filename: { $in: cln } })
				// 	.then((counselors) => {
				res.render("operating/nursing/operating-service-note", {
					serviceNote: multipleMongooseToObject(serviceNote),
					user: mongooseToObject(user),
					// counselors: multipleMongooseToObject(counselors),
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
		// res.json(req.body)
		// console.log(req.params.id)
		Promise.all([
			ServiceNote.find({ _id: req.params.id }).updateOne({ $set: { status: "Hoàn thành" } }),
			User.updateMany({ _id: { $in: req.body.operatingID } }, { $set: { state: "Medium" } }),
		])
			.then(() => {
				res.redirect('back')
			})
			.catch(next);
	}

	updateReExamination(req, res, next) {
		// res.json(req.params)
		// console.log(req.params.id)
		Promise.all([
			Reexamination.find({ _id: req.params.id }).updateOne({ $set: { status: "Hoàn thành" } }),
			User.updateMany({ _id: { $in: req.body.operatingID } }, { $set: { state: "Medium" } })
		])
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
		// res.json(req.body)
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
}

module.exports = new NursingController;
