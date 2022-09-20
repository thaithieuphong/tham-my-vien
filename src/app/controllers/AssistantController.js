const ServiceNote = require("../models/ServiceNote");
const Customer = require("../models/Customer")
const User = require("../models/User");
const User1 = require('../models/User');
const User2 = require('../models/User');
const path = require('path');
const rootPath = path.sep;
const Reexamination = require('../models/Reexamination');

const {
	multipleMongooseToObject,
	mongooseToObject,
} = require("../../util/mongoose");

class AssistantController {

	getAssistantProfile(req, res, next) {
		User.findById({ _id: req.userId })
			.then(user => {
				res.render('profile', {
					layout: false,
					user: mongooseToObject(user),
					title: 'Thông tin cá nhân'
				})
			})
			.catch(next);
	}

	//CUSTOMER
	getAssistantCustomer(req, res, next) {
		Customer.find().populate('userID')
			.then(customers => {
				res.render("assistant/assistant-customer", {
					customers: multipleMongooseToObject(customers),
					title: 'Quản lý khách hàng'
				});
			})
			.catch(next);
	}

	deleteCustomer(req, res, next) {
		Promise.all([ServiceNote.delete({ customerID: req.params.id }), Reexamination.delete({ customerID: req.params.id }), Customer.delete({ _id: req.params.id }).populate('userID')])
			.then(() => {
				res.redirect('back');
			})
	}

	getAssistantCustomerDetail(req, res, next) {
		Customer.findById(req.params.id).populate('serviceNoteID').populate('reexamID')
			.then((customer) => {
				res.render("assistant/assistant-customer-detail", {
					customer: mongooseToObject(customer),
					title: 'Thông tin khách hàng'
				});
			})
			.catch(next);
	}
	//END CUSTOMER

	//RE-EXAMINATION
	getAssistantReExamination(req, res, next) {
		Reexamination.find({}).populate('customerID')
			.then((reExaminations) => {
				res.render('assistant/assistant-re-examination', {
					reExaminations: multipleMongooseToObject(reExaminations),
					title: 'Phiếu tái khám'
				});
			})
			.catch(next);
	}

	getAssistantReExaminationDetail(req, res, next) {
		Reexamination.findById({ _id: req.params.id }).populate('customerID').populate('serviceNoteId').populate('createName').populate('performer').populate('nursing').populate('recept')
		.then(reExamination => {
			if (reExamination.status === 'Tạo mới') {
				let reExaminationData = {
					reExaminationId: reExamination._id,
					customerId: reExamination.customerID._id,
					customerFullName: `${reExamination.customerID.firstName} ${reExamination.customerID.lastName}`,
					customerDescription: reExamination.customerID.description,
					customerComments: multipleMongooseToObject(reExamination.customerID.comments),
					createNameId: reExamination.createName._id,
					createNameFullName: `${reExamination.createName.firstName} ${reExamination.createName.lastName}`,
					createNameDepartment: reExamination.createName.department,
					createNamePosition: reExamination.createName.position,
					performers: multipleMongooseToObject(reExamination.performer),
					nursings: multipleMongooseToObject(reExamination.nursing),
					status: reExamination.status,
					service: reExamination.serviceNoteId.service,
					counselorImg: reExamination.serviceNoteId.counselorImg,
					counselorVideo: reExamination.serviceNoteId.counselorVideo,
					beforeImg: reExamination.serviceNoteId.beforeImg,
					beforeVideo: reExamination.serviceNoteId.beforeVideo,
					afterImg: reExamination.serviceNoteId.afterImg,
					afterVideo: reExamination.serviceNoteId.afterVideo,
					reExamImg: reExamination.reExamImg,
					reExamVideo: reExamination.reExamVideo,
					comments: multipleMongooseToObject(reExamination.comments),
					stepsToTake: reExamination.stepsToTake,
					schedule: reExamination.schedule,
					price: reExamination.price,
					createdAt: reExamination.createdAt,
					updatedAt: reExamination.updatedAt,
					receptId: '',
					receptFullName: '',
					receptDepartment: '',
					receptPosition: '',
					stored: reExamination.stored
				}
				res.render('assistant/assistant-re-examination-detail', {
					reExamination: reExaminationData,
					title: 'Chi tiết phiếu tái khám'
				})
			} else {
				let reExaminationData = {
					reExaminationId: reExamination._id,
					customerId: reExamination.customerID._id,
					customerFullName: `${reExamination.customerID.firstName} ${reExamination.customerID.lastName}`,
					customerDescription: reExamination.customerID.description,
					customerComments: multipleMongooseToObject(reExamination.customerID.comments),
					createNameId: reExamination.createName._id,
					createNameFullName: `${reExamination.createName.firstName} ${reExamination.createName.lastName}`,
					createNameDepartment: reExamination.createName.department,
					createNamePosition: reExamination.createName.position,
					performers: multipleMongooseToObject(reExamination.performer),
					nursings: multipleMongooseToObject(reExamination.nursing),
					status: reExamination.status,
					service: reExamination.serviceNoteId.service,
					counselorImg: reExamination.serviceNoteId.counselorImg,
					counselorVideo: reExamination.serviceNoteId.counselorVideo,
					beforeImg: reExamination.serviceNoteId.beforeImg,
					beforeVideo: reExamination.serviceNoteId.beforeVideo,
					afterImg: reExamination.serviceNoteId.afterImg,
					afterVideo: reExamination.serviceNoteId.afterVideo,
					reExamImg: reExamination.reExamImg,
					reExamVideo: reExamination.reExamVideo,
					comments: multipleMongooseToObject(reExamination.comments),
					stepsToTake: reExamination.stepsToTake,
					schedule: reExamination.schedule,
					price: reExamination.price,
					createdAt: reExamination.createdAt,
					updatedAt: reExamination.updatedAt,
					receptId: reExamination.recept._id,
					receptFullName: `${reExamination.recept.firstName} ${reExamination.recept.lastName}`,
					receptDepartment: reExamination.recept.department,
					receptPosition: reExamination.recept.position,
					stored: reExamination.stored
				}
				res.render('assistant/assistant-re-examination-detail', {
					reExamination: reExaminationData,
					title: 'Chi tiết phiếu tái khám'
				})
			}
		})
	}

