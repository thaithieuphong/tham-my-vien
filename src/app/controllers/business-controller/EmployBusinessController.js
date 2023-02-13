const Customer = require("../../models/Customer");
const User = require("../../models/User");
const { mongooseToObject, multipleMongooseToObject } = require("../../../util/mongoose");
const TypeService = require("../../models/TypeService");
const Schedule = require("../../models/Schedule");
const ServiceNote = require('../../models/ServiceNote');
const Reexamination = require('../../models/Reexamination');
const Log = require('../../models/Log');
const fs = require('fs');
const path = require('path');
const { mongo } = require("mongoose");
const rootPath = path.sep;
require('dotenv').config();


class EmployBusinessController {
	//BUSINESS EMPLOY

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

	showDashboard(req, res, next) {
		res.redirect('/business/employ/customers/new')
	}

	/** Customer */
	// Show customer new
	showCustomerNew(req, res, next) {
		Promise.all([Customer.find({}).sort({'updatedAt': -1}), User.findById({ _id: req.userId }), TypeService.find({})])
			.then(([customers, user, typeservices]) => {
				let cusNew = [];
				customers.forEach(customer => {
					if (customer.statusCus.statusEng === 'New' && customer.hasServiceNote === false) {
						cusNew.push(customer);
					}
				});
				res.render("business/employ/employ-customer-new", {
					customersNew: multipleMongooseToObject(cusNew),
					user: mongooseToObject(user),
					typeservices: multipleMongooseToObject(typeservices),
					title: 'Danh sách khách hàng mới'
				});
			})
			.catch(next);
	}

	// Show customer potential
	showCustomerPotential(req, res, next) {
		Promise.all([Customer.find({}).sort({'updatedAt': -1}), User.findById({ _id: req.userId }), TypeService.find({})])
			.then(([customers, user, typeservices]) => {
				let cusPotential = [];
				customers.forEach(customer => {
					if (customer.statusCus.statusEng === 'Potential' && customer.hasServiceNote === false) {
						cusPotential.push(customer);
					}
				});
				res.render("business/employ/employ-customer-potential", {
					customersPotential: multipleMongooseToObject(cusPotential),
					user: mongooseToObject(user),
					typeservices: multipleMongooseToObject(typeservices),
					title: 'Danh sách khách hàng tiềm năng'
				});
			})
			.catch(next);
	}

	// Show customer schedule
	showCustomerSchedule(req, res, next) {
		Promise.all([Customer.find({}).sort({'updatedAt': -1}), User.findById({ _id: req.userId }), TypeService.find({})])
			.then(([customers, user, typeservices]) => {
				let cusSchedule = [];
				customers.forEach(customer => {
					if (customer.statusCus.statusEng === 'Schedule' && customer.hasServiceNote === false && customer.hasSchedule === false) {
						cusSchedule.push(customer);
					}
				});
				res.render("business/employ/employ-customer-schedule", {
					customersSchedule: multipleMongooseToObject(cusSchedule),
					user: mongooseToObject(user),
					typeservices: multipleMongooseToObject(typeservices),
					title: 'Danh sách khách hàng đặt lịch'
				});
			})
			.catch(next);
	}

	// Show customer not ok
	showCustomerNotOK(req, res, next) {
		Promise.all([Customer.find({}).sort({'updatedAt': -1}), User.findById({ _id: req.userId }), TypeService.find({})])
			.then(([customers, user, typeservices]) => {
				let cusFail = [];
				customers.forEach(customer => {
					if (customer.statusCus.statusEng === 'Fail' && customer.hasServiceNote === false) {
						cusFail.push(customer);
					}
				});
				res.render("business/employ/employ-customer-notok", {
					customersFail: multipleMongooseToObject(cusFail),
					user: mongooseToObject(user),
					typeservices: multipleMongooseToObject(typeservices),
					title: 'Danh sách khách hàng không thành công'
				});
			})
			.catch(next);
	}

	// Show customer discharge from hospital
	showCustomerDischargeFromHospital(req, res, next) {
		Promise.all([Customer.find({}).sort({'updatedAt': -1}), User.findById({ _id: req.userId }), TypeService.find({})])
			.then(([customers, user, typeservices]) => {
				let cusDisChargerFromHospital = [];
				customers.forEach(customer => {
					if (customer.statusCus.statusEng === 'dischargeFromHospital') {
						cusDisChargerFromHospital.push(customer);
					}
				});
				res.render("business/employ/employ-customer-discharge-from-hospital", {
					customersDischargeFromHospital: multipleMongooseToObject(cusDisChargerFromHospital),
					user: mongooseToObject(user),
					typeservices: multipleMongooseToObject(typeservices),
					title: 'Danh sách khách hàng xuất viện'
				});
			})
			.catch(next);
	}

