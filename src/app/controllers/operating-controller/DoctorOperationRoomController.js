const { mongooseToObject, multipleMongooseToObject } = require('../../../util/mongoose');
const ServiceNote = require('../../models/ServiceNote');
const User = require('../../models/User')

class DoctorOperationRoomController {
	//doctor
	showServiceNote(req, res, next) {
		ServiceNote.findDeleted({ stored: "No" })
			.then((serviceNotes) => {

				res.render("operating/doctor/operating-service-note", {
					serviceNotes: multipleMongooseToObject(serviceNotes),
					title: "Phiếu dịch vụ"
				});
			})
			.catch(next);
	}

	updateServiceNote(req, res, next) {
		// ServiceNote.findByIdAndUpdate({ _id: req.params.id }, {$push: {services: {before: req.body.before, after: req.body.afer} }})
		// 	.then(() => {

		// 		res.redirect("back")
		// 	})
		// 	.catch(next)
		res.json(req.body);
	}

}

module.exports = new DoctorOperationRoomController;
