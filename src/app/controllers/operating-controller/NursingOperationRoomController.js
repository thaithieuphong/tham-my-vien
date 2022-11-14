const User = require('../../models/User');
const { multipleMongooseToObject, mongooseToObject } = require('../../../util/mongoose');
const ServiceNote = require('../../models/ServiceNote');
const Department = require('../../models/Department');
const Position = require('../../models/Position');
const Schedule = require('../../models/Schedule');
const Reexamination = require('../../models/Reexamination');
const Customer = require('../../models/Customer');
const path = require('path');
const rootPath = path.sep;
const appRoot = require('app-root-path');
const fs = require('fs');
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

	// Hiển thị trang tạo lịch hẹn
	showCreateSchedule(req, res, next) {
		Customer.findById({ _id: req.params.id }).populate('userID')
		.then(customer => {
				res.render('operating/nursing/create-schedule', {
					title: 'Tạo lịch hẹn',
					customer: mongooseToObject(customer)
				});
			})
	}

	// Tạo lịch hẹn
	createSchedule(req, res, next) {
		if (req.body.deposit === '') {
			const schedule = new Schedule({
				customerID: req.params.id,
				createName: req.body.createID,
				status: "Tạo mới",
				comments: { comment: req.body.comment },
				schedule: req.body.schedule,
				priceBefore: req.body.priceBefore,
				deposit: 0,
			});
			schedule.save();
			Customer.findByIdAndUpdate({ _id: req.body.createID }, { $push: { scheduleID: schedule.id }})
				.then(() => {
					req.flash('messages_createSchedule_success', 'Tạo lịch hẹn thành công');
					res.redirect('/operating-room/nursing/customers');
				})
		} else {
			const schedule = new Schedule({
				customerID: req.params.id,
				createName: req.body.createID,
				status: "Tạo mới",
				comments: { comment: req.body.comment },
				schedule: req.body.schedule,
				priceBefore: req.body.priceBefore,
				deposit: req.body.deposit,
			});
			schedule.save();
			Customer.findByIdAndUpdate({ _id: req.body.createID }, { $push: { scheduleID: schedule.id }})
				.then(() => {
					req.flash('messages_createSchedule_success', 'Tạo lịch hẹn thành công');
					res.redirect('/operating-room/nursing/customers');
				})
		}
	}

	// Hiển thị danh sách lịch hẹn
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

	// Hiến thị chi tiết lịch hẹn
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
						res.redirect(`/operating-room/nursing/customer-information/${newServiceNote._id}`)
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
		User.find({ departmentEng: 'operating-room', positionEng: 'doctor', firstName: 'Nguyễn Tuấn', lastName: 'Anh'}),
		TypeService.find({})])
			.then(([schedule, doctor, typeService]) => {
				res.render('operating/nursing/create-customer-info', {
					schedule: mongooseToObject(schedule),
					doctor: multipleMongooseToObject(doctor),
					typeService: multipleMongooseToObject(typeService),
					title: 'Cập nhật hồ sơ khách hàng'
				})
			})
	}

	// Cập nhật thông tin cá nhân hồ sơ khách hàng
	updateCusInfor(req, res, next) {
		Promise.all([ServiceNote.findByIdAndUpdate({_id: req.params.id}, {
			performer: req.body.performer,
			floor: req.body.floor,
			surgeryDay: req.body.surgeryDay,
		}),
		Customer.findByIdAndUpdate({ _id: req.body.cusID }, {
			identification: req.body.identification,
			fullName: req.body.fullName,
			birth: req.body.birth,
			gender: req.body.gender,
			height: req.body.height,
			weight: req.body.weight,
			homeTown: req.body.homeTown,
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

	// Hiển thị danh sách hồ sơ xuất viện
	showStorageCusInfo(req, res, next) {
		ServiceNote.find({ status: 'Xuất viện' }).populate({
			path: 'scheduleID',
			populate: {
				path: 'customerID',
				model: 'Customer'
			}
		})
			.then((serviceNote) => {
				res.render('operating/nursing/discharge-from-hospital', {
					serviceNote: multipleMongooseToObject(serviceNote),
					title: 'Hồ sơ xuất viện'
				})
			})
	}

	// Hiển thị danh sách hồ sơ hoàn thành
	showStorageCusInfoDone(req, res, next) {
		ServiceNote.find({ status: 'Hoàn thành' }).populate({
			path: 'scheduleID',
			populate: {
				path: 'customerID',
				model: 'Customer'
			}
		})
		.then((serviceNoteDone) => {
			res.render('operating/nursing/storage-done', {
				serviceNoteDone: multipleMongooseToObject(serviceNoteDone),
				title: 'Kho hồ sơ hoàn thành'
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
				// let cusArr = [];
				// customers.forEach(customer => {
				// 	if (customer.userID !== null) {
						
				// 		if (customer.userID.departmentEng === 'operating-room' && customer.userID.positionEng === 'nursing') {
				// 			console.log('customer', customer)
				// 			cusArr.push(customer);
				// 		}
				// 	}
				// });
				res.render("operating/nursing/operating-customer", {
					customers: multipleMongooseToObject(customers),
					user: mongooseToObject(user),
					typeservices: multipleMongooseToObject(typeservices),
					title: 'Quản lý khách hàng'
				});
				// console.log('cus populate arr', cusPopulateArr)
				// 	.then(customerPopulate => {
				// 		console.log(customerPopulate);
				// 		console.log(customerPopulate.userID.departmentEng)
				// 		if (customerPopulate.userID.departmentEng === 'operating-room' && customerPopulate.userID.positionEng === 'nursing') {
				// 			return customerPopulate
				// 		}
				// 	})
			})
			.catch(next);
	}

	// Tạo thông tin khách hàng
	createCustomer(req, res, next) {
		if (req.file) {
			const customer = new Customer({
				userID: req.userId,
				identification: req.body.identification,
				fullName: req.body.fullName,
				nickName: req.body.nickName,
				birth: req.body.birth,
				gender: req.body.gender,
				phone: req.body.phone,
				height: req.body.height,
				weight: req.body.weight,
				homeTown: req.body.homeTown,
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
				identification: req.body.identification,
				fullName: req.body.fullName,
				nickName: req.body.nickName,
				birth: req.body.birth,
				gender: req.body.gender,
				phone: req.body.phone,
				height: req.body.height,
				weight: req.body.weight,
				homeTown: req.body.homeTown,
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
					fullName: req.body.fullName,
					nickName: req.body.nickName,
					birth: req.body.birth,
					phone: req.body.phone,
					gender: req.body.gender,
					height: req.body.height,
					weight: req.body.weight,
					homeTown: req.body.homeTown,
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
						// appRoot + "/img/uploads/customers/"
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
			Customer.updateOne({ _id: req.params.id }, {
				fullName: req.body.fullName,
				nickName: req.body.nickName,
				birth: req.body.birth,
				phone: req.body.phone,
				gender: req.body.gender,
				height: req.body.height,
				weight: req.body.weight,
				homeTown: req.body.homeTown,
				resource: req.body.resource,
				description: req.body.description,
				image: {
					name: '',
					url: '',
				},
			})
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
		}).populate('performer')
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
		}).populate('performer')
		.then((serviceNote) => {
				res.render("operating/nursing/operating-service-note-detail", {
					serviceNote: mongooseToObject(serviceNote),
					title: "Chi tiết hồ sơ khách hàng"
				})
			})
		.catch(next);
	}

	// Cập nhật hồ sơ khách hàng xuất viện
	updateServiceNoteDischargeFromHospital(req, res, next) {
		Promise.all([
			Schedule.findOneAndUpdate({ serviceNoteID: req.params.id }, { $set: { status: 'Hoàn thành' }}),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: 'Xuất viện' }}),
		])
			.then(() => {
				res.redirect('back');
			})
			.catch(next)
	}

	// Cập nhật hồ sơ khách hàng hoàn thành
	updateServiceNoteDone(req, res, next) {	
		ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: "Hoàn thành"} })
		.then(() => {
			res.redirect('back');
		})
		.catch(next);
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
		Reexamination.findById({ _id: req.params.id }).populate('customerID').populate('createName').populate('serviceNoteId').populate('performer')
			.then(reExamination => {
				res.render('operating/nursing/operating-re-exam-detail', {
					reExamination: mongooseToObject(reExamination),
					title: "Chi tiết phiếu tái khám"
				})
			})
	}

	// Hiển thị trang cập nhật phiếu tái khám
	showReExaminationUpdate(req, res, next) {
		Promise.all([Reexamination.findByIdAndUpdate({ _id: req.params.id }, { status: 'Đang xử lý' }).populate('customerID').populate('createName').populate('serviceNoteId'),
		User.find({ departmentEng: 'operating-room', positionEng: 'doctor', firstName: 'Nguyễn Tuấn', lastName: 'Anh'}),
		TypeService.find({})])
			.then(([reExam, doctors, typeService]) => {
				res.render('operating/nursing/update-re-exam', {
					reExam: mongooseToObject(reExam),
					doctors: multipleMongooseToObject(doctors),
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

}

module.exports = new NursingController;