	// Show customer done
	showCustomerDone(req, res, next) {
		Promise.all([Customer.find({}).sort({'updatedAt': -1}), User.findById({ _id: req.userId }), TypeService.find({})])
			.then(([customers, user, typeservices]) => {
				let cusDone = [];
				customers.forEach(customer => {
					if (customer.statusCus.statusEng === 'dischargeFromHospital') {
						cusDone.push(customer);
					}
				});
				res.render("business/employ/employ-customer-done", {
					customersDone: multipleMongooseToObject(cusDone),
					user: mongooseToObject(user),
					typeservices: multipleMongooseToObject(typeservices),
					title: 'Danh sách khách hàng hoàn thành'
				});
			})
			.catch(next);
	}

	// Show create customer page
	showCustomerCreate(req, res, next) {
		res.render('business/employ/employ-customer-create', {
			title: 'Tạo thông tin khách hàng'
		});
	}


	// create customer
	createCustomer(req, res, next) {
		if (req.file) {
			if(req.body.statusVi === 'Tạo mới') {
				const customer = new Customer({
					userID: req.userId,
					identification: req.body.identification,
					nickName: req.body.nickName,
					fullName: req.body.fullName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					height: req.body.height,
					weight: req.body.weight,
					homeTown: req.body.homeTown,
					resource: req.body.resource,
					description: req.body.description,
					hasServiceNote: false,
					hasReExam: false,
					hasSchedule: false,
					statusCus: {
						statusVi: req.body.statusVi,
						statusEng: 'New'
					},
					logStatus: [
						{
							statusCus: {
								statusVi: req.body.statusVi,
								statusEng: 'New'
							},
							surgeryDay: null
						}
					],
					image: {
						name: req.file.filename,
						url: req.file.path,
					},
				});
				customer.save();
				req.flash('messages_createCustomer_success', 'Tạo khách hàng thành công');
				res.redirect("/business/employ/customers/new");
			}

			if(req.body.statusVi === 'Tiềm năng') {
				const customer = new Customer({
					userID: req.userId,
					identification: req.body.identification,
					nickName: req.body.nickName,
					fullName: req.body.fullName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					height: req.body.height,
					weight: req.body.weight,
					homeTown: req.body.homeTown,
					resource: req.body.resource,
					description: req.body.description,
					hasServiceNote: false,
					hasReExam: false,
					hasSchedule: false,
					statusCus: {
						statusVi: req.body.statusVi,
						statusEng: 'Potential'
					},
					logStatus: [
						{
							statusCus: {
								statusVi: req.body.statusVi,
								statusEng: 'Potential'
							},
							surgeryDay: null
						}
					],
					image: {
						name: req.file.filename,
						url: req.file.path,
					},
				});
				customer.save();
				req.flash('messages_createCustomer_success', 'Tạo khách hàng thành công');
				res.redirect("/business/employ/customers/potential");
			}

			if(req.body.statusVi === 'Đặt lịch') {
				const customer = new Customer({
					userID: req.userId,
					identification: req.body.identification,
					nickName: req.body.nickName,
					fullName: req.body.fullName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					height: req.body.height,
					weight: req.body.weight,
					homeTown: req.body.homeTown,
					resource: req.body.resource,
					description: req.body.description,
					hasServiceNote: false,
					hasReExam: false,
					hasSchedule: false,
					statusCus: {
						statusVi: req.body.statusVi,
						statusEng: 'Schedule'
					},
					logStatus: [
						{
							statusCus: {
								statusVi: req.body.statusVi,
								statusEng: 'Schedule'
							},
							surgeryDay: null
						}
					],
					image: {
						name: req.file.filename,
						url: req.file.path,
					},
				});
				customer.save();
				req.flash('messages_createCustomer_success', 'Tạo khách hàng thành công');
				res.redirect("/business/employ/customers/schedule");
			}
		} else {
			if(req.body.statusVi === 'Tạo mới') {
				const customer = new Customer({
					userID: req.userId,
					identification: req.body.identification,
					nickName: req.body.nickName,
					fullName: req.body.fullName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					height: req.body.height,
					weight: req.body.weight,
					homeTown: req.body.homeTown,
					resource: req.body.resource,
					description: req.body.description,
					hasServiceNote: false,
					hasReExam: false,
					hasSchedule: false,
					statusCus: {
						statusVi: req.body.statusVi,
						statusEng: 'New'
					},
					logStatus: [
						{
							statusCus: {
								statusVi: req.body.statusVi,
								statusEng: 'New'
							},
							surgeryDay: null
						}
					],
					image: {
						name: "",
						url: "",
					},
				});
				customer.save();
				req.flash('messages_createCustomer_success', 'Tạo khách hàng thành công');
				res.redirect("/business/employ/customers/new");
			}

			if(req.body.statusVi === 'Tiềm năng') {
				const customer = new Customer({
					userID: req.userId,
					identification: req.body.identification,
					nickName: req.body.nickName,
					fullName: req.body.fullName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					height: req.body.height,
					weight: req.body.weight,
					homeTown: req.body.homeTown,
					resource: req.body.resource,
					description: req.body.description,
					hasServiceNote: false,
					hasReExam: false,
					hasSchedule: false,
					statusCus: {
						statusVi: req.body.statusVi,
						statusEng: 'Potential'
					},
					logStatus: [
						{
							statusCus: {
								statusVi: req.body.statusVi,
								statusEng: 'Potential'
							},
							surgeryDay: null
						}
					],
					image: {
						name: "",
						url: "",
					},
				});
				customer.save();
				req.flash('messages_createCustomer_success', 'Tạo khách hàng thành công');
				res.redirect("/business/employ/customers/potential");
			}

			if(req.body.statusVi === 'Đặt lịch') {
				const customer = new Customer({
					userID: req.userId,
					identification: req.body.identification,
					nickName: req.body.nickName,
					fullName: req.body.fullName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					height: req.body.height,
					weight: req.body.weight,
					homeTown: req.body.homeTown,
					resource: req.body.resource,
					description: req.body.description,
					hasServiceNote: false,
					hasReExam: false,
					hasSchedule: false,
					statusCus: {
						statusVi: req.body.statusVi,
						statusEng: 'Schedule'
					},
					logStatus: [
						{
							statusCus: {
								statusVi: req.body.statusVi,
								statusEng: 'Schedule'
							},
							surgeryDay: null
						}
					],
					image: {
						name: "",
						url: "",
					},
				});
				customer.save();
				req.flash('messages_createCustomer_success', 'Tạo khách hàng thành công');
				res.redirect("/business/employ/customers/schedule");
			}
		}
	}

