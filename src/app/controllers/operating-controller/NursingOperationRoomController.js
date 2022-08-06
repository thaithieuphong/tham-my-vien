const User = require('../../models/User');
const { multipleMongooseToObject, mongooseToObject } = require('../../../util/mongoose');
const ServiceNote = require('../../models/ServiceNote');
const Counselor = require('../../models/Counselor');







class UserController {

	showServiceNote(req, res, next) {
		ServiceNote.find({ stored: "No", status: "Đang xử lý", nursing: req.userId } ).populate('recept').populate('customerID').populate('performer').populate('nursing')
		.then((serviceNote) => {
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
					res.redirect('back')
				})
				.catch(next);
	}

	uploadBefore(req, res, next){
		// const file = req.files;
		// const fn = []
		// file.forEach(element => {
		// 	fn.push(element.filename)
		// 	return fn;
		// })
		// ServiceNote.findByIdAndUpdate({_id: req.params.id},{$push: {beforeName: fn}})
		// 	.then(() => {
		// 		res.redirect('back')
		// 	})
		// 	.catch(next);
		res.json(req.body)
	}

	uploadAfter(req, res, next){
		res.json(req.body)
	}

}

module.exports = new UserController;
