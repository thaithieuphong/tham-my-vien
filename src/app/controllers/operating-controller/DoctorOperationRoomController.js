const { mongooseToObject, multipleMongooseToObject } = require('../../../util/mongoose');
const ServiceNote = require('../../models/ServiceNote');
const User = require('../../models/User')

class DoctorOperationRoomController {
	//doctor
	showServiceNote(req, res, next) {
		ServiceNote.findDeleted({ stored: "No" }).populate('recept').populate('customerID')
			.then((serviceNotes) => {
				res.render("operating/doctor/operating-service-note", {
					serviceNotes: multipleMongooseToObject(serviceNotes),
					title: "Phiếu dịch vụ"
				});
			})
			.catch(next);
	}

	updateServiceNote(req, res, next) {
		// res.json(req.params)
		Promise.all([
			ServiceNote.findByIdAndUpdate({_id: req.params.id}, {$set : {status: "Hoàn thành"}}),
			User.findByIdAndUpdate({})
		])
			.then(() => res.redirect('back'))
			.catch(next);
	}

}

module.exports = new DoctorOperationRoomController;
