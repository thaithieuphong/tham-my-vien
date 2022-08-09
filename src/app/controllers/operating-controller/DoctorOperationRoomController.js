const { mongooseToObject, multipleMongooseToObject } = require('../../../util/mongoose');
const ServiceNote = require('../../models/ServiceNote');
const Counselor = require('../../models/Counselor');
const Reexamination = require('../../models/Reexamination');



class DoctorOperationRoomController {
	//doctor
	// , status: "Đang xử lý"

	showDashboard(req, res, next){
		res.render("operating/doctor/over-view")
	}

	showServiceNote(req, res, next) {
		ServiceNote.find({ stored: "No", status: "Đang xử lý", performer: req.userId }).populate('recept').populate('customerID').populate('performer').populate('nursing')
			.then((serviceNote) => {
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
				res.render("operating/doctor/operating-service-note", {
					serviceNote: multipleMongooseToObject(serviceNote),
					// counselors: multipleMongooseToObject(counselors),
					title: "Chi tiết khách hàng"
				})
			})
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