	// Show edit customer page
	showCustomerEdit(req, res, next) {
		Customer.findById({ _id: req.params.id })
			.then(customer => {
				res.render('business/employ/employ-customer-edit', {
					customer: mongooseToObject(customer),
					title: 'Sửa / cập nhật thông tin khách hàng'
				});
			})
			.catch(next);
	}

	// edit customer
	editCustomer(req, res, next) {
		if (req.file) {
			if(req.body.statusVi === 'Tạo mới') {
				Customer.findByIdAndUpdate(
					{ _id: req.params.id },
					{
						userID: req.userId,
						identification: req.body.identification,
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						birth: req.body.birth,
						gender: req.body.gender,
						phone: req.body.phone,
						height: req.body.height,
						weight: req.body.weight,
						homeTown: req.body.homeTown,
						resource: req.body.resource,
						description: req.body.description,
						statusCus: {
							statusVi: req.body.statusVi,
							statusEng: 'New'
						},
						logStatus: [
							{
								statusCus: {
									statusVi: req.body.statusVi,
									statusEng: 'New'
								},
								surgeryDay: null
							}
						],
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
						req.flash('messages_editCustomer_success', 'Chỉnh sửa thông tin khách hàng thành công');
						res.redirect("/business/employ/customers/new");
					})
					.catch(next);
			}

			if(req.body.statusVi === 'Tiềm năng') {
				Customer.findByIdAndUpdate(
					{ _id: req.params.id },
					{
						userID: req.userId,
						identification: req.body.identification,
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						birth: req.body.birth,
						gender: req.body.gender,
						phone: req.body.phone,
						height: req.body.height,
						weight: req.body.weight,
						homeTown: req.body.homeTown,
						resource: req.body.resource,
						description: req.body.description,
						statusCus: {
							statusVi: req.body.statusVi,
							statusEng: 'Potential'
						},
						logStatus: [
							{
								statusCus: {
									statusVi: req.body.statusVi,
									statusEng: 'Potential'
								},
								surgeryDay: null
							}
						],
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
						req.flash('messages_editCustomer_success', 'Chỉnh sửa thông tin khách hàng thành công');
						res.redirect("/business/employ/customers/potential");
					})
					.catch(next);
			}

			if(req.body.statusVi === 'Đặt lịch') {
				Customer.findByIdAndUpdate(
					{ _id: req.params.id },
					{
						userID: req.userId,
						identification: req.body.identification,
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						birth: req.body.birth,
						gender: req.body.gender,
						phone: req.body.phone,
						height: req.body.height,
						weight: req.body.weight,
						homeTown: req.body.homeTown,
						resource: req.body.resource,
						description: req.body.description,
						statusCus: {
							statusVi: req.body.statusVi,
							statusEng: 'Schedule'
						},
						logStatus: [
							{
								statusCus: {
									statusVi: req.body.statusVi,
									statusEng: 'Schedule'
								},
								surgeryDay: null
							}
						],
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
						req.flash('messages_editCustomer_success', 'Chỉnh sửa thông tin khách hàng thành công');
						res.redirect("/business/employ/customers/schedule");
					})
					.catch(next);
			}

			if(req.body.statusVi === 'Không thành công') {
				Customer.findByIdAndUpdate(
					{ _id: req.params.id },
					{
						userID: req.userId,
						identification: req.body.identification,
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						birth: req.body.birth,
						gender: req.body.gender,
						phone: req.body.phone,
						height: req.body.height,
						weight: req.body.weight,
						homeTown: req.body.homeTown,
						resource: req.body.resource,
						description: req.body.description,
						statusCus: {
							statusVi: req.body.statusVi,
							statusEng: 'Fail'
						},
						logStatus: [
							{
								statusCus: {
									statusVi: req.body.statusVi,
									statusEng: 'Fail'
								},
								surgeryDay: null
							}
						],
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
						req.flash('messages_editCustomer_success', 'Chỉnh sửa thông tin khách hàng thành công');
						res.redirect("/business/employ/customers/notok");
					})
					.catch(next);
			}
		} else {
			if(req.body.statusVi === 'Tạo mới') {
				Customer.findByIdAndUpdate({ _id: req.params.id },{
					userID: req.userId,
					identification: req.body.identification,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					height: req.body.height,
					weight: req.body.weight,
					homeTown: req.body.homeTown,
					resource: req.body.resource,
					description: req.body.description,
					
				})
				.then((customer) => {
					req.flash('messages_editCustomer_success', 'Chỉnh sửa thông tin khách hàng thành công');
					res.redirect("/business/employ/customers/new");
				})
				.catch(next);
			}

			if(req.body.statusVi === 'Tiềm năng') {
				Customer.findByIdAndUpdate({ _id: req.params.id },{
					userID: req.userId,
					identification: req.body.identification,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					height: req.body.height,
					weight: req.body.weight,
					homeTown: req.body.homeTown,
					resource: req.body.resource,
					description: req.body.description,
					statusCus: {
						statusVi: req.body.statusVi,
						statusEng: 'Potential'
					},
					logStatus: [
						{
							statusCus: {
								statusVi: req.body.statusVi,
								statusEng: 'Potential'
							},
							surgeryDay: null
						}
					],
				})
				.then((customer) => {
					req.flash('messages_editCustomer_success', 'Chỉnh sửa thông tin khách hàng thành công');
					res.redirect("/business/employ/customers/potential");
				})
				.catch(next);
			}

			if(req.body.statusVi === 'Đặt lịch') {
				Customer.findByIdAndUpdate({ _id: req.params.id },{
					userID: req.userId,
					identification: req.body.identification,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					height: req.body.height,
					weight: req.body.weight,
					homeTown: req.body.homeTown,
					resource: req.body.resource,
					description: req.body.description,
					statusCus: {
						statusVi: req.body.statusVi,
						statusEng: 'Schedule'
					},
					logStatus: [
						{
							statusCus: {
								statusVi: req.body.statusVi,
								statusEng: 'Schedule'
							},
							surgeryDay: null
						}
					],
				})
				.then((customer) => {
					req.flash('messages_editCustomer_success', 'Chỉnh sửa thông tin khách hàng thành công');
					res.redirect("/business/employ/customers/schedule");
				})
				.catch(next);
			}

			if(req.body.statusVi === 'Không thành công') {
				Customer.findByIdAndUpdate({ _id: req.params.id },{
					userID: req.userId,
					identification: req.body.identification,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					height: req.body.height,
					weight: req.body.weight,
					homeTown: req.body.homeTown,
					resource: req.body.resource,
					description: req.body.description,
					statusCus: {
						statusVi: req.body.statusVi,
						statusEng: 'Fail'
					},
					logStatus: [
						{
							statusCus: {
								statusVi: req.body.statusVi,
								statusEng: 'Fail'
							},
							surgeryDay: null
						}
					],
				})
				.then((customer) => {
					req.flash('messages_editCustomer_success', 'Chỉnh sửa thông tin khách hàng thành công');
					res.redirect("/business/employ/customers/notok");
				})
				.catch(next);
			}
		}
	}

