const User = require('../../models/User');
const { multipleMongooseToObject, mongooseToObject } = require('../../../util/mongoose');
const ServiceNote = require('../../models/ServiceNote');
const Schedule = require('../../models/Schedule');
const Reexamination = require('../../models/Reexamination');
const Customer = require('../../models/Customer');
const path = require('path');
const rootPath = path.sep;
const TypeService = require("../../models/TypeService");
const { mongo } = require('mongoose');

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

	showSchedule(req, res, next){
		Promise.all([Schedule.countDeleted({}), Schedule.find({ status: 'Tạo mới'}).populate('customerID')])
		.then(([countDelete, schedules]) => {
			res.render("operating/nursing/schedule", {
				countDelete: countDelete,
				schedules: multipleMongooseToObject(schedules),
				title: "Lịch hẹn phẩu thuật"
			})
		})
		.catch(next);
	}

	showScheduleDetail(req, res, next) {
		Schedule.findById({ _id: req.params.id}).populate('customerID').populate('createName')
			.then((schedule) => {
				res.render('operating/nursing/schedule-detail', {
					schedule: mongooseToObject(schedule),
					title: 'Chi tiết lịch hẹn'
				})
			})
			.catch(next);
	}

	showCreateCusInfor(req, res, next) {
		Promise.all([Schedule.findById({ _id: req.params.id,}).populate('customerID').populate('createName'),
		User.find({ departmentEng: 'operating-room', positionEng: 'doctor'}),
		User.find({ departmentEng: 'operating-room', positionEng: 'nursing'}),
		TypeService.find({})])
			.then(([schedule, doctors, nursings, typeService]) => {
				console.log('service notes', schedule)
				res.render('operating/nursing/create-customer-info', {
					schedule: mongooseToObject(schedule),
					doctors: multipleMongooseToObject(doctors),
					nursings: multipleMongooseToObject(nursings),
					typeService: multipleMongooseToObject(typeService),
					title: 'Hồ sơ khách hàng'
				})
			})
	}

	showStorage(req, res, next) {
		ServiceNote.findDeleted({}).populate('customerID')
			.then((schedule) => {
				res.render('operating/nursing/storage', {
					schedule: multipleMongooseToObject(schedule),
					title: 'Kho lưu trữ'
				})
			})
	}

	restoreSchedule(req, res, next) {
		ServiceNote.restore({ _id: req.params.id })
			.then(() => res.redirect("back"))
			.catch(next);

	}
	
	showCustomers(req, res, next) {
		Promise.all([Customer.find({ userID: req.userId }), User.findById({ _id: req.userId }),
		TypeService.find({})])
			.then(([customers, user, typeservices]) => {
				res.render("operating/nursing/operating-customer", {
					customers: multipleMongooseToObject(customers),
					user: mongooseToObject(user),
					typeservices: multipleMongooseToObject(typeservices),
					title: 'Quản lý khách hàng'
				});
			})
			.catch(next);
	}

	createCustomer(req, res, next) {
		if (req.file) {
			const customer = new Customer({
				userID: req.userId,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				birth: req.body.birth,
				gender: req.body.gender,
				phone: req.body.phone,
				email: req.body.email,
				address: req.body.address,
				resource: req.body.resource,
				description: req.body.description,
				image: {
					name: req.file.filename,
					url: req.file.path,
				},
			});
			customer.save();
		} else {
			const customer = new Customer({
				userID: req.userId,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				birth: req.body.birth,
				gender: req.body.gender,
				phone: req.body.phone,
				email: req.body.email,
				address: req.body.address,
				resource: req.body.resource,
				description: req.body.description,
				image: {
					name: "",
					url: "",
				},
			});
			customer.save();
		}
		res.redirect("back");
	}

	editCustomer(req, res, next) {
		if (req.file) {
			Customer.findOneAndUpdate(
				{ _id: req.params.id },
				{
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					email: req.body.email,
					address: req.body.address,
					resource: req.body.resource,
					description: req.body.description,
					image: {
						name: req.file.filename,
						url: req.file.path,
					},
				}
			)
				.then((customer) => {
					let imgCustomer = customer.image.name;
					let url = customer.image.url;
					let files = fs.readdirSync(
						rootPath + "mnt/vdb/crm.drtuananh.vn/customers/"
					);
					files.filter((img) => {
						if (img === imgCustomer) {
							fs.unlinkSync(url);
						}
					});
					res.redirect("back");
				})
				.catch(next);
		} else {
			Customer.updateOne({ _id: req.params.id }, req.body)
				.then((customer) => {
					res.redirect("back");
				})
				.catch(next);
		}
	}

	showCustomerDetail(req, res, next) {
		Promise.all([
			Customer.findById({ _id: req.params.id }).populate('serviceNoteID'),
			User.findById({ _id: req.userId })
		])
			.then(([customer, user]) => {
				res.render('operating/nursing/operating-customer-detail', {
					customer: mongooseToObject(customer),
					user: mongooseToObject(user),
					title: "Chi tiết khách hàng"
				});

			})
			.catch(next);
	}

	createComment(req, res, next) {
		Customer.findByIdAndUpdate(
			{ _id: req.params.id },
			{ $push: { comments: { comment: req.body.comments } } }
		)
			.then(() => res.redirect("back"))
			.catch(next);
	}

	

	showServiceNote(req, res, next) {
		// Promise.all([ServiceNote.findOne({ stored: "No", status: "Đang xử lý", nursing: req.userId }).populate('recept').populate('customerID').populate('performer').populate('nursing')])
		// .then(([serviceNote]) => {
		// 		res.render("operating/nursing/operating-service-note", {
		// 			serviceNote: mongooseToObject(serviceNote),
		// 			title: "Phiếu phẩu thuật"
		// 		})
		// 	})
		// 	// })
		// 	.catch(next);
	}

	deleteServiceNote(req, res, next) {
		console.log('schedule id', req.params.id)
		console.log('customer id', req.body.cusID)
		Promise.all([Customer.findByIdAndUpdate({ _id: req.body.cusID}, { $pull: { serviceNoteID: req.params.id  }}), ServiceNote.delete({ _id: req.params.id })])
			.then(() => res.redirect("back"))
			.catch(next);
	}

	showReExamination(req, res, next) {
		Promise.all([Reexamination.findOne({ stored: "No", status: "Đang xử lý", nursing: req.userId }).populate('recept').populate('customerID').populate('performer').populate('nursing').populate('serviceNoteId'), User.findById({ _id: req.userId })])
			.then(([reExam, user]) => {
				res.render("operating/nursing/operating-re-exam", {
					reExam: mongooseToObject(reExam),
					user: mongooseToObject(user),
					title: "Phiếu tái khám"
				})
			})
			// })
			.catch(next);

	}

	updateServiceNote(req, res, next) {
		Promise.all([
			User.find({ _id: req.body.performerID }).updateMany({state: 'Medium'}),
			User.find({ _id: req.body.nursingID }).updateMany({state: 'Medium'}),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: "Hoàn thành", notes: req.body.notes, stepsToTake: req.body.stepsToTake } }),
		])
		.then(() => {
				res.redirect('back')
			})
			.catch(next);
	}

	updateReExamination(req, res, next) {
		Promise.all([
			User.find({ _id: req.body.performerID }).updateMany({state: 'Medium'}),
			User.find({ _id: req.body.nursingID }).updateMany({state: 'Medium'}),
			Reexamination.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: "Hoàn thành", stepsToTake: req.body.stepsToTake } }),
		])
		.then(() => {
			res.redirect('back')
		})
		.catch(next);
	}

	uploadCounselor(req, res, next) {
		const file = req.files;
		const imgArr = [];
		const videoArr = [];
		file.forEach(element => {
			if (element.mimetype === 'image/jpg' || element.mimetype === 'image/jpeg' || element.mimetype === 'image/png') {
				imgArr.push({ name: element.filename, url: element.path });
				return imgArr;
			} else if (element.mimetype === 'video/avi' || element.mimetype === 'video/flv' || element.mimetype === 'video/wmv' || element.mimetype === 'video/mov' || element.mimetype === 'video/mp4' || element.mimetype === 'video/webm') {
				videoArr.push({ name: element.filename, url: element.path });
				return videoArr;
			}
		})
		ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { counselorImg: imgArr, counselorVideo: videoArr } })
			.then(() => {
				res.redirect('back')
			})
			.catch(next);
	}

	uploadBefore(req, res, next) {
		const file = req.files;
		const imgArr = [];
		const videoArr = [];
		file.forEach(element => {
			if (element.mimetype === 'image/jpg' || element.mimetype === 'image/jpeg' || element.mimetype === 'image/png') {
				imgArr.push({ name: element.filename, url: element.path });
				return imgArr;
			} else if (element.mimetype === 'video/avi' || element.mimetype === 'video/flv' || element.mimetype === 'video/wmv' || element.mimetype === 'video/mov' || element.mimetype === 'video/mp4' || element.mimetype === 'video/webm') {
				videoArr.push({ name: element.filename, url: element.path });
				return videoArr;
			}
		})
		ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { beforeImg: imgArr, beforeVideo: videoArr } })
			.then(() => {
				res.redirect('back')
			})
			.catch(next);
	}

	uploadAfter(req, res, next) {
		const file = req.files;
		const imgArr = [];
		const videoArr = []
		file.forEach(element => {
			if (element.mimetype === 'image/jpg' || element.mimetype === 'image/jpeg' || element.mimetype === 'image/png') {
				imgArr.push({ name: element.filename, url: element.path });
				return imgArr;
			} else if (element.mimetype === 'video/avi' || element.mimetype === 'video/flv' || element.mimetype === 'video/wmv' || element.mimetype === 'video/mov' || element.mimetype === 'video/mp4' || element.mimetype === 'video/webm') {
				videoArr.push({ name: element.filename, url: element.path });
				return videoArr;
			}
		})
		ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { afterImg: imgArr, afterVideo: videoArr } })
			.then(() => {
				res.redirect('back')
			})
			.catch(next);
	}

	uploadReExam(req, res, next) {
		const file = req.files;
		const imgArr = [];
		const videoArr = [];
		file.forEach(element => {
			if (element.mimetype === 'image/jpg' || element.mimetype === 'image/jpeg' || element.mimetype === 'image/png') {
				imgArr.push({ name: element.filename, url: element.path });
				return imgArr;
			} else if (element.mimetype === 'video/avi' || element.mimetype === 'video/flv' || element.mimetype === 'video/wmv' || element.mimetype === 'video/mov' || element.mimetype === 'video/mp4' || element.mimetype === 'video/webm') {
				videoArr.push({ name: element.filename, url: element.path });
				return videoArr;
			}
		})
		Reexamination.findByIdAndUpdate({ _id: req.params.id }, { $push: { reExamImg: imgArr, reExamVideo: videoArr } })
			.then(() => {
				res.redirect('back')
			})
			.catch(next);
	}

	createServiceNote(req, res, next) {
		const file = req.files;
		const imgArr = [];
		const videoArr = [];
		file.forEach(element => {
			if (element.mimetype === 'image/jpg' || element.mimetype === 'image/jpeg' || element.mimetype === 'image/png') {
				imgArr.push({ name: element.filename, url: element.path });
				return imgArr;
			} else if (element.mimetype === 'video/avi' || element.mimetype === 'video/flv' || element.mimetype === 'video/wmv' || element.mimetype === 'video/mov' || element.mimetype === 'video/mp4' || element.mimetype === 'video/webm') {
				videoArr.push({ name: element.filename, url: element.path });
				return videoArr;
			}
		})
		const serviceNote = new ServiceNote({
			customerID: req.body.customerID,
			performer: req.body.performer,
			createName: req.body.createName,
			status: "Tạo mới",
			service: req.body.service,
			comments: { comment: req.body.comment },
			schedule: req.body.schedule,
			price: req.body.price,
			counselorImg: imgArr,
			counselorVideo: videoArr,
		});
		serviceNote.save();
		Customer.findByIdAndUpdate({ _id: req.body.customerID }, { $push: { serviceNoteID: serviceNote.id } })

			.then(() => {
				res.redirect('back');

			})
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
		Customer.findByIdAndUpdate({ _id: req.body.customerID }, { $push: { reexamID: reexamination.id } })
			.then(() => {
				req.flash('messages_createReExamination_success', 'Tạo phiếu tái khám thành công');
				res.redirect('back');

			})
	}

	
}

module.exports = new NursingController;
