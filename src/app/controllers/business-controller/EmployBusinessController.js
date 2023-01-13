const Customer = require("../../models/Customer");
const User = require("../../models/User");
const { mongooseToObject, multipleMongooseToObject } = require("../../../util/mongoose");
const TypeService = require("../../models/TypeService");
const Schedule = require("../../models/Schedule");
const ServiceNote = require('../../models/ServiceNote');
const Reexamination = require('../../models/Reexamination');
const fs = require('fs');
const path = require('path');
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
					if (customer.statusCus.statusEng === 'Schedule' && customer.hasServiceNote === false) {
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

			// if(req.body.statusVi === 'Không thành công') {
			// 	const customer = new Customer({
			// 		userID: req.userId,
			// 		identification: req.body.identification,
			// 		nickName: req.body.nickName,
			// 		fullName: req.body.fullName,
			// 		birth: req.body.birth,
			// 		gender: req.body.gender,
			// 		phone: req.body.phone,
			// 		height: req.body.height,
			// 		weight: req.body.weight,
			// 		homeTown: req.body.homeTown,
			// 		resource: req.body.resource,
			// 		description: req.body.description,
			// 		statusCus: {
			// 			statusVi: req.body.statusVi,
			// 			statusEng: 'Fail'
			// 		},
			// 		logStatus: [
			// 			{
			// 				statusCus: {
			// 					statusVi: req.body.statusVi,
			// 					statusEng: 'Fail'
			// 				},
			// 				surgeryDay: null
			// 			}
			// 		],
			// 		image: {
			// 			name: req.file.filename,
			// 			url: req.file.path,
			// 		},
			// 	});
			// 	customer.save();
			// 	req.flash('messages_createCustomer_success', 'Tạo khách hàng thành công');
			// 	res.redirect("/business/employ/customers/notok");
			// }
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

			// if(req.body.statusVi === 'Không thành công') {
			// 	const customer = new Customer({
			// 		userID: req.userId,
			// 		identification: req.body.identification,
			// 		nickName: req.body.nickName,
			// 		fullName: req.body.fullName,
			// 		birth: req.body.birth,
			// 		gender: req.body.gender,
			// 		phone: req.body.phone,
			// 		height: req.body.height,
			// 		weight: req.body.weight,
			// 		homeTown: req.body.homeTown,
			// 		resource: req.body.resource,
			// 		description: req.body.description,
			// 		statusCus: {
			// 			statusVi: req.body.statusVi,
			// 			statusEng: 'Fail'
			// 		},
			// 		logStatus: [
			// 			{
			// 				statusCus: {
			// 					statusVi: req.body.statusVi,
			// 					statusEng: 'Fail'
			// 				},
			// 				surgeryDay: null
			// 			}
			// 		],
			// 		image: {
			// 			name: "",
			// 			url: "",
			// 		},
			// 	});
			// 	customer.save();
			// 	req.flash('messages_createCustomer_success', 'Tạo khách hàng thành công');
			// 	res.redirect("/business/employ/customers/notok");
			// }
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
			console.log(req.body)
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

	// show schedule
	showSchedule(req, res, next) {
		// Promise.all([
		// 	Schedule.find({ createName: req.userId, status: "Tạo mới" }).populate('customerID').populate('createName'),
		// 	// Schedule.find({ createName: req.userId, status: 'Đang xử lý'}).populate('customerID').populate('createName').populate('serviceNoteID'),
		// 	// Schedule.find({ createName: req.userId, status: "Hoàn thành" }).populate('customerID').populate('createName').populate('serviceNoteID'),
		// 	User.findById({ _id: req.userId })
		// ])
		// .then(([newSchedule, user]) => {
		// 	res.render('business/employ/employ-schedule', {
		// 		newSchedule: multipleMongooseToObject(newSchedule),
		// 		// handlingSchedule: multipleMongooseToObject(handlingSchedule),
		// 		// doneSchedule: multipleMongooseToObject(doneSchedule),
		// 		user: mongooseToObject(user),
		// 		title: "Quản lý phiếu dịch vụ"
		// 	});
		// })
		// .catch(next);
		Schedule.find({}).populate({
			path: 'customerID',
			// match: {
			// 	hasSchedule: true
			// }
		}).sort({'schedule': 1})
			.then(schedules => {
				console.log(schedules)
				res.render('business/employ/employ-schedule', {
					title: 'Lịch hẹn tư vấn',
					schedules: multipleMongooseToObject(schedules)
				})
			})
			.catch(next);
	}

	createSchedule(req, res, next) {
		const file = req.files;
		const imgArr = [];
		const videoArr = [];
		const cusID = req.body.customerID;
		const createName = req.body.createName;
		const service = req.body.service;
		const scheduleBody = req.body.schedule;
		const priceBefore = req.body.priceBefore;
		const deposit = req.body.deposit;
		const comment = req.body.comment;
		file.forEach(element => {
			if (element.mimetype === 'image/jpg' || element.mimetype === 'image/jpeg' || element.mimetype === 'image/png') {
				imgArr.push({ name: element.filename, url: element.path });
				return imgArr;
			} else if (element.mimetype === 'video/avi' || element.mimetype === 'video/flv' || element.mimetype === 'video/wmv' || element.mimetype === 'video/mov' || element.mimetype === 'video/mp4' || element.mimetype === 'video/webm') {
				videoArr.push({ name: element.filename, url: element.path });
				return videoArr;
			}
		})
		if (deposit === '') {
			const schedule = new Schedule({
				customerID: cusID,
				createName: createName,
				status: "Tạo mới",
				service: service,
				comments: { comment: comment },
				schedule: scheduleBody,
				priceBefore: priceBefore,
				deposit: 0,
				counselorImg: imgArr,
				counselorVideo: videoArr,
			});
			schedule.save();
			Customer.findByIdAndUpdate({ _id: req.body.customerID }, { $push: { scheduleID: schedule.id }, $set: {hasSchedule: true}})
				.then(() => {
					req.flash('messages_createSchedule_success', 'Tạo lịch hẹn thành công');
					res.redirect('back');
				})
				.catch(next);
		} else if (deposit === 'NaN') {
			const schedule = new Schedule({
				customerID: cusID,
				createName: createName,
				status: "Tạo mới",
				service: service,
				comments: { comment: comment },
				schedule: scheduleBody,
				priceBefore: priceBefore,
				deposit: 0,
				counselorImg: imgArr,
				counselorVideo: videoArr,
			});
			schedule.save();
			Customer.findByIdAndUpdate({ _id: req.body.customerID }, { $push: { scheduleID: schedule.id }, $set: {hasSchedule: true}})
				.then(() => {
					req.flash('messages_createSchedule_success', 'Tạo lịch hẹn thành công');
					res.redirect('back');
				})
				.catch(next);
		} else {
			const schedule = new Schedule({
				customerID: cusID,
				createName: createName,
				status: "Tạo mới",
				service: service,
				comments: { comment: comment },
				schedule: scheduleBody,
				priceBefore: priceBefore,
				deposit: deposit,
				counselorImg: imgArr,
				counselorVideo: videoArr,
			});
			schedule.save();
			Customer.findByIdAndUpdate({ _id: req.body.customerID }, { $push: { scheduleID: schedule.id }, $set: {hasSchedule: true}})
				.then(() => {
					req.flash('messages_createSchedule_success', 'Tạo lịch hẹn thành công');
					res.redirect('back');
				})
				.catch(next);
		}
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

	// Chi tiết phiếu dịch vụ
	showServiceNoteDetail(req, res, next) {
		ServiceNote.findById({ _id: req.params.id }).populate('performer')
		.populate({
			path: 'scheduleID',
			populate: {
				path: 'customerID'
			}
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