	showCustomerDetail(req, res, next) {
		Promise.all([
			Customer.findById({ _id: req.params.id }).populate('serviceNoteID'),
			User.findById({ _id: req.userId })
		])
		.then(([customer, user]) => {
			res.render('business/employ/employ-customer-detail', {
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
			{$push: { comments: { comment: req.body.comments } }, userID: req.userId}
		)
			.then(() => res.redirect("back"))
			.catch(next);
	}

	moveToPotential(req, res, next) {
		let updateCus = {
			$set: { statusCus: { statusVi: 'Tiềm năng', statusEng: 'Potential'}, storage: null },
			$push: { logStatus: { statusCus: {statusVi: 'Tiềm năng', statusEng: 'Potential'}, surgeryDay: null}}

		}
		Customer.findByIdAndUpdate({ _id: req.params.id }, updateCus)
			.then(() => {
				req.flash('messages_moveCustomer_success', 'Chuyển trạng thái khách hàng thành công');
				res.redirect('/business/employ/customers/potential');
			})
			.catch(next);
	}

	moveToSchedule(req, res, next) {
		let updateCus = {
			$set: { statusCus: { statusVi: 'Đặt lịch', statusEng: 'Schedule'}, storage: null },
			$push: { logStatus: { statusCus: {statusVi: 'Đặt lịch', statusEng: 'Schedule'}, surgeryDay: null}}

		}
		Customer.findByIdAndUpdate({ _id: req.params.id }, updateCus)
			.then(() => {
				req.flash('messages_moveCustomer_success', 'Chuyển trạng thái khách hàng thành công');
				res.redirect('/business/employ/customers/schedule');
			})
			.catch(next);
	}

	moveToNotOK(req, res, next) {
		let updateCus = {
			$set: { statusCus: { statusVi: 'Không thành công', statusEng: 'Fail'}, storage: null },
			$push: { logStatus: { statusCus: {statusVi: 'Không thành công', statusEng: 'Fail'}, surgeryDay: null}}

		}
		Customer.findByIdAndUpdate({ _id: req.params.id }, updateCus)
			.then(() => {
				req.flash('messages_moveCustomer_success', 'Chuyển trạng thái khách hàng thành công');
				res.redirect('/business/employ/customers/notok');
			})
			.catch(next);
	}

	// Hiển thị lịch hẹn tư vấn với điều kiện hasServiceNote: false
	showSchedules(req, res, next) {
		// Tìm tất cả lịch hẹn tư vấn của khách hàng có hasServiceNote: false
		Schedule.find({}).populate('customerID')
			.then((schedules) => {
				let scheduleArr = schedules.filter(schedule => !schedule.customerID.hasServiceNote && schedule.customerID.hasSchedule ? schedule : null);
				res.render('business/employ/employ-schedule', {
					title: 'Lịch hẹn tư vấn',
					schedules: multipleMongooseToObject(scheduleArr),
				})
			})
			.catch(next);
	}

	// Hiển thị trang thùng rác lịch hẹn tư vấn
	showScheduleTrash(req, res, next) {
		Schedule.findDeleted({}).populate('customerID')
			.then(schedules => {
				res.render('business/employ/employ-schedule-trash', {
					title: 'Lịch hẹn tư vấn đã hủy',
					schedules: multipleMongooseToObject(schedules),
				})
			})
	}

	// Hiển thị trang đặt lịch tư vấn
	showCreateSchedule(req, res, next) {
		Promise.all([
			Customer.findById({ _id: req.params.id }),
			TypeService.find({})
		])
		.then(([customer, typeservices]) => {
			res.render('business/employ/employ-schedule-create', {
				title: 'Đặt lịch hẹn tư vấn',
				customer: mongooseToObject(customer),
				typeservices: multipleMongooseToObject(typeservices)
			})
		})
		.catch(next);
	}

	// Tạo lịch hẹn tư vấn
	createSchedule(req, res, next) {
		const cusID = req.params.id;
		const createName = req.body.createName;
		const service = req.body.service;
		const scheduleBody = req.body.schedule;
		const priceBefore = req.body.priceBefore;
		const deposit = req.body.deposit;
		const comment = req.body.comment;
		const schedule = new Schedule({
			customerID: cusID,
			createName: createName,
			status: "Tạo mới",
			service: service,
			comments: { comment: comment },
			schedule: scheduleBody,
			priceBefore: priceBefore,
			deposit: deposit,
		});
		schedule.save();
		Customer.findByIdAndUpdate({ _id: req.params.id }, {
			$push: {
				scheduleID: schedule.id,
				loggers: {
					userID: req.userId,
					contents: schedule
				}},
			$set: { hasSchedule: true }
			
		})
		.then(() => {
			req.flash('messages_createSchedule_success', 'Đặt lịch hẹn thành công');
			res.redirect('/business/employ/customers/schedule');
		})
		.catch(next);
	}

	// Show schedule edit
	showScheduleEdit(req, res, next) {
		Promise.all([
			Schedule.findById({ _id: req.params.id }).populate({
				path: 'customerID'
			}),
			TypeService.find({})
		])
		.then(([schedule, typeservices]) => {
			res.render('business/employ/employ-schedule-edit', {
				title: 'Sửa / cập nhật thông tin lịch hẹn tư vấn',
				schedule: mongooseToObject(schedule),
				typeservices: multipleMongooseToObject(typeservices)
			})
		})
		.catch(next);
	}

	// Sửa lịch hẹn tư vấn
	editSchedule(req, res, next) {
		let updateStatus = {
			$set: {schedule: req.body.schedule, reasons: { reason: req.body.reason }, deposit: req.body.deposit, priceBefore: req.body.priceBefore},
			$push: { logSchedules: { schedule: req.body.schedule, reason: req.body.reason, reasons: { reason: req.body.reason, service: req.body.service} , userID: req.userId}, service: req.body.service}
		}
		let updateCustomerStatus = {
			$push: {
				logStatus: {
					statusCus: {
						statusVi: 'Sửa lịch hẹn tư vấn', statusEng: 'editSchedule'
					},
					userID: req.userId
				},
				loggers: {
					userID: req.userId,
					contents: {
						schedule: req.body.schedule,
						service: req.body.service,
						reasons: {
							reason: req.body.reason,
							service: req.body.service
						},
						deposit: req.body.deposit,
						priceBefore: req.body.priceBefore,
					}
				}
			}
		}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.customerID }, updateCustomerStatus),
			Schedule.findByIdAndUpdate({ _id: req.params.id }, updateStatus)
		])
		.then(() => {
			req.flash('messages_editSchedule_success', 'Sửa lịch hẹn tư vấn thành công');
			res.redirect('/business/employ/schedules');
		})
		.catch(next);
	}

	// Xóa dịch vụ đã chọn trong lịch hẹn
	deleteServiceSchedule(req, res, next) {
		let contentUpdate = {
			$pull: { service: req.body.service },
			$push: { logSchedules: { reasons: { content: `Xóa dịch vụ ${req.body.service}` }, userID: req.userId }}
		}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.customerID }, {loggers: {
				userID: req.userId,
				contents: {
					service: req.body.service,
					reasons: {
						reason: `Xóa dịch vụ ${req.body.service}`,
						service: req.body.service
					}
				}
			}})
		])
		Schedule.findByIdAndUpdate({ _id: req.params.id }, contentUpdate)
			.then(() => {
				req.flash('messages_deleteService_success', 'Xóa dịch vụ thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Xóa lịch hẹn tư vấn
	deleteSchedule(req, res, next) {
		Promise.all([
			Customer.findByIdAndUpdate( { _id: req.body.customerID }, { 
				loggers: {
					userID: req.userId,
					contents: {
						reasons: {
							reason: `Hủy lịch hẹn`,
						}
					}
				},
				hasSchedule: false
			}),
			Schedule.delete({ _id: req.params.id} )
		])
		.then(() => {
			req.flash('messages_deleteSchedule_success', 'Xóa lịch hẹn tư vấn thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Khôi phục lịch hẹn tư vấn
	restoreSchedule(req, res, next) {
		Promise.all([
			Customer.findByIdAndUpdate( { _id: req.body.customerID }, { hasSchedule: true } ),
			Schedule.restore({ _id: req.params.id} )
		])
			.then(() => {
				req.flash('messages_restoreSchedule_success', 'Khôi phục lịch hẹn tư vấn thành công');
				res.redirect('/business/employ/schedules');
			})
			.catch(next);
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
				res.redirect('back');
			})
			.catch(next);
	}

	// Chi tiết khách hàng xuất viện
	showCustomerDischargeFromHospitalDetail(req, res, next) {
		Customer.findById({ _id: req.params.id }).populate({
			path: 'serviceNoteID',
			match: {
				status: 'Xuất viện'
			},
			populate: {
				path: 'performer'
			}
		})
		.then(customer => {
			res.render('business/employ/employ-customer-discharge-from-hospital-detail', {
				title: 'Chi tiết khách hàng xuất viện',
				customer: mongooseToObject(customer)
			})
		})
		.catch(next);
	}

	// Hiển thị trang tạo phiếu dịch vụ
	serviceNoteCreate(req, res, next) {
		console.log(req.params.id)
		console.log(req.body)
		const serviceNote = new ServiceNote({
			scheduleID: req.params.id,
			logStatus: [{
				statusServiceNote: 'Tạo mới',
				createID: req.userId
			}]
		});
		serviceNote.save()
			.then(serviceNote => {
				Promise.all([
					Customer.findByIdAndUpdate({ _id: req.body.customerID }, { $set: { serviceNoteID: serviceNote._id, hasServiceNote: true },
						$push: {
							logStatus: {
								contents: {
									customerID: req.body.customerID,
									serviceNoteID: serviceNote._id,
									scheduleID: req.params.id,
									title: 'Đã tạo phiếu dịch vụ'
								},
								userID: req.userId
							},
							loggers: {
								contents: {
									customerID: req.body.customerID,
									serviceNoteID: serviceNote._id,
									scheduleID: req.params.id,
									title: 'Đã tạo phiếu dịch vụ'
								},
								userID: req.userId
							}
						}}),
					Schedule.findByIdAndUpdate({ _id: req.params.id }, { $set: { serviceNoteID: serviceNote._id, status: 'Đang xử lý' },
						$push: {
							logSchedules: {
								reasons: {
									title: 'Đã tạo phiếu dịch vụ cho lịch hẹn này',
									serviceNoteID: serviceNote._id
								}
							},
							userID: req.userId
						}})
				])
				.then(() => {
					res.redirect(`/business/employ/service-note/${serviceNote._id}/update`)
				})
				.catch(next);
			})
			.catch(next);
	}

	showServiceNoteList(req, res, next) {
		Promise.all([
			ServiceNote.find({})
				.populate({
					path: 'scheduleID',
					populate: {
						path: 'customerID',
						model: 'Customer',
						
					}
				}),
			User.findById({ _id: req.userId }),
		])
		.then(([serviceNotes, user]) => {
			console.log(serviceNotes)
			res.render('business/employ/employ-service-note-list', {
				title: 'Danh sách phiếu dịch vụ',
				serviceNotes: multipleMongooseToObject(serviceNotes),
				user: mongooseToObject(user)
			})
		})
		.catch(next);
	}

	showServiceNoteUpdate(req, res, next) {
		Promise.all([
			ServiceNote.findById({ _id: req.params.id }).populate({
				path: 'scheduleID',
				populate: {
					path: 'customerID',
					model: 'Customer'
				}
			}),
			User.find({ departmentEng: 'operating-room', positionEng: 'doctor', firstName: 'Nguyễn Tuấn', lastName: 'Anh'}),
			User.findById({ _id: req.userId }),
		])
		.then(([serviceNote, doctor, user]) => {
			res.render('business/employ/employ-service-note-update', {
				title: 'Cập nhật phiếu dịch vụ',
				serviceNote: mongooseToObject(serviceNote),
				doctor: multipleMongooseToObject(doctor),
				user: mongooseToObject(user)
			})
		})
		.catch(next);
	}

	// Cập nhật thông tin khách hàng trên phiếu dịch vụ
	updateCusInfor(req, res, next) {
		Promise.all([
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, req.body),
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, req.body)
		])
			.then(() => {
				req.flash('messages_updateCusInfo_success', 'Cập nhật thông tin cá nhân khách hàng thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Cập nhật thông tin dịch vụ trên phiếu dịch vụ
	updateServiceInfor(req, res, next) {
		console.log(req.body)
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
				deposit: req.body.deposit,
				discount: req.body.discount,
				totalServiceCharge: req.body.totalServiceCharge,
				amountToBePaid: req.body.amountToBePaid,
				total: req.body.total,
				$set: { status: 'Đang xử lý'},
				$push: { logStatus: { statusServiceNote: 'Cập nhật dịch vụ', createID: req.userId}, service: serviceArr}
			}),
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateCus)
		])
		.then(() => {
			req.flash('messages_updateService_success', 'Cập nhật dịch vụ thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Xóa dịch vụ trên phiếu dịch vụ
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

	// Hiển thị trang thùng rác phiếu dịch vụ
	showServiceNoteTrash(req, res, next) {
		Promise.all([
			ServiceNote.findDeleted({}).populate({
				path: 'scheduleID',
				populate: {
					path: 'customerID',
					model: 'Customer'
				}
			}),
			User.findById({ _id: req.userId }),
		])
		.then(([serviceNotes, user]) => {
			console.log(serviceNotes)
			res.render('business/employ/employ-service-note-trash', {
				title: 'Phiếu dịch vụ đã hủy',
				serviceNotes: multipleMongooseToObject(serviceNotes),
				user: mongooseToObject(user)
			})
		})
		.catch(next);
	}

	// Xóa phiếu dịch vụ
	deleteServiceNote(req, res, next) {
		Promise.all([
			Customer.findByIdAndUpdate( { _id: req.body.customerID }, { 
				loggers: {
					userID: req.userId,
					contents: {
						reasons: {
							reason: `Hủy phiếu dịch vụ`,
						}
					}
				},
				hasSchedule: false,
				hasServiceNote: false
			}),
			Schedule.findByIdAndUpdate({ _id: req.body.scheduleID }, { status: 'Đã xóa phiếu dịch vụ' }),
			ServiceNote.delete({ _id: req.params.id })
		])
		.then(() => {
			req.flash('messages_deleteServiceNote_success', 'Xóa phiếu dịch vụ thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Khôi phục phiếu dịch vụ
	restoreServiceNote(req, res, next) {
		Promise.all([
			Customer.findByIdAndUpdate( { _id: req.body.customerID }, { hasSchedule: true, hasServiceNote: true } ),
			Schedule.findByIdAndUpdate( { _id: req.body.scheduleID }, { status: 'Đang xử lý' } ),
			ServiceNote.restore({ _id: req.params.id} )
		])
			.then(() => {
				req.flash('messages_restoreServiceNote_success', 'Khôi phục phiếu dịch vụ thành công');
				res.redirect('/business/employ/service-note');
			})
			.catch(next);
	}

	// Tải ảnh khi tư vấn
	uploadCounselor(req, res, next) {
		const file = req.files;
		const imgArr = [];
		const videoArr = [];
		file.forEach((element, index) => {
			if (element.mimetype === 'image/jpg' || element.mimetype === 'image/jpeg' || element.mimetype === 'image/png') {
				imgArr.push({ name: element.filename, url: element.path, notDeletedYet: true });
				return imgArr;
			} else if (element.mimetype === 'video/avi' || element.mimetype === 'video/flv' || element.mimetype === 'video/wmv' || element.mimetype === 'video/mov' || element.mimetype === 'video/mp4' || element.mimetype === 'video/webm') {
				videoArr.push({ name: element.filename, url: element.path, notDeletedYet: true });
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

	// Xóa ảnh khi tư vấn
	deleteCounselorImg(req, res, next) {
		console.log(req.body.imgName)
		let imgName = req.body.imgName;
		const arrayFilters = [];
		arrayFilters.push({ name:  imgName });
		console.log(arrayFilters)
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = {
			$set: { "counselorImg.$.notDeletedYet": false },
		}
		ServiceNote.findById({ _id: req.params.id })
					.updateMany({ ['counselorImg.name']: req.body.imgName }, updateDocument, options)
					.then(() => {
						req.flash('messages_deletedCounselorImg_success', 'Xóa hình ảnh tư vấn thành công');
						res.redirect('back');
					})
					.catch(next);
	}

	// Khôi phục ảnh khi tư vấn
	restoreCounselorImg(req, res, next) {
		console.log(req.body.imgName)
		let imgName = req.body.imgName;
		const arrayFilters = [];
		arrayFilters.push({ name:  imgName });
		console.log(arrayFilters)
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = {
			$set: { "counselorImg.$.notDeletedYet": true },
		}
		ServiceNote.findById({ _id: req.params.id })
					.updateMany({ ['counselorImg.name']: req.body.imgName }, updateDocument, options)
					.then(() => {
						req.flash('messages_restoreCounselorImg_success', 'Khôi phục hình ảnh tư vấn thành công');
						res.redirect('back');
					})
					.catch(next);
	}

	// Xóa video khi tư vấn
	deleteCounselorVideo(req, res, next) {
		console.log(req.body.videoName)
		let videoName = req.body.videoName;
		const arrayFilters = [];
		arrayFilters.push({ name:  videoName });
		console.log(arrayFilters)
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = {
			$set: { "counselorVideo.$.notDeletedYet": false },
		}
		ServiceNote.findById({ _id: req.params.id })
					.updateMany({ ['counselorVideo.name']: req.body.videoName }, updateDocument, options)
					.then(() => {
						req.flash('messages_deletedCounselorVideo_success', 'Xóa video tư vấn thành công');
						res.redirect('back');
					})
					.catch(next);
	}

	// Khôi phục video khi tư vấn
	restoreCounselorVideo(req, res, next) {
		console.log(req.body.videoName)
		let videoName = req.body.videoName;
		const arrayFilters = [];
		arrayFilters.push({ name:  videoName });
		console.log(arrayFilters)
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = {
			$set: { "counselorVideo.$.notDeletedYet": true },
		}
		ServiceNote.findById({ _id: req.params.id })
					.updateMany({ ['counselorVideo.name']: req.body.videoName }, updateDocument, options)
					.then(() => {
						req.flash('messages_restoreCounselorImg_success', 'Khôi phục video tư vấn thành công');
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

	// Xóa ảnh khi phẫu thuật
	deleteInSurgeryImg(req, res, next) {
		console.log(req.body.imgName)
		let imgName = req.body.imgName;
		const arrayFilters = [];
		arrayFilters.push({ name:  imgName });
		console.log(arrayFilters)
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = {
			$set: { "inSurgeryImg.$.notDeletedYet": false },
		}
		ServiceNote.findById({ _id: req.params.id })
					.updateMany({ ['inSurgeryImg.name']: req.body.imgName }, updateDocument, options)
					.then(() => {
						req.flash('messages_deletedInSurgeryImg_success', 'Xóa hình ảnh phẫu thuật thành công');
						res.redirect('back');
					})
					.catch(next);
	}

	// Xóa video khi phẫu thuật
	deleteInSurgeryVideo(req, res, next) {
		console.log(req.body.videoName)
		let videoName = req.body.videoName;
		const arrayFilters = [];
		arrayFilters.push({ name:  videoName });
		console.log(arrayFilters)
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = {
			$set: { "inSurgeryVideo.$.notDeletedYet": false },
		}
		ServiceNote.findById({ _id: req.params.id })
					.updateMany({ ['inSurgeryVideo.name']: req.body.videoName }, updateDocument, options)
					.then(() => {
						req.flash('messages_deletedInSurgeryVideo_success', 'Xóa video phẫu thuật thành công');
						res.redirect('back');
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

	// Xóa ảnh thay băng cắt chỉ
	deleteAfterImg(req, res, next) {
		console.log(req.body.imgName)
		let imgName = req.body.imgName;
		const arrayFilters = [];
		arrayFilters.push({ name:  imgName });
		console.log(arrayFilters)
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = {
			$set: { "afterImg.$.notDeletedYet": false },
		}
		ServiceNote.findById({ _id: req.params.id })
					.updateMany({ ['afterImg.name']: req.body.imgName }, updateDocument, options)
					.then(() => {
						req.flash('messages_deletedAfterImg_success', 'Xóa hình ảnh thay băng thành công');
						res.redirect('back');
					})
					.catch(next);
	}

	// Xóa video thay băng cắt chỉ
	deleteAfterVideo(req, res, next) {
		console.log(req.body.videoName)
		let videoName = req.body.videoName;
		const arrayFilters = [];
		arrayFilters.push({ name:  videoName });
		console.log(arrayFilters)
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = {
			$set: { "afterVideo.$.notDeletedYet": false },
		}
		ServiceNote.findById({ _id: req.params.id })
					.updateMany({ ['afterVideo.name']: req.body.videoName }, updateDocument, options)
					.then(() => {
						req.flash('messages_deletedAfterVideo_success', 'Xóa video thay băng thành công');
						res.redirect('back');
					})
					.catch(next);
	}

	// Chi tiết phiếu dịch vụ
	showServiceNoteDetail(req, res, next) {
		ServiceNote.findById({ _id: req.params.id }).populate('performer')
		.populate({
			path: 'scheduleID',
			populate: {
				path: 'customerID',
				populate: {
					path: 'userID',
					model: 'User'
				}
			}
		}).populate({
			path: 'performer',
			model: 'User'
		})
		.then(serviceNote => {
			res.render('business/employ/employ-service-note-detail', {
				title: 'Chi tiết phiếu dịch vụ',
				serviceNote: mongooseToObject(serviceNote)
			})
		})
	}
}

module.exports = new EmployBusinessController();
