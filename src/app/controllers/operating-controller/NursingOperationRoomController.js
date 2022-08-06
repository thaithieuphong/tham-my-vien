const User = require('../../models/User');
const { multipleMongooseToObject, mongooseToObject } = require('../../../util/mongoose');
const ServiceNote = require('../../models/ServiceNote');
const Counselor = require('../../models/Counselor');







class UserController {

	showServiceNote(req, res, next) {
		console.log(req.userId);
		ServiceNote.find({ stored: "No", status: "Đang xử lý", nursing: req.userId } ).populate('recept').populate('customerID').populate('performer').populate('nursing')
		.then((serviceNote) => {
			console.log(serviceNote.customerID)
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
					res.render("operating/nursing/operating-service-note", {
						serviceNote:  multipleMongooseToObject(serviceNote),
						counselors: multipleMongooseToObject(counselors), 
						title: "Chi tiết khách hàng"
					});
				})
		})
		.catch(next);
	}

	updateServiceNote(req, res, next) {
		// res.json(req.body)
		// console.log(req.params.id)
		Promise.all([
			ServiceNote.find({_id: req.params.id}).updateOne({$set: {status: "Hoàn thành"}}),	
			User.updateMany({_id: {$in: req.body.operatingID}},{$set: {state:"Medium"}})
		])
				.then((serviceNote) => {
					console.log("serviceNote:",serviceNote)
					res.redirect('back')
				})
				.catch(next);
	}

	uploadBefore(req, res, next){
		console.log("req", req)
		res.redirect('back')
	}

}

module.exports = new UserController;
