const User = require('../../models/User');
const { multipleMongooseToObject, mongooseToObject } = require('../../../util/mongoose');
const ServiceNote = require('../../models/ServiceNote');
const Department = require('../../models/Department');
const Log = require('../../models/Log');
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
		let deposit = req.body.deposit;
		let cusID = req.params.id;
		let createID = req.body.createID;
		let comment = req.body.comment;
		let scheduleBody = req.body.schedule;
		let priceBefore = req.body.priceBefore;
		if (deposit === '') {
			const schedule = new Schedule({
				customerID: cusID,
				createName: createID,
				status: "Tạo mới",
				comments: { comment: comment },
				schedule: scheduleBody,
				priceBefore: priceBefore,
				deposit: 0,
				logSchedules: [
					{	
						schedule: scheduleBody,
						reason: 'Lần tạo đầu tiên',
						userID: req.userId
					}
				],
			});
			schedule.save()
				.then(newSchedule => {
					Customer.findByIdAndUpdate({ _id: req.params.id }, { $push: { scheduleID: newSchedule._id }})
						.then(() => {
							req.flash('messages_createSchedule_success', 'Tạo lịch hẹn thành công');
							res.redirect('/operating-room/nursing/customers');
						})
				})
				.catch(next);
		} else if (deposit === 'NaN') {
			const schedule = new Schedule({
				customerID: cusID,
				createName: createID,
				status: "Tạo mới",
				comments: { comment: comment },
				schedule: scheduleBody,
				priceBefore: priceBefore,
				deposit: 0,
				logSchedules: [
					{	
						schedule: scheduleBody,
						reason: 'Lần tạo đầu tiên',
						userID: req.userId
					}
				],
			});
			schedule.save()
				.then(newSchedule => {
					Customer.findByIdAndUpdate({ _id: req.params.id }, { $push: { scheduleID: newSchedule._id }})
						.then(() => {
							req.flash('messages_createSchedule_success', 'Tạo lịch hẹn thành công');
							res.redirect('/operating-room/nursing/customers');
						})
				})
				.catch(next);
		} else {
			const schedule = new Schedule({
				customerID: cusID,
				createName: createID,
				status: "Tạo mới",
				comments: { comment: comment },
				schedule: scheduleBody,
				priceBefore: priceBefore,
				deposit: deposit,
				logSchedules: [
					{		
						schedule: scheduleBody,
						reason: 'Lần tạo đầu tiên',
						userID: req.userId
					}
				],
			});
			schedule.save()
				.then(newSchedule => {
					Customer.findByIdAndUpdate({ _id: req.params.id }, { $push: { scheduleID: newSchedule._id }})
						.then(() => {
							req.flash('messages_createSchedule_success', 'Tạo lịch hẹn thành công');
							res.redirect('/operating-room/nursing/customers');
						})
				})
				.catch(next);
		}
	}

	// Hiển thị danh sách lịch hẹn
	showSchedule(req, res, next){
		Promise.all([Schedule.countDeleted({}), Schedule.find({ status: 'Tạo mới'}).populate('customerID').sort({schedule: 1})])
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
				let updateCus = {
					$set: { statusCus: { statusVi: 'Tạo hồ sơ', statusEng: 'createAProfile'}, serviceNoteID: newServiceNote._id},
					$push: { logStatus: { statusCus: {statusVi: 'Tạo hồ sơ', statusEng: 'createAProfile'}, serviceNoteID: newServiceNote._id, userID: req.userId}}
				}
				let updateStatusService = {
					$set: { status: 'Đang xử lý'},
					$push: { logStatus: { statusServiceNote: 'Đang xử lý', createID: req.userId}}
				}
				Promise.all([Schedule.findByIdAndUpdate({ _id: req.params.id }, { status: 'Đang xử lý', serviceNoteID: newServiceNote._id}),
					Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateCus),
					ServiceNote.findByIdAndUpdate({ _id: newServiceNote._id }, updateStatusService)])
					.then(() => {
						res.redirect(`/operating-room/nursing/customer-information/${newServiceNote._id}`)
					})
					.catch(next);
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
			.then(([serviceNote, doctor, typeService]) => {
				res.render('operating/nursing/create-customer-info', {
					serviceNote: mongooseToObject(serviceNote),
					doctor: multipleMongooseToObject(doctor),
					typeService: multipleMongooseToObject(typeService),
					title: 'Cập nhật hồ sơ khách hàng'
				})
			})
			.catch(next);
	}

	// Cập nhật thông tin cá nhân hồ sơ khách hàng
	updateCusInfor(req, res, next) {
		Promise.all([ServiceNote.findByIdAndUpdate({_id: req.params.id}, {
			performer: req.body.performer,
			floor: req.body.floor,
			surgeryDay: req.body.surgeryDay,
			$set: { status: 'Đang xử lý'},
			$push: { logStatus: { statusServiceNote: 'Cập nhật thông tin cá nhân', createID: req.userId}}
		}),
		Customer.findByIdAndUpdate({ _id: req.body.cusID }, {
			identification: req.body.identification,
			fullName: req.body.fullName,
			birth: req.body.birth,
			phone: req.body.phone,
			gender: req.body.gender,
			height: req.body.height,
			weight: req.body.weight,
			homeTown: req.body.homeTown,
			statusCus: {
				statusVi: 'Cập nhật thông tin cá nhân',
				statusEng: 'updateAProfile'
			},
			$push: {
				logStatus: {
					statusCus: {
						statusVi: 'Cập nhật thông tin cá nhân',
						statusEng: 'updateAProfile'
					},
					userID: req.userId
				}
			}
		})])
		.then(() => {
			req.flash('messages_updateCusInfo_success', 'Cập nhật thông tin cá nhân khách hàng thành công');
			res.redirect('back');
		})
		.catch(next);
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
		});
		let updateCus = {
			$set: { statusCus: { statusVi: 'Cập nhật dịch vụ', statusEng: 'updateService'} },
			$push: { logStatus: { statusCus: {statusVi: 'Cập nhật dịch vụ', statusEng: 'updateService'}, userID: req.userId}}
		}
		Promise.all([
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, {
				service: serviceArr,
				deposit: req.body.deposit,
				total: req.body.total,
				$set: { status: 'Đang xử lý'},
				$push: { logStatus: { statusServiceNote: 'Cập nhật dịch vụ', createID: req.userId}}
			}),
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateCus)
		])
		.then(() => {
			req.flash('messages_updateService_success', 'Cập nhật dịch vụ thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	deleteService(req, res, next) {
		let updateCustomerStatus = {
			$push: { logStatus: { statusCus: {statusVi: 'Xóa dịch vụ', statusEng: 'deleteService'}, userID: req.userId}}
		}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.customerID }, updateCustomerStatus),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id} , { $pull: {service: { _id: req.body.serviceID}},
				$push: { logStatus: { statusServiceNote: 'Xóa dịch vụ', createID: req.userId}}
			})
		])
		.then(() => {
			req.flash('messages_deleteService_success', 'Xóa dịch vụ thành công');
			res.redirect('back');
		})
		.catch(next)
	}

	// Hiển thị danh sách hồ sơ xuất viện
	showStorageCusInfo(req, res, next) {
		ServiceNote.find({ status: 'Xuất viện' }).populate({
			path: 'scheduleID',
			populate: {
				path: 'customerID',
				model: 'Customer'
			}
		}).sort({updatedAt: -1})
		.then((serviceNote) => {
			res.render('operating/nursing/discharge-from-hospital', {
				serviceNote: multipleMongooseToObject(serviceNote),
				title: 'Hồ sơ xuất viện'
			})
		})
		.catch(next);
	}

	// Hiển thị danh sách hồ sơ hoàn thành
	showStorageCusInfoDone(req, res, next) {
		ServiceNote.find({ status: 'Hoàn thành' }).populate({
			path: 'scheduleID',
			populate: {
				path: 'customerID',
				model: 'Customer'
			}
		}).sort({updatedAt: -1})
		.then((serviceNoteDone) => {
			res.render('operating/nursing/storage-done', {
				serviceNoteDone: multipleMongooseToObject(serviceNoteDone),
				title: 'Kho hồ sơ hoàn thành'
			})
		})
		.catch(next);
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
				statusCus: {
					statusVi: 'Đặt lịch',
					statusEng: 'Schedule'
				},
				logStatus: [
					{
						statusCus: {
							statusVi: 'Đặt lịch',
							statusEng: 'Schedule'
						},
						surgeryDay: null,
						userID: req.userId
					}
				],
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
				statusCus: {
					statusVi: 'Đặt lịch',
					statusEng: 'Schedule'
				},
				logStatus: [
					{
						statusCus: {
							statusVi: 'Đặt lịch',
							statusEng: 'Schedule'
						},
						surgeryDay: null,
						userID: req.userId
					}
				],
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
					statusCus: {
						statusVi: 'Đặt lịch',
						statusEng: 'Schedule'
					},
					logStatus: [
						{
							statusCus: {
								statusVi: 'Đặt lịch',
								statusEng: 'Schedule'
							},
							surgeryDay: null,
							userID: req.userId
						}
					],
					image: {
						name: req.file.filename,
						url: req.file.path,
					},
				})
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
				statusCus: {
					statusVi: 'Đặt lịch',
					statusEng: 'Schedule'
				},
				logStatus: [
					{
						statusCus: {
							statusVi: 'Đặt lịch',
							statusEng: 'Schedule'
						},
						surgeryDay: null,
						userID: req.userId
					}
				],
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
		Customer.findByIdAndUpdate({ _id: req.params.id }, { $push: { comments: { comment: req.body.comments } } })
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
		}).populate('performer').sort({updatedAt: -1})
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
		let updateCus = {
			$set: { statusCus: { statusVi: 'Xuất viện', statusEng: 'dischargeFromHospital'}, storage: 'No' },
			$push: { logStatus: { statusCus: {statusVi: 'Xuất viện', statusEng: 'dischargeFromHospital'}, surgeryDay: req.body.surgeryDay, userID: req.userId}}
		}
		Promise.all([
			Schedule.findOneAndUpdate({ serviceNoteID: req.params.id }, { $set: { status: 'Hoàn thành' }}),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { 
				$set: { status: 'Xuất viện' },
				$push: { logStatus: { statusServiceNote: 'Xuất viện', createID: req.userId}}
			}),
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateCus)])
		.then(() => {
			req.flash('messages_updateCusDischarge_success', 'Cập nhật khách hàng xuất viện thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Cập nhật hồ sơ khách hàng hoàn thành
	updateServiceNoteDone(req, res, next) {
		let updateCus = {
			$set: { statusCus: { statusVi: 'Lưu hồ sơ', statusEng: 'records'}, storage: 'Yes' },
			$push: { logStatus: { statusCus: {statusVi: 'Lưu hồ sơ', statusEng: 'records'}, surgeryDay: req.body.surgeryDay, userID: req.userId}}

		}
		Promise.all([
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { 
				$set: { status: "Lưu hồ sơ"},
				$push: { logStatus: { statusServiceNote: 'Lưu hồ sơ', createID: req.userId}}
			}),
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateCus)
		])
		.then(() => {
			req.flash('messages_updateServiceNoteDone_success', 'Cập nhật hoàn thành hồ sơ khách hàng thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Sửa lịch hẹn tư vấn
	editSchedule(req, res, next) {
		let updateStatus = {
			$set: {schedule: req.body.schedule, reason: req.body.reason},
			$push: { logSchedules: { schedule: req.body.schedule, reason: req.body.reason, userID: req.userId}}
		}
		let updateCustomerStatus = {
			$push: { logStatus: { statusCus: {statusVi: 'Sửa lịch hẹn tư vấn', statusEng: 'editSchedule'}, userID: req.userId}}
		}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.customerID }, updateCustomerStatus),
			Schedule.findByIdAndUpdate({ _id: req.params.id }, updateStatus)
		])
		.then(() => {
			req.flash('messages_editSchedule_success', 'Sửa lịch hẹn tư vấn thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Xóa lịch hẹn
	deleteSchedule(req, res, next) {
		let updateCustomerStatus = {
			$pull: { scheduleID: req.params.id  },
			$push: { logStatus: { statusCus: {statusVi: 'Xóa lịch hẹn tư vấn', statusEng: 'deleteSchedule'}, userID: req.userId}},
		}
		Promise.all([Customer.findByIdAndUpdate({ _id: req.body.cusID}, updateCustomerStatus), Schedule.delete({ _id: req.params.id })])
			.then(() => {
				req.flash('messages_deleteSchedule_success', 'Xóa lịch hẹn tư vấn thành công');
				res.redirect("back");
			})
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
			schedule: req.body.schedule,
			times: req.body.times,
			logStatus: [
				{
					statusReExam: 'Tạo mới',
					createID: req.userId
				}
			]
		})
		reexamination.save();
		let updateStatus = {
			$push: { logStatus: { statusCus: {statusVi: 'Tạo phiếu tái khám', statusEng: 'createReexam'}, userID: req.userId}, reexamID: reexamination.id}
		}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateStatus),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { reExamID: reexamination.id } }),
		])
			.then(() => {
				req.flash('messages_createReExamination_success', 'Tạo lịch tái khám thành công');
				res.redirect("back");
			})
	}

	// Danh sách phiếu tái khám
	showReExamination(req, res, next) {
		Promise.all([Reexamination.find({$or:[{status: "Tạo mới"},{status:"Đang xử lý"},{status:"Đã cập nhật"}]}).populate('customerID').populate('createName').populate('serviceNoteId').sort({ schedule: 1 }), User.findById({ _id: req.userId })])
			.then(([reExam, user]) => {
				res.render("operating/nursing/operating-re-exam", {
					reExam: multipleMongooseToObject(reExam),
					user: mongooseToObject(user),
					title: "Danh sách phiếu tái khám"
				})
			})
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
			.catch(next)
	}

	// Hiển thị trang cập nhật phiếu tái khám
	showReExaminationUpdate(req, res, next) {
		let updateStatus = {
			$set: {status: 'Đang xử lý'},
			$push: {
				logStatus: [
					{
						statusReExam: 'Đang xử lý',
						createID: req.userId
					}
				]
			}
		}
		let updateCustomerStatus = {
			$push: { logStatus: { statusCus: {statusVi: 'Đang xử lý phiếu tái khám', statusEng: 'handlingReexam'}, userID: req.userId}}
		}
		Promise.all([Reexamination.findByIdAndUpdate({ _id: req.params.id }, updateStatus).populate('customerID').populate('createName').populate('serviceNoteId'),
		User.find({ departmentEng: 'operating-room', positionEng: 'doctor', firstName: 'Nguyễn Tuấn', lastName: 'Anh'}),
		TypeService.find({})])
		.then(([reExam, doctors, typeService]) => {
				Customer.findByIdAndUpdate({ _id: reExam.customerID._id }, updateCustomerStatus)
					.then(() => {
						res.render('operating/nursing/update-re-exam', {
							reExam: mongooseToObject(reExam),
							doctors: multipleMongooseToObject(doctors),
							typeService: multipleMongooseToObject(typeService),
							title: 'Cập nhật phiếu tái khám'
						});
					});
			})
			.catch(next);
	}

	// Cập nhật phiếu tái khám hoàn thành
	updateReExamDone(req, res, next) {
		let updateCustomerStatus = {
			$set: { statusCus: { statusVi: 'Hoàn thành phiếu tái khám', statusEng: 'reExamDone'} },
			$push: { logStatus: { statusCus: {statusVi: 'Hoàn thành phiếu tái khám', statusEng: 'reExamDone'}, userID: req.userId}}
		}
		console.log(req.body.customerID)
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.customerID }, updateCustomerStatus),
			Reexamination.findByIdAndUpdate({ _id: req.params.id }, {
				$set: { status: "Hoàn thành"},
				$push: {
					logStatus: [
						{
							statusReExam: 'Hoàn thành',
							createID: req.userId
						}
					]
				}
			})
		])	
		.then(() => {
			res.redirect('back');
		})
		.catch(next);
	}


	// Sửa lịch hẹn tái khám
	editReExam(req, res, next) {
		let updateStatus = {
			$set: {schedule: req.body.schedule, reason: req.body.reason},
			$push: { logSchedules: { schedule: req.body.schedule, reason: req.body.reason}}

		}
		let updateCustomerStatus = {
			$push: { logStatus: { statusCus: {statusVi: 'Sửa lịch hẹn phiếu tái khám', statusEng: 'editReexam'}, userID: req.userId}}
		}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.customerID }, updateCustomerStatus),
			Reexamination.findByIdAndUpdate({ _id: req.params.id }, updateStatus)
		])
		.then(() => {
			res.redirect('back');
		})
		.catch(next);
	}

	// Xóa lịch hẹn tái khám
	deleteReExam(req, res, next) {
		let updateCustomerStatus = {
			$pull: { reexamID: req.params.id},
			$push: { logStatus: { statusCus: {statusVi: 'Xóa lịch hẹn tái khám', statusEng: 'deleteReexam'}, userID: req.userId}}
		}
		Promise.all([Customer.findByIdAndUpdate({ _id: req.body.cusID}, updateCustomerStatus), Reexamination.delete({ _id: req.params.id })])
			.then(() => res.redirect("back"))
			.catch(next);
	}

	// Tải ảnh khi tư vấn
	uploadCounselor(req, res, next) {
		console.log(req.body.customerID)
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
		let updateStatus = {
			$set: { statusCus: { statusVi: 'Cập nhật hình ảnh và video tư vấn', statusEng: 'uploadCounselor'} },
			$push: { logStatus: { statusCus: {statusVi: 'Cập nhật hình ảnh và video tư vấn', statusEng: 'uploadCounselor'}, userID: req.userId}}
		}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.customerID }, updateStatus),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { 
				$push: {
					counselorImg: imgArr,
					counselorVideo: videoArr,
					logStatus: {
						statusServiceNote: 'Cập nhật hình ảnh và video thông tin tư vấn',
						createID: req.userId
					}
				},
				$set: {counselorInfo: req.body.counselorInfo}
			})
		])
		.then(() => {
			req.flash('messages_uploadCounselor_success', 'Cập nhật hình ảnh và video tư vấn thành công');
			res.redirect('back');
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
		let updateStatus = {
			$set: { statusCus: { statusVi: 'Cập nhật hình ảnh và video trước phẫu thuật', statusEng: 'uploadBefore'} },
			$push: { logStatus: { statusCus: {statusVi: 'Cập nhật hình ảnh và video trước phẫu thuật', statusEng: 'uploadBefore'}, userID: req.userId}}
		}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.customerID }, updateStatus),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, {
				$push: {
					beforeImg: imgArr,
					beforeVideo: videoArr,
					logStatus: {
						statusServiceNote: 'Cập nhật hình ảnh và video trước phẫu thuật',
						createID: req.userId
					}
				},
				$set: { beforeInfo: req.body.beforeInfo }
			})
		])
		.then(() => {
			req.flash('messages_uploadBefore_success', 'Cập nhật hình ảnh và video trước phẫu thuật thành công');
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
		let updateStatus = {
			$set: { statusCus: { statusVi: 'Cập nhật hình ảnh và video phẫu thuật', statusEng: 'uploadInsurgery'} },
			$push: { logStatus: { statusCus: {statusVi: 'Cập nhật hình ảnh và video phẫu thuật', statusEng: 'uploadInsurgery'}, userID: req.userId}}
		}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.customerID }, updateStatus),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, {
				$push: {
					inSurgeryImg: imgArr,
					inSurgeryVideo: videoArr,
					logStatus: {
						statusServiceNote: 'Cập nhật hình ảnh và video thông tin phẫu thuật',
						createID: req.userId
					}
				},
				$set: { stepsToTake: req.body.stepsToTake }
			})
		])
		.then(() => {
			req.flash('messages_uploadInsurgery_success', 'Cập nhật hình ảnh và video phẫu thuật thành công');
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
		let updateStatus = {
			$set: { statusCus: { statusVi: 'Cập nhật hình ảnh và video hậu phẫu - hồi sức', statusEng: 'uploadAfter'} },
			$push: { logStatus: { statusCus: {statusVi: 'Cập nhật hình ảnh và video hậu phẫu - hồi sức', statusEng: 'uploadAfter'}, userID: req.userId}}
		}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.customerID }, updateStatus),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, {
				$push: {
					afterImg: imgArr,
					afterVideo: videoArr,
					logStatus: {
						statusServiceNote: 'Cập nhật hình ảnh và video thông tin hậu phẫu - hồi sức',
						createID: req.userId
					}
				},
				$set: {
					afterInfo: req.body.afterInfo,
					directedByDoctor: req.body.directedByDoctor,
					statusAfterInfo: req.body.statusAfterInfo
				}})
		])
		.then(() => {
			req.flash('messages_uploadAfter_success', 'Cập nhật hình ảnh và video hậu phẫu - hồi sức thành công');
			res.redirect('back');
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
		let updateStatus = {
			$set: { statusCus: { statusVi: 'Cập nhật hình ảnh và video phiếu tái khám', statusEng: 'uploadReexamination'} },
			$push: { logStatus: { statusCus: {statusVi: 'Cập nhật hình ảnh và video phiếu tái khám', statusEng: 'uploadReexamination'}, userID: req.userId}}
		}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.customerID }, updateStatus),
			Reexamination.findByIdAndUpdate({ _id: req.params.id }, {
				$push: {
					reExamImg: imgArr,
					reExamVideo: videoArr,
					performer: req.body.performer,
					nursing: req.userId,
					logStatus: [{
						statusReExam: 'Cập nhật hình ảnh và video thông tin tái khám',
						createID: req.userId
					}]
				},
				$set: {
						status: 'Đã cập nhật',
						statusInfo: req.body.statusInfo,
						directedByDoctor: req.body.directedByDoctor,
						stepsToTake: req.body.stepsToTake,
						recept: req.body.recept
				}
			})
		])
		.then(() => {
			req.flash('messages_uploadReexam_success', 'Cập nhật hình ảnh và video tái khám thành công');
			res.redirect('/operating-room/nursing/re-examination');
		})
		.catch(next);
	}

}

module.exports = new NursingController;
