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
		Promise.all([Schedule.countDeleted({}), Schedule.find({ status: 'Tạo mới'}).populate('customerID')])
		.then(([countDelete, schedules]) => {
			res.render("operating/nursing/schedule", {
				countDelete: countDelete,
				schedules: multipleMongooseToObject(schedules),
				title: "Lịch hẹn tư vấn"
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

	// Tạo hồ sơ khách hàng từ lịch hẹn
	createCusInfor(req, res, next) {
		const serviceNote = new ServiceNote({
			scheduleID: req.params.id
		})
		serviceNote.save()
			.then(newServiceNote => {
				Promise.all([Schedule.findByIdAndUpdate({ _id: req.params.id }, { status: 'Đang xử lý', serviceNoteID: newServiceNote._id}),
					Customer.findByIdAndUpdate({ _id: req.body.cusID }, {serviceNoteID: newServiceNote._id}),
					ServiceNote.findByIdAndUpdate({ _id: newServiceNote._id }, { status: 'Đang xử lý'})])
					.then(([schedule, customer, serviceNote]) => {
						res.redirect(`/operating-room/nursing/customer-information/${serviceNote._id}`)
					})
			})
	}

	// Hiển thị trang nhập hồ sơ khách hàng
	showCreateCusInfor(req, res, next) {
		Promise.all([ServiceNote.findById({ _id: req.params.id }).populate({
			path: 'scheduleID',
			populate: {
				path: 'customerID',
				model: 'Customer'
			}
		}),
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
					title: 'Cập nhật hồ sơ khách hàng'
				})
			})
	}

	// Cập nhật thông tin cá nhân hồ sơ khách hàng
	updateCusInfor(req, res, next) {
		Promise.all([ServiceNote.findByIdAndUpdate({_id: req.params.id}, {
			performer: req.body.performer,
			nursing: req.body.nursing,
			recept: req.body.recept,
			surgeryDay: req.body.surgeryDay
		}),
		Customer.findByIdAndUpdate({ _id: req.body.cusID }, {
			fullName: req.body.fullName,
			birth: req.body.birth,
			gender: req.body.gender,
		})])
		.then(([serviceNote, customer]) => {
			res.redirect('/operating-room/nursing/service-note');
		})
	}

	// Cập nhật dịch vụ hồ sơ khách hàng
	updateServiceCusInfor(req, res, next) {
		let serviceArr = [];
		let serviceNameArr = req.body.service;
		let servicePriceArr = req.body.price;
		serviceNameArr.forEach((serviceName, index) => {
			let servicePrice = servicePriceArr[index]
			serviceArr.push({
				name: serviceName,
				price: servicePrice
			})
		})
		ServiceNote.findByIdAndUpdate({ _id: req.params.id }, {
			service: serviceArr,
			deposit: req.body.deposit,
			total: req.body.total
		})
		.then(serviceNote => {
			res.redirect('/operating-room/nursing/service-note');
		})
	}

	// Hiển thị kho lưu trữ hồ sơ
	showStorageCusInfo(req, res, next) {
		ServiceNote.find({ status: 'Hoàn thành' }).populate({
			path: 'scheduleID',
			populate: {
				path: 'customerID',
				model: 'Customer'
			}
		})
			.then((serviceNote) => {
				res.render('operating/nursing/storage', {
					serviceNote: multipleMongooseToObject(serviceNote),
					title: 'Kho lưu trữ hồ sơ'
				})
			})
	}

	// Hiển thị kho lưu trữ lịch hẹn
	showStorageSchedule(req, res, next) {
		Schedule.findDeleted({}).populate('customerID')
			.then((schedule) => {
				res.render('operating/nursing/storage', {
					schedule: multipleMongooseToObject(schedule),
					title: 'Kho lưu trữ lịch hẹn'
				})
			})
	}

	// Khôi phục lịch hẹn
	restoreSchedule(req, res, next) {
		console.log(req.body)
		// Schedule.restore({ _id: req.params.id })
		// 	.then(() => res.redirect("back"))
		// 	.catch(next);
	}
	
	// Danh sách khách hàng
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

	// Tạo thông tin khách hàng
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

	// Sửa thông tin khách hàng
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

	// Chi tiết khách hàng
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

	// Tạo hoạt động tư vấn khách hàng
	createComment(req, res, next) {
		Customer.findByIdAndUpdate(
			{ _id: req.params.id },
			{ $push: { comments: { comment: req.body.comments } } }
		)
			.then(() => res.redirect("back"))
			.catch(next);
	}

	// Danh sách hồ sơ khách hàng
	showServiceNote(req, res, next) {
		ServiceNote.find({ status: 'Đang xử lý' }).populate({
			path: 'scheduleID',
			populate: {
				path: 'customerID',
				model: 'Customer'
			},
		}).populate('performer').populate('nursing').populate('recept')
		.then((serviceNote) => {
				res.render("operating/nursing/operating-service-note", {
					serviceNote: multipleMongooseToObject(serviceNote),
					title: "Hồ sơ khách hàng"
				})
			})
		.catch(next);
	}

	// Chi tiết hồ sơ khách hàng
	showServiceNoteDetail(req, res, next) {
		ServiceNote.findById({ _id: req.params.id }).populate({
			path: 'scheduleID',
			populate: {
				path: 'customerID',
				model: 'Customer'
			},
		}).populate('performer').populate('nursing').populate('recept')
		.then((serviceNote) => {
				res.render("operating/nursing/operating-service-note-detail", {
					serviceNote: mongooseToObject(serviceNote),
					title: "Chi tiết hồ sơ khách hàng"
				})
			})
		.catch(next);
	}

	// Cập nhật hồ sơ khách hàng hoàn thành
	updateServiceNoteDone(req, res, next) {
		console.log(req.params.id)
		ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: 'Hoàn thành' }})
			.then(() => {
				res.redirect('back');
			})
			.catch(next)
	}

	// Xóa lịch hẹn
	deleteSchedule(req, res, next) {
		Promise.all([Customer.findByIdAndUpdate({ _id: req.body.cusID}, { $pull: { scheduleID: req.params.id  }}), Schedule.delete({ _id: req.params.id })])
			.then(() => res.redirect("back"))
			.catch(next);
	}

	// Tạo phiếu tái khám
	createReExam(req, res, next) {
		const reexamination = new Reexamination({ 
			createName: req.userId,
			customerID: req.body.cusID,
			serviceNoteId: req.params.id,
			status: 'Tạo mới',
			stored: 'No',
			schedule: req.body.schedule
		})
		reexamination.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { reexamID: reexamination.id } }),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { reExamID: reexamination.id } })
		])
			.then(() => {
				req.flash('messages_createReExamination_success', 'Tạo lịch tái khám thành công');
				res.redirect("back");
			})
	}

	// Danh sách phiếu tái khám
	showReExamination(req, res, next) {
		Promise.all([Reexamination.find({$or:[{status: "Tạo mới"},{status:"Đang xử lý"},{status:"Đã cập nhật"}]}).populate('customerID').populate('createName').populate('serviceNoteId'), User.findById({ _id: req.userId })])
			.then(([reExam, user]) => {
				res.render("operating/nursing/operating-re-exam", {
					reExam: multipleMongooseToObject(reExam),
					user: mongooseToObject(user),
					title: "Danh sách phiếu tái khám"
				})
			})
			// })
			.catch(next);

	}

	// Chi tiết phiếu tái khám
	showReExaminationDetail(req, res, next) {
		Reexamination.findById({ _id: req.params.id }).populate('customerID').populate('createName').populate('serviceNoteId').populate('performer').populate('nursing').populate('recept')
			.then(reExamination => {
				res.render('operating/nursing/operating-re-exam-detail', {
					reExamination: mongooseToObject(reExamination),
					title: "Chi tiết phiếu tái khám"
				})
			})
	}

	// Hiển thị trang cập nhập phiếu tái khám
	showReExaminationUpdate(req, res, next) {
		Promise.all([Reexamination.findByIdAndUpdate({ _id: req.params.id }, { status: 'Đang xử lý' }).populate('customerID').populate('createName').populate('serviceNoteId'),
		User.find({ departmentEng: 'operating-room', positionEng: 'doctor'}),
		User.find({ departmentEng: 'operating-room', positionEng: 'nursing'}),
		TypeService.find({})])
			.then(([reExam, doctors, nursings, typeService]) => {
				console.log('re-exam', reExam)
				res.render('operating/nursing/update-re-exam', {
					reExam: mongooseToObject(reExam),
					doctors: multipleMongooseToObject(doctors),
					nursings: multipleMongooseToObject(nursings),
					typeService: multipleMongooseToObject(typeService),
					title: 'Cập nhật phiếu tái khám'
				})
			})
	}

	// Cập nhật phiếu tái khám hoàn thành
	updateReExamDone(req, res, next) {	
		Reexamination.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: "Hoàn thành"} })
		.then(() => {
			res.redirect('back')
		})
		.catch(next);
	}

	// Tải ảnh khi tư vấn
	uploadCounselor(req, res, next) {
		const file = req.files;
		const imgArr = [];
		const videoArr = [];
		console.log('file', req.body)
		file.forEach(element => {
			if (element.mimetype === 'image/jpg' || element.mimetype === 'image/jpeg' || element.mimetype === 'image/png') {
				imgArr.push({ name: element.filename, url: element.path });
				return imgArr;
			} else if (element.mimetype === 'video/avi' || element.mimetype === 'video/flv' || element.mimetype === 'video/wmv' || element.mimetype === 'video/mov' || element.mimetype === 'video/mp4' || element.mimetype === 'video/webm') {
				videoArr.push({ name: element.filename, url: element.path });
				return videoArr;
			}
		})
		ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { counselorImg: imgArr, counselorVideo: videoArr }, $set: { counselorInfo: req.body.counselorInfo }})
			.then(() => {
				res.redirect('back')
			})
			.catch(next);
	}

	// Tải ảnh trước phẩu thuật
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
		ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { beforeImg: imgArr, beforeVideo: videoArr }, $set: { beforeInfo: req.body.beforeInfo } })
			.then(() => {
				res.redirect('back')
			})
			.catch(next);
	}

	// Tải ảnh trong phẩu thuật
	uploadInSurgery(req, res, next) {
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
		ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { inSurgeryImg: imgArr, inSurgeryVideo: videoArr }, $set: { stepsToTake: req.body.stepsToTake } })
			.then(() => {
				res.redirect('back')
			})
			.catch(next);
	}

	// Tải ảnh sau phẩu thuật - hồi sức
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
		ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { afterImg: imgArr, afterVideo: videoArr }, $set: { afterInfo: req.body.afterInfo } })
			.then(() => {
				res.redirect('back')
			})
			.catch(next);
	}

	// Tải ảnh tái khám
	uploadReExam(req, res, next) {
		console.log('req body', req.body)
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
		Reexamination.findByIdAndUpdate({ _id: req.params.id }, { $push: { reExamImg: imgArr, reExamVideo: videoArr, performer: req.body.performer, nursing: req.body.nursing },
			$set: {
					status: 'Đã cập nhật',
					stepsToTake: req.body.stepsToTake,
					recept: req.body.recept
			}})
			.then(() => {
				res.redirect('/operating-room/nursing/re-examination')
			})
			.catch(next);
	}

	// Tạo hồ sơ khách hàng => đang dư
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
			status: "Tạo mới",
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

	
}

module.exports = new NursingController;