	deleteReExamination(req, res, next) {
		Reexamination.delete({ _id: req.params.id })
			.then(() => res.redirect("back"))
			.catch(next);
	}

	//SERVICE NOTE

	deleteServiceNote(req, res, next) {
		Promise.all([Reexamination.delete({ serviceNoteId: req.params.id }), ServiceNote.delete({ _id: req.params.id }),
		ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $set: { stored: "Yes" } })])
			.then(() => res.redirect("back"))
			.catch(next);
	}

	//PATCH RESTORE
	restoreServiceNote(req, res, next) {
		Promise.all([ServiceNote.restore({ _id: req.params.id }),
		ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $set: { stored: "No" } })])
			.then(() => res.redirect("back"))
			.catch(next);

	}

	getAssistantServiceNote(req, res, next) {
		ServiceNote.find({}).populate('customerID')
			.then((serviceNotes) => {
				res.render('assistant/assistant-service-note', {
					serviceNotes: multipleMongooseToObject(serviceNotes),
					title: 'Danh sách phiếu phẩu thuật'
				})
			})
			.catch(next)
	}

	getAssistantServiceNoteDetail(req, res, next) {
		ServiceNote.findById({ _id: req.params.id }).populate('customerID').populate('createName').populate('performer').populate('nursing').populate('recept')
			.then(serviceNote => {
				if (serviceNote.status === 'Tạo mới') {
					let serviceNoteData = {
						serviceNoteId: serviceNote._id,
						customerId: serviceNote.customerID._id,
						customerFullName: `${serviceNote.customerID.firstName} ${serviceNote.customerID.lastName}`,
						customerDescription: serviceNote.customerID.description,
						customerComments: multipleMongooseToObject(serviceNote.customerID.comments),
						createNameId: serviceNote.createName._id,
						createNameFullName: `${serviceNote.createName.firstName} ${serviceNote.createName.lastName}`,
						createNameDepartment: serviceNote.createName.department,
						createNamePosition: serviceNote.createName.position,
						performers: multipleMongooseToObject(serviceNote.performer),
						nursings: multipleMongooseToObject(serviceNote.nursing),
						status: serviceNote.status,
						service: serviceNote.service,
						counselorImg: serviceNote.counselorImg,
						counselorVideo: serviceNote.counselorVideo,
						beforeImg: serviceNote.beforeImg,
						beforeVideo: serviceNote.beforeVideo,
						afterImg: serviceNote.afterImg,
						afterVideo: serviceNote.afterVideo,
						comments: multipleMongooseToObject(serviceNote.comments),
						stepsToTake: serviceNote.stepsToTake,
						schedule: serviceNote.schedule,
						price: serviceNote.price,
						createdAt: serviceNote.createdAt,
						updatedAt: serviceNote.updatedAt,
						receptId: '',
						receptFullName: '',
						receptDepartment: '',
						receptPosition: '',
						stored: serviceNote.stored
					}
					res.render('assistant/assistant-service-note-detail', {
						serviceNote: serviceNoteData,
						title: 'Chi tiết phiếu phẩu thuật'
					})
				} else {
					let serviceNoteData = {
						serviceNoteId: serviceNote._id,
						customerId: serviceNote.customerID._id,
						customerFullName: `${serviceNote.customerID.firstName} ${serviceNote.customerID.lastName}`,
						customerDescription: serviceNote.customerID.description,
						customerComments: multipleMongooseToObject(serviceNote.customerID.comments),
						createNameId: serviceNote.createName._id,
						createNameFullName: `${serviceNote.createName.firstName} ${serviceNote.createName.lastName}`,
						createNameDepartment: serviceNote.createName.department,
						createNamePosition: serviceNote.createName.position,
						performers: multipleMongooseToObject(serviceNote.performer),
						nursings: multipleMongooseToObject(serviceNote.nursing),
						status: serviceNote.status,
						service: serviceNote.service,
						counselorImg: serviceNote.counselorImg,
						counselorVideo: serviceNote.counselorVideo,
						beforeImg: serviceNote.beforeImg,
						beforeVideo: serviceNote.beforeVideo,
						afterImg: serviceNote.afterImg,
						afterVideo: serviceNote.afterVideo,
						comments: multipleMongooseToObject(serviceNote.comments),
						stepsToTake: serviceNote.stepsToTake,
						schedule: serviceNote.schedule,
						price: serviceNote.price,
						createdAt: serviceNote.createdAt,
						updatedAt: serviceNote.updatedAt,
						receptId: serviceNote.recept._id,
						receptFullName: `${serviceNote.recept.firstName} ${serviceNote.recept.lastName}`,
						receptDepartment: serviceNote.recept.department,
						receptPosition: serviceNote.recept.position,
						stored: serviceNote.stored
					}
					res.render('assistant/assistant-service-note-detail', {
						serviceNote: serviceNoteData,
						title: 'Chi tiết phiếu phẩu thuật'
					})
				}
			})
	}

	getAssistantCoordinatorServiceNote(req, res, next) {
		Promise.all([User.findById({ _id: req.userId }),
			ServiceNote.find({ stored: null }).sort({ schedule: 1 }).populate('customerID').populate('createName'),
			User1.find({ departmentEng: 'operating-room', positionEng: 'doctor'}),
			User2.find({ departmentEng: 'operating-room', positionEng: 'nursing'}),
		])
			.then(([user, serviceNotes, doctors, nursings]) => {
				let mediumDoctors = [];
				let mediumNursings = [];
				doctors.forEach(doctor => doctor.stateUser === 'Medium' ? mediumDoctors.push(doctor) : null);
				nursings.forEach(nursing => nursing.stateUser === 'Medium' ? mediumNursings.push(nursing) : null);
				res.render('assistant/assistant-coordinator-service-note', {
					user: mongooseToObject(user),
					serviceNotes: multipleMongooseToObject(serviceNotes),
					doctors: multipleMongooseToObject(mediumDoctors),
					nursings: multipleMongooseToObject(mediumNursings),
					title: "Lịch hẹn phẩu thuật"
				})
			})
			.catch(next);
	}
	
	deleteAssistantCoordinatorServiceNote(req, res, next) {
		Promise.all([Customer.findByIdAndUpdate({ _id: req.body.cusID }, {$pull: {serviceNoteID: req.params.id}}), ServiceNote.findByIdAndDelete({ _id: req.params.id })])
		// ServiceNote.findById({ _id: req.params.id }).populate('customerID')
			.then(() => {
				res.redirect("back")
			})
			.catch(next);
	}

	getAssistantCoordinatorReExamination(req, res, next) {
		Promise.all([User.findById({ _id: req.userId }),
			Reexamination.find({ stored: null }).sort({ schedule: 1 }).populate('customerID').populate('createName').populate('serviceNoteId'),
			User1.find({ departmentEng: 'operating-room', positionEng: 'doctor'}),
			User2.find({ departmentEng: 'operating-room', positionEng: 'nursing'}),
		])
			.then(([user, reexams, doctors, nursings]) => {
				let mediumDoctors = [];
				let mediumNursings = [];
				doctors.forEach(doctor => doctor.stateUser === 'Medium' ? mediumDoctors.push(doctor) : null);
				nursings.forEach(nursing => nursing.stateUser === 'Medium' ? mediumNursings.push(nursing) : null);
				res.render('assistant/assistant-coordinator-re-examination', {
					user: mongooseToObject(user),
					reexams: multipleMongooseToObject(reexams),
					doctors: multipleMongooseToObject(mediumDoctors),
					nursings: multipleMongooseToObject(mediumNursings),
					title: "Lịch hẹn tái khám"
				})
			})
			.catch(next);
	}

	deleteAssistantCoordinatorReExamination(req, res, next) {
		Promise.all([Customer.findByIdAndUpdate({ _id: req.body.cusID }, {$pull: {reexamID: req.params.id}}), Reexamination.findByIdAndDelete({ _id: req.params.id })])
			.then(() => {
				res.redirect("back")
			})
			.catch(next);
	}
	//END SERVICE NOTE

    pushPerformer(req, res, next) {
		console.log(req.body)
		User1.find({ _id: req.body.performer})
		.then(user => {
			console.log(user)
			
		})
		if(req.body.performer && req.body.nursing) {
			Promise.all([
				ServiceNote.findByIdAndUpdate({ _id: req.params.id },
					{
						$push: { performer: req.body.performer, nursing: req.body.nursing },
						$set: { stored: "No", status: "Đang xử lý", recept: req.userId, schedule: req.body.schedule }
					}),
				User.find({ _id: req.body.performer}).updateOne({ stateUser: 'Busy' }),
				User.find({ _id: req.body.nursing}).updateOne({ stateUser: 'Busy' }),
			])
				.then(() => {
					res.redirect("back")
				})
				.catch(next);
		}

		if(req.body.nursing) {
			Promise.all([
				ServiceNote.findByIdAndUpdate({ _id: req.params.id },
					{
						$push: { performer: '', nursing: req.body.nursing },
						$set: { stored: "No", status: "Đang xử lý", recept: req.userId, schedule: req.body.schedule }
					}),
				User.find({ _id: req.body.performer}).updateOne({ stateUser: 'Busy' }),
				User.find({ _id: req.body.nursing}).updateOne({ stateUser: 'Busy' }),
			])
				.then(() => {
					res.redirect("back")
				})
				.catch(next);
		}

		if(!(req.body.performer && req.body.nursing)) {
			req.flash('messages_pushReExamination_error', 'Vui lòng chọn bác sĩ và điều dưỡng');
			res.redirect("back")
		}
    }

    pushOperationToReexam(req, res, next) {
		
		if(req.body.performer && req.body.nursing) {
			Promise.all([
			    Reexamination.findByIdAndUpdate({ _id: req.params.id },
			        {
			            $push: { performer: req.body.performer, nursing: req.body.nursing },
			            $set: { stored: "No", status: "Đang xử lý", recept: req.userId, schedule: req.body.schedule }
			        }),
				User1.find({ _id: req.body.performer}).updateOne({ stateUser: 'Busy' }),
				User2.find({ _id: req.body.nursing}).updateOne({ stateUser: 'Busy' }),
			])
			    .then(() => {
			        res.redirect("back")
			    })
			    .catch(next);
		}

		if(req.body.nursing) {
			Promise.all([
			    Reexamination.findByIdAndUpdate({ _id: req.params.id },
			        {
			            $push: { performer: '', nursing: req.body.nursing },
			            $set: { stored: "No", status: "Đang xử lý", recept: req.userId, schedule: req.body.schedule }
			        }),
				User.find({ _id: req.body.performer}).updateOne({ stateUser: 'Busy' }),
				User.find({ _id: req.body.nursing}).updateOne({ stateUser: 'Busy' }),
			])
			    .then(() => {
			        res.redirect("back")
			    })
			    .catch(next);
		}

		if(!(req.body.performer && req.body.nursing)) {
			req.flash('messages_pushReExamination_error', 'Vui lòng chọn bác sĩ và điều dưỡng');
			res.redirect("back")
		}

    }
}

module.exports = new AssistantController();
