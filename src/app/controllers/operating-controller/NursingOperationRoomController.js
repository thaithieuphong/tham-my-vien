const User = require('../../models/User');
const { multipleMongooseToObject, mongooseToObject } = require('../../../util/mongoose');
const ServiceNote = require('../../models/ServiceNote');






class UserController {

	showServiceNote(req, res, next) {
		console.log(req.userId);
		ServiceNote.find({ stored: "No", status: "Đang xử lý", nursing: req.userId } ).populate('recept').populate('customerID').populate('performer').populate('nursing')
			.then((serviceNotes) => {
				// serviceNotes.forEach(element => console.log(element.performer))
				res.render("operating/nursing/operating-service-note", {
					serviceNotes: multipleMongooseToObject(serviceNotes),
					title: "Phiếu dịch vụ"
				});	
			})
			.catch(next);
	}

	updateServiceNote(req, res, next) {
		// res.json(req.body)
		// console.log(req.params.id)
		Promise.all([
			ServiceNote.findDeleted({_id: req.params.id}).updateOne({$set: {status: "Hoàn thành"}}),	
			User.updateMany({_id: {$in: req.body.operatingID}},{$set: {state:"Medium"}})
		])
				.then((serviceNote) => {
					console.log("serviceNote:",serviceNote)
					res.redirect('back')
				})
				.catch(next);
	}

}

module.exports = new UserController;
