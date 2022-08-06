const { mongooseToObject, multipleMongooseToObject } = require('../../../util/mongoose');
const ServiceNote = require('../../models/ServiceNote');
const Counselor = require('../../models/Counselor');

const User = require('../../models/User')
const fs = require('fs');
const appRoot = require('app-root-path');
const path = require('path');

class DoctorOperationRoomController {
	//doctor
	// , status: "Đang xử lý"
	showServiceNote(req, res, next) {
		ServiceNote.find({ stored: "No", status: "Đang xử lý", performer: req.userId }).populate('recept').populate('customerID').populate('performer').populate('nursing')
			.then((serviceNote) => {
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
							title: "Chi tiết khách hàng"
						});
					})
			})
			.catch(next);
	}



}

module.exports = new DoctorOperationRoomController;
