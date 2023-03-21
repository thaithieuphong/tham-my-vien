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
const sharp = require('sharp');
const rootPath = path.sep;
const appRoot = require('app-root-path');

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
		Promise.all([
			Customer.find({ isPostSurgeryCare: true, hasWoundCleaningSchedule: false}).sort({'updatedAt': -1}).populate({
				path: 'serviceNoteID',
				model: 'ServiceNote',
			}),
			User.findById({ _id: req.userId }), TypeService.find({})])
			.then(([customers, user, typeservices]) => {
				res.render("business/employ/employ-customer-discharge-from-hospital", {
					customers: multipleMongooseToObject(customers),
					user: mongooseToObject(user),
					typeservices: multipleMongooseToObject(typeservices),
					title: 'Danh sách khách chăm sóc hậu phẫu'
				});
			})
			.catch(next);
	}

	showCustomerDischargeFromHospitalDetail(req, res, next) {
		Promise.all([
			Customer.findById({ _id: req.params.id }).populate({
				path: 'serviceNoteID',
				model: 'ServiceNote',
				populate: {
					path: 'performer',
					model: 'User'
				}
			}),
			User.findById({ _id: req.userId })
		])
		.then(([customer, user]) => {
			res.render('business/employ/employ-customer-discharge-from-hospital-detail', {
				customer: mongooseToObject(customer),
				user: mongooseToObject(user),
				title: 'Thông tin chi tiết khách chăm sóc hậu phẫu'
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
		User.findById({ _id: req.userId })
			.then(user => {
				res.render('business/employ/employ-customer-create', {
					title: 'Tạo thông tin khách hàng',
					user: mongooseToObject(user)
				});
			})
			.catch(next);
	}


	// create customer
	createCustomer(req, res, next) {
		if (req.file) {
			if(req.body.statusVi === 'Tạo mới') {
				const logs = new Log({
					userID: req.userId,
					status: 'Khách hàng mới',
					contents: req.body
				});
				logs.save();
				const customer = new Customer({
					image: {
						name: req.file.filename,
						url: req.file.path,
					},
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
					logIDs: logs._id
				});
				customer.save();
				req.flash('messages_createCustomer_success', 'Tạo khách hàng thành công');
				res.redirect("/business/employ/customers/new");
			}

			if(req.body.statusVi === 'Tiềm năng') {
				const logs = new Log({
					userID: req.userId,
					status: 'Khách hàng tiềm năng',
					contents: req.body
				});
				logs.save();
				const customer = new Customer({
					image: {
						name: req.file.filename,
						url: req.file.path,
					},
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
					logIDs: logs._id
				});
				customer.save();
				req.flash('messages_createCustomer_success', 'Tạo khách hàng thành công');
				res.redirect("/business/employ/customers/potential");
			}

			if(req.body.statusVi === 'Đặt lịch') {
				const logs = new Log({
					userID: req.userId,
					status: 'Khách hàng tiềm năng',
					contents: req.body
				});
				logs.save();
				const customer = new Customer({
					image: {
						name: req.file.filename,
						url: req.file.path,
					},
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
					logIDs: logs._id
				});
				customer.save();
				req.flash('messages_createCustomer_success', 'Tạo khách hàng thành công');
				res.redirect("/business/employ/customers/schedule");
			}
		} else {
			if(req.body.statusVi === 'Tạo mới') {
				const logs = new Log({
					userID: req.userId,
					status: 'Khách hàng mới',
					contents: req.body
				});
				logs.save();
				const customer = new Customer({
					image: {
						name: "",
						url: "",
					},
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
					logIDs: logs._id
				});
				customer.save();
				req.flash('messages_createCustomer_success', 'Tạo khách hàng thành công');
				res.redirect("/business/employ/customers/new");
			}

			if(req.body.statusVi === 'Tiềm năng') {
				const logs = new Log({
					userID: req.userId,
					status: 'Khách hàng tiềm năng',
					contents: req.body
				});
				logs.save();
				const customer = new Customer({
					image: {
						name: "",
						url: "",
					},
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
					logIDs: logs._id
				});
				customer.save();
				req.flash('messages_createCustomer_success', 'Tạo khách hàng thành công');
				res.redirect("/business/employ/customers/potential");
			}

			if(req.body.statusVi === 'Đặt lịch') {
				const logs = new Log({
					userID: req.userId,
					status: 'Khách hàng đặt lịch',
					contents: req.body
				});
				logs.save();
				const customer = new Customer({
					image: {
						name: "",
						url: "",
					},
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
					logIDs: logs._id
				});
				customer.save();
				req.flash('messages_createCustomer_success', 'Tạo khách hàng thành công');
				res.redirect("/business/employ/customers/schedule");
			}
		}
	}

	// Show edit customer page
	showCustomerEdit(req, res, next) {
		Promise.all([

			Customer.findById({ _id: req.params.id }),
			User.findById({ _id: req.userId })
		])
		.then(([customer, user]) => {
			res.render('business/employ/employ-customer-edit', {
				customer: mongooseToObject(customer),
				title: 'Sửa / cập nhật thông tin khách hàng',
				user: mongooseToObject(user)
			});
		})
		.catch(next);
	}

	// edit customer
	editCustomer(req, res, next) {
		if (req.file) {
			if(req.body.statusVi === 'Tạo mới') {
				const logs = new Log({
					userID: req.userId,
					status: 'Sửa/cập nhật thông tin khách hàng mới',
					contents: req.body
				});
				logs.save();
				Customer.findByIdAndUpdate(
					{ _id: req.params.id },
					{
						image: {
							name: req.file.filename,
							url: req.file.path,
						},
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
							statusVi: req.body.statusVi,
							statusEng: 'New'
						},
						$push: {logIDs: logs._id}
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
				const logs = new Log({
					userID: req.userId,
					status: 'Sửa/cập nhật thông tin khách hàng tiềm năng',
					contents: req.body
				});
				logs.save();
				Customer.findByIdAndUpdate(
					{ _id: req.params.id },
					{
						image: {
							name: req.file.filename,
							url: req.file.path,
						},
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
							statusVi: req.body.statusVi,
							statusEng: 'Potential'
						},
						$push: {logIDs: logs._id}
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
				const logs = new Log({
					userID: req.userId,
					status: 'Sửa/cập nhật thông tin khách hàng đặt lịch',
					contents: req.body
				});
				logs.save();
				Customer.findByIdAndUpdate(
					{ _id: req.params.id },
					{
						image: {
							name: req.file.filename,
							url: req.file.path,
						},
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
							statusVi: req.body.statusVi,
							statusEng: 'Schedule'
						},
						$push: {logIDs: logs._id}
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
				const logs = new Log({
					userID: req.userId,
					status: 'Sửa/cập nhật thông tin khách hàng không thành công',
					contents: req.body
				});
				logs.save();
				Customer.findByIdAndUpdate(
					{ _id: req.params.id },
					{
						image: {
							name: req.file.filename,
							url: req.file.path,
						},
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
							statusVi: req.body.statusVi,
							statusEng: 'Fail'
						},
						$push: {logIDs: logs._id}
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
				const logs = new Log({
					userID: req.userId,
					status: 'Sửa/cập nhật thông tin khách hàng mới',
					contents: req.body
				});
				logs.save();
				Customer.findByIdAndUpdate({ _id: req.params.id },{
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
						statusVi: req.body.statusVi,
						statusEng: 'New'
					},
					$push: {logIDs: logs._id}
				})
				.then((customer) => {
					req.flash('messages_editCustomer_success', 'Chỉnh sửa thông tin khách hàng thành công');
					res.redirect("/business/employ/customers/new");
				})
				.catch(next);
			}

			if(req.body.statusVi === 'Tiềm năng') {
				const logs = new Log({
					userID: req.userId,
					status: 'Sửa/cập nhật thông tin khách hàng tiềm năng',
					contents: req.body
				});
				logs.save();
				Customer.findByIdAndUpdate({ _id: req.params.id },{
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
						statusVi: req.body.statusVi,
						statusEng: 'Potential'
					},
					$push: {logIDs: logs._id}
				})
				.then((customer) => {
					req.flash('messages_editCustomer_success', 'Chỉnh sửa thông tin khách hàng thành công');
					res.redirect("/business/employ/customers/potential");
				})
				.catch(next);
			}

			if(req.body.statusVi === 'Đặt lịch') {
				const logs = new Log({
					userID: req.userId,
					status: 'Sửa/cập nhật thông tin khách hàng đặt lịch',
					contents: req.body
				});
				logs.save();
				Customer.findByIdAndUpdate({ _id: req.params.id },{
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
						statusVi: req.body.statusVi,
						statusEng: 'Schedule'
					},
					$push: {logIDs: logs._id}
				})
				.then((customer) => {
					req.flash('messages_editCustomer_success', 'Chỉnh sửa thông tin khách hàng thành công');
					res.redirect("/business/employ/customers/schedule");
				})
				.catch(next);
			}

			if(req.body.statusVi === 'Không thành công') {
				const logs = new Log({
					userID: req.userId,
					status: 'Sửa/cập nhật thông tin khách hàng không thành công',
					contents: req.body
				});
				logs.save();
				Customer.findByIdAndUpdate({ _id: req.params.id },{
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
						statusVi: req.body.statusVi,
						statusEng: 'Fail'
					},
					$push: {logIDs: logs._id}
				})
				.then((customer) => {
					req.flash('messages_editCustomer_success', 'Chỉnh sửa thông tin khách hàng thành công');
					res.redirect("/business/employ/customers/notok");
				})
				.catch(next);
			}
		}
	}

	// Hiển thị trang chi tiết khách hàng
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
		const logs = new Log({
			userID: req.userId,
			status: 'Cập nhật thông tin tư vấn khách online',
			contents: req.body
		});
		logs.save();
		Customer.findByIdAndUpdate(
			{ _id: req.params.id },
			{$push: { comments: { comment: req.body.comments } }, userID: req.userId, logIDs: logs._id }
		)
			.then(() => res.redirect("back"))
			.catch(next);
	}

	moveToPotential(req, res, next) {
		const logs = new Log({
			userID: req.userId,
			status: 'Chuyển trạng thái khách hàng sang tiềm năng',
			contents: req.body
		});
		logs.save();
		let updateCus = {
			$set: { statusCus: { statusVi: 'Tiềm năng', statusEng: 'Potential'}, storage: null },
			$push: { logIDs: logs._id }

		}
		Customer.findByIdAndUpdate({ _id: req.params.id }, updateCus)
			.then(() => {
				req.flash('messages_moveCustomer_success', 'Chuyển trạng thái khách hàng thành công');
				res.redirect('/business/employ/customers/potential');
			})
			.catch(next);
	}

	moveToSchedule(req, res, next) {
		const logs = new Log({
			userID: req.userId,
			status: 'Chuyển trạng thái khách hàng sang đặt lịch',
			contents: req.body
		});
		logs.save();
		let updateCus = {
			$set: { statusCus: { statusVi: 'Đặt lịch', statusEng: 'Schedule'}, storage: null },
			$push: { logIDs: logs._id }

		}
		Customer.findByIdAndUpdate({ _id: req.params.id }, updateCus)
			.then(() => {
				req.flash('messages_moveCustomer_success', 'Chuyển trạng thái khách hàng thành công');
				res.redirect('/business/employ/customers/schedule');
			})
			.catch(next);
	}

	moveToNotOK(req, res, next) {
		const logs = new Log({
			userID: req.userId,
			status: 'Chuyển trạng thái khách hàng sang tư vấn không thành công',
			contents: req.body
		});
		logs.save();
		let updateCus = {
			$set: { statusCus: { statusVi: 'Không thành công', statusEng: 'Fail'}, storage: null },
			$push: { logIDs: logs._id }
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
		Promise.all([
			Schedule.find({ hasServiceNote: false }).populate('cusID'),
			User.findById({ _id: req.userId })
		])
		.then(([schedules, user]) => {
			let scheduleArr = schedules.filter(schedule => !schedule.cusID.hasServiceNote && schedule.cusID.hasSchedule ? schedule : null);
			res.render('business/employ/employ-schedule', {
				title: 'Lịch hẹn tư vấn',
				schedules: multipleMongooseToObject(scheduleArr),
				user: mongooseToObject(user),
			})
		})
		.catch(next);
	}

	// Hiển thị trang thùng rác lịch hẹn tư vấn
	showScheduleTrash(req, res, next) {
		Promise.all([
			Schedule.findDeleted({}).populate('cusID'),
			User.findById({ _id: req.userId })
		])
		.then(([schedules, user]) => {
			res.render('business/employ/employ-schedule-trash', {
				title: 'Lịch hẹn tư vấn đã hủy',
				schedules: multipleMongooseToObject(schedules),
				user: mongooseToObject(user),
			})
		})
		.catch(next);
	}

	// Hiển thị trang đặt lịch tư vấn
	showCreateSchedule(req, res, next) {
		Promise.all([
			Customer.findById({ _id: req.params.id }),
			TypeService.find({}),
			User.findById({ _id: req.userId }),
		])
		.then(([customer, typeservices, user]) => {
			res.render('business/employ/employ-schedule-create', {
				title: 'Đặt lịch hẹn tư vấn',
				customer: mongooseToObject(customer),
				typeservices: multipleMongooseToObject(typeservices),
				user: mongooseToObject(user)
			})
		})
		.catch(next);
	}

	// Tạo lịch hẹn tư vấn
	createSchedule(req, res, next) {
		const data = {
			cusID: req.params.id,
			userID: req.userId,
			status: "Tạo mới",
			service: req.body.service,
			schedule: req.body.schedule,
			priceBefore: req.body.priceBefore,
			deposit: req.body.deposit,
			comment: req.body.comment,
			hasServiceNote: false
		}
		const schedule = new Schedule(data);
		schedule.save();
		const logs = new Log({
			userID: req.userId,
			scheduleID: schedule._id,
			status: 'Tạo lịch hẹn tư vấn',
			contents: data
		});
		logs.save();
		Customer.findByIdAndUpdate({ _id: req.params.id }, {
			$push: {
				scheduleID: schedule.id,
				logIDs: logs._id
			},
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
				path: 'cusID'
			}),
			TypeService.find({}),
			User.findById({ _id: req.userId })
		])
		.then(([schedule, typeservices, user]) => {
			res.render('business/employ/employ-schedule-edit', {
				title: 'Sửa/Cập nhật thông tin lịch hẹn tư vấn',
				schedule: mongooseToObject(schedule),
				typeservices: multipleMongooseToObject(typeservices),
				user: mongooseToObject(user)
			})
		})
		.catch(next);
	}

	// Sửa lịch hẹn tư vấn
	editSchedule(req, res, next) {
		const logs = new Log({
			userID: req.userId,
			scheduleID: req.params.id,
			status: 'Sửa lịch hẹn tư vấn',
			contents: req.body
		});
		logs.save();
		let updateStatus = {
			$set: {schedule: req.body.schedule, reason: req.body.reason, deposit: req.body.deposit, priceBefore: req.body.priceBefore},
			$push: { service: req.body.service}
		}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, {$push: { logIDs: logs._id }}),
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
		const logs = new Log({
			userID: req.userId,
			scheduleID: req.params.id,
			status: 'Xóa dịch vụ trên lịch hẹn tư vấn',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: {logIDs: logs._id }}),
			Schedule.findByIdAndUpdate({ _id: req.params.id }, { $pull: { service: req.body.service }})
		])
			.then(() => {
				req.flash('messages_deleteService_success', 'Xóa dịch vụ thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Xóa lịch hẹn tư vấn
	deleteSchedule(req, res, next) {
		const logs = new Log({
			userID: req.userId,
			scheduleID: req.params.id,
			status: 'Xóa lịch hẹn tư vấn',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate( { _id: req.body.cusID }, { hasSchedule: false, $push: { logIDs: logs._id } }),
			Schedule.delete({ _id: req.params.id })
		])
		.then(() => {
			req.flash('messages_deleteSchedule_success', 'Xóa lịch hẹn tư vấn thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Khôi phục lịch hẹn tư vấn
	restoreSchedule(req, res, next) {
		const logs = new Log({
			userID: req.userId,
			scheduleID: req.params.id,
			status: 'Khôi phục lịch hẹn tư vấn',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate( { _id: req.body.cusID }, { hasSchedule: true, $push: { logIDs: logs._id } } ),
			Schedule.restore({ _id: req.params.id} )
		])
			.then(() => {
				req.flash('messages_restoreSchedule_success', 'Khôi phục lịch hẹn tư vấn thành công');
				res.redirect('/business/employ/schedules');
			})
			.catch(next);
	}

	// Hiển thị trang tạo phiếu dịch vụ
	serviceNoteCreate(req, res, next) {
		const serviceNote = new ServiceNote({
			scheduleID: req.params.id,
			isPostSurgeryCare: false
		});
		serviceNote.save();
		const serviceNoteID = serviceNote._id;
		const logs = new Log({
			userID: req.userId,
			scheduleID: req.params.id,
			serviceNoteID: serviceNoteID,
			status: 'Tạo phiếu dịch vụ',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, {
				$set: { serviceNoteID: serviceNoteID, hasServiceNote: true },
				$push: { logIDs: logs._id }
			}),
			Schedule.findByIdAndUpdate({ _id: req.params.id }, {
				$set: { serviceNoteID: serviceNoteID, status: 'Đang xử lý', userID: req.userId },
			})
		])
		.then(() => {
			res.redirect(`/business/employ/service-note`);
		})
		.catch(next);
	}

	showServiceNoteList(req, res, next) {
		Promise.all([
			ServiceNote.find({ isPostSurgeryCare: false })
				.populate({
					path: 'scheduleID',
					populate: {
						path: 'cusID',
						model: 'Customer',
						
					}
				}),
			User.findById({ _id: req.userId }),
		])
		.then(([serviceNotes, user]) => {
			res.render('business/employ/employ-service-note-list', {
				title: 'Danh sách phiếu dịch vụ',
				serviceNotes: multipleMongooseToObject(serviceNotes),
				user: mongooseToObject(user)
			})
		})
		.catch(next);
	}

	// Hiển thị trang cập nhật phiếu dịch vụ
	showServiceNoteUpdate(req, res, next) {
		Promise.all([
			ServiceNote.findById({ _id: req.params.id }).populate({
				path: 'scheduleID',
				populate: {
					path: 'cusID',
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
		const logs = new Log({
			customerID: req.body.cusID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Cập nhật thông tin khách hàng trên phiếu dịch vụ',
			contents: req.body
		});
		logs.save();
		const updateContentCustomer = {
			identification: req.body.identification,
			fullName: req.body.fullName,
			nickName: req.body.nickName,
			birth: req.body.birth,
			gender: req.body.gender,
			phone: req.body.phone,
			homeTown: req.body.homeTown,
			height: req.body.height,
			weight: req.body.weight,
			$push: { logIDs: logs._id },
			$set: { statusCus: { statusVi: 'Cập nhật thông tin cá nhân khách hàng', statusEng: 'updateService'} },
		}
		const updateContentServiceNote = {
			surgeryDay: req.body.surgeryDay,
			floor: req.body.floor,
			performer: req.body.performer,
			$set: { isCustomerInfo: true }
		}
		Promise.all([
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, updateContentServiceNote),
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateContentCustomer)])
			.then(() => {
				req.flash('messages_updateCusInfo_success', 'Cập nhật thông tin cá nhân khách hàng thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Cập nhật thông tin dịch vụ trên phiếu dịch vụ
	updateServiceInfor(req, res, next) {
		if (req.body.totalServiceCharge === '0' && req.body.deposit === '0' && req.body.discount === '0' && req.body.amountToBePaid === '0' && req.body.total === '0') {
			req.flash('messages_updateService_warning', 'Chưa cập nhật dịch vụ');
			res.redirect('back');
		}
		let serviceArr = [];
		let serviceNameArr = req.body.service;
		let servicePriceArr = req.body.price;
		if (!serviceNameArr) {
			
			req.flash('messages_updateService_warning', 'Chưa cập nhật dịch vụ');
			res.redirect('back');
		}
		serviceNameArr.forEach((serviceName, index) => {
			let servicePrice = servicePriceArr[index]
			serviceArr.push({
				name: serviceName,
				price: servicePrice
			})
		});
		const logs = new Log({
			customerID: req.body.cusID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Cập nhật thông tin dịch vụ trên phiếu dịch vụ',
			contents: req.body
		});
		logs.save();
		let updateCus = {
			$set: { statusCus: { statusVi: 'Cập nhật dịch vụ', statusEng: 'updateService'} },
			$push: { logIDs: logs._id }
		}
		Promise.all([
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, {
				deposit: req.body.deposit,
				discount: req.body.discount,
				// totalServiceCharge: req.body.totalServiceCharge,
				// amountToBePaid: req.body.amountToBePaid,
				// total: req.body.total,
				$set: { status: 'Đã cập nhật dịch vụ trên phiếu dịch vụ', isServiceInfo: true},
				$push: { service: serviceArr}
			}),
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateCus)
		])
		.then(([serviceNote, customer]) => {
			req.flash('messages_updateService_success', 'Cập nhật dịch vụ thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Xóa dịch vụ trên phiếu dịch vụ
	deleteService(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Xóa dịch vụ trên phiếu dịch vụ',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id }}),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id} , { $pull: {service: { _id: req.body.serviceID}} })
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
					path: 'cusID',
					model: 'Customer'
				}
			}),
			User.findById({ _id: req.userId }),
		])
		.then(([serviceNotes, user]) => {
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
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Xóa phiếu dịch vụ',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate( { _id: req.body.cusID }, { 
				hasSchedule: false,
				hasServiceNote: false,
				statusCus: { statusVi: 'Tư vấn không thành công', statusEng: 'Fail'},
				$push: { logIDs: logs._id }
			}),
			Schedule.findByIdAndUpdate({ _id: req.body.scheduleID }, { $set: {status: 'Chờ xử lý', hasServiceNote: false } }),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { status: 'Đã xóa phiếu dịch vụ'}),
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
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Khôi phục phiếu dịch vụ',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate( { _id: req.body.cusID }, {
				hasSchedule: true,
				hasServiceNote: true,
				statusCus: { statusVi: 'Đã khôi phục và đang cập nhật thông tin phiếu dịch vụ', statusEng: 'restoredAndUpdatingServiceNoteInfomation'},
				$push: { logIDs: logs._id } } ),
			Schedule.findByIdAndUpdate( { _id: req.body.scheduleID }, { $set: { status: 'Đang xử lý', hasServiceNote: true } } ),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { status: 'Khôi phục'}),
			ServiceNote.restore({ _id: req.params.id} )
		])
			.then(() => {
				req.flash('messages_restoreServiceNote_success', 'Khôi phục phiếu dịch vụ thành công');
				res.redirect('/business/employ/service-note');
			})
			.catch(next);
	}

	// Tải lên hình ảnh khi tư vấn
	async uploadCounselorImg(req, res, next) {
		const files = req.files;
		const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = `createdAt-${getDate}${(getMonth + 1)}${getYear}`;
		const imgArr = [];
		for (const file of files) {
			if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/avif' || file.mimetype === 'image/webp') {
				const logs = new Log({
					customerID: req.body.cusID,
					serviceNoteID: req.params.id,
					userID: req.userId,
					status: 'Cập nhật hình ảnh tư vấn phiếu dịch vụ',
					contents: req.body
				});
				logs.save();
				let updateStatus = {
					$set: { statusCus: { statusVi: 'Đã cập nhật hình ảnh tư vấn phiếu dịch vụ', statusEng: 'uploadedCounselorImg'} },
					$push: { logIDs: logs._id }
				}
				const image = sharp(file.path).resize().webp();
				const imageFormatName = `${file.fieldname}_img_${req.body.cusID}_${dateNow}_${Date.now()}.${image.options.formatOut}`;

				// Đường dẫn cho môi trường phát triển
				// const storagePathDev = `${appRoot}/src/public/counselor/img/${imageFormatName}`;

				// Đường dẫn cho môi trường sản xuất
				const storagePathProduct = `${rootPath}mnt/vdb/crm.drtuananh.vn/counselor/img/${imageFormatName}`;

				// Chuyển hình ảnh đến thư mục trong môi trường phát triển
				// const imageToFolder = image.toFile(storagePathDev, (err, data, info) => data);

				// Chuyển hình ảnh dến thư mục trong môi trường sản xuất
				const imageToFolder = image.toFile(storagePathProduct, (err, data, info) => data);

				const imageURL = imageToFolder.options.fileOut;
				const imageName = await imageURL.split('/').pop();

				imgArr.push({ name: imageName, url: imageURL, notDeletedYet: true });
				await Promise.all([
					Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateStatus),
					ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { counselorImg: imgArr }})
				])
				.then(([customer, reExam]) => {

					// Xóa tệp ảnh tạm thời
					fs.unlinkSync(file.path);
					res.status(200).json({ message: 'Hoàn thành tải lên' });
				})
				.catch(next => {
					console.log(`Đã xảy ra lỗi này: ${next}`);
					res.status(500).json(`Đã xảy ra một lỗi: ${next}`);
					
				});
			}
		}
	}

	// Tải lên video tư vấn
	async uploadCounselorVideo(req, res, next) {
		const files = req.files;
		const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = `createdAt-${getDate}${(getMonth + 1)}${getYear}`;
		const videoArr = [];
		for (const file of files) {
			if (file.mimetype === 'video/avi' || file.mimetype === 'video/flv' || file.mimetype === 'video/wmv'|| file.mimetype === 'video/quicktime' || file.mimetype === 'video/mov' || file.mimetype === 'video/MOV' || file.mimetype === 'video/mp4' || file.mimetype === 'video/webm') {
				const logs = new Log({
					customerID: req.body.cusID,
					serviceNoteID: req.params.id,
					userID: req.userId,
					status: 'Cập nhật video tư vấn phiếu dịch vụ',
					contents: req.body
				});
				logs.save();
				let updateStatus = {
					$set: { statusCus: { statusVi: 'Đã cập nhật video tư vấn phiếu dịch vụ', statusEng: 'uploadedCounselorVideo'} },
					$push: { logIDs: logs._id }
				}
				const videoFormatName = `${file.fieldname}_video_${req.body.cusID}_${dateNow}_${Date.now()}${path.extname(file.originalname)}`;
				
				// Đường dẫn cho môi trường phát triển
				// const storagePathDev = `${appRoot}/src/public/counselor/video/${videoFormatName}`;

				// Đường dẫn cho môi trường sản xuất
				const storagePathProduct = `${rootPath}mnt/vdb/crm.drtuananh.vn/counselor/video/${videoFormatName}`;
				
				// Chuyển video đến thư mục trong môi trường phát triển
				// fs.copyFileSync(file.path, storagePathDev);

				// Chuyển video đến thư mục trong môi trường sản xuất
				fs.copyFileSync(file.path, storagePathProduct);

				// Biến đường dẫn trong môi trường phát triển
				// const videoURL = storagePathDev;

				// Biến đường dẫn trong môi trường sản xuất
				const videoURL = storagePathProduct;

				const videoName = await videoURL.split('/').pop();
				videoArr.push({ name: videoName, url: videoURL, notDeletedYet: true });
				await Promise.all([
					Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateStatus),
					ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { counselorVideo: videoArr }})
				])
				.then(([customer, reExam]) => {
					// Xóa tệp ảnh tạm thời
					fs.unlinkSync(file.path);
					res.status(200).json({ message: 'Hoàn thành tải lên' });
				})
				.catch(next => {
					console.log(`Đã xảy ra lỗi này: ${next}`);
					res.status(500).json(`Đã xảy ra một lỗi: ${next}`);
					
				});
			}
		}
	}

	// Cập nhật thông tin khi tư vấn
	updateCounselor(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Cập nhật thông tin tư vấn',
			contents: req.body
		});
		logs.save();
		let updateStatus = {
			$set: { statusCus: { statusVi: 'Đã cập nhật thông tin tư vấn', statusEng: 'uploadedCounselor'} },
			$push: { logIDs: logs._id }
		}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateStatus),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { 
				$set: {counselorInfo: req.body.counselorInfo, isCounselorInfo: true}
			})
		])
		.then(() => {
			req.flash('messages_uploadCounselor_success', 'Cập nhật thông tin tư vấn thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Xóa ảnh khi tư vấn
	deleteCounselorImg(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Xóa hình ảnh tư vấn',
			contents: req.body
		});
		logs.save();
		let imgName = req.body.imgName;
		const arrayFilters = [];
		arrayFilters.push({ name:  imgName });
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = {
			$set: { "counselorImg.$.notDeletedYet": false },
		}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id }}),
			ServiceNote.findById({ _id: req.params.id }).updateMany({ ['counselorImg.name']: req.body.imgName }, updateDocument, options)
		])
		.then(() => {
			req.flash('messages_deletedCounselorImg_success', 'Xóa hình ảnh tư vấn thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Khôi phục ảnh khi tư vấn
	restoreCounselorImg(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Khôi phục hình ảnh tư vấn',
			contents: req.body
		});
		logs.save();
		let imgName = req.body.imgName;
		const arrayFilters = [];
		arrayFilters.push({ name:  imgName });
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = { $set: { "counselorImg.$.notDeletedYet": true } }
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id }}),
			ServiceNote.findById({ _id: req.params.id }).updateMany({ ['counselorImg.name']: req.body.imgName }, updateDocument, options)
		])
		.then(() => {
			req.flash('messages_restoreCounselorImg_success', 'Khôi phục hình ảnh tư vấn thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Xóa video khi tư vấn
	deleteCounselorVideo(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Xóa video tư vấn',
			contents: req.body
		});
		logs.save();
		let videoName = req.body.videoName;
		const arrayFilters = [];
		arrayFilters.push({ name:  videoName });
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = { $set: { "counselorVideo.$.notDeletedYet": false }}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id }}),
			ServiceNote.findById({ _id: req.params.id }).updateMany({ ['counselorVideo.name']: req.body.videoName }, updateDocument, options)
		])
		.then(() => {
			req.flash('messages_deletedCounselorVideo_success', 'Xóa video tư vấn thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Khôi phục video khi tư vấn
	restoreCounselorVideo(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Khôi phục video tư vấn',
			contents: req.body
		});
		logs.save();
		let videoName = req.body.videoName;
		const arrayFilters = [];
		arrayFilters.push({ name:  videoName });
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = {$set: { "counselorVideo.$.notDeletedYet": true }}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id }}),
			ServiceNote.findById({ _id: req.params.id }).updateMany({ ['counselorVideo.name']: req.body.videoName }, updateDocument, options)
		])
		.then(() => {
			req.flash('messages_restoreCounselorImg_success', 'Khôi phục video tư vấn thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Tải lên hình ảnh trước phẫu thuật
	async uploadBeforeImg(req, res, next) {
		const files = req.files;
		const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = `createdAt-${getDate}${(getMonth + 1)}${getYear}`;
		// const resizeOpts = { width: 512, height: 1024 };
		const imgArr = [];

		for (const file of files) {
			if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/avif' || file.mimetype === 'image/webp') {
				const logs = new Log({
					customerID: req.body.cusID,
					serviceNoteID: req.params.id,
					userID: req.userId,
					status: 'Cập nhật hình ảnh trước phẫu thuật phiếu dịch vụ',
					contents: req.body
				});
				logs.save();
				let updateStatus = {
					$set: { statusCus: { statusVi: 'Đã cập nhật hình ảnh trước phẫu thuật phiếu dịch vụ', statusEng: 'uploadedBeforeImg'} },
					$push: { logIDs: logs._id }
				}
				const image = sharp(file.path).resize().webp();
				const imageFormatName = `${file.fieldname}_img_${req.body.cusID}_${dateNow}_${Date.now()}.${image.options.formatOut}`;

				// Đường dẫn cho môi trường phát triển
				// const storagePathDev = `${appRoot}/src/public/before/img/${imageFormatName}`;

				// Đường dẫn cho môi trường sản xuất
				const storagePathProduct = `${rootPath}mnt/vdb/crm.drtuananh.vn/before/img/${imageFormatName}`;

				// Chuyển hình ảnh đến thư mục trong môi trường phát triển
				// const imageToFolder = image.toFile(storagePathDev, (err, data, info) => data);

				// Chuyển hình ảnh đến thư mục trong môi trường sản xuất
				const imageToFolder = image.toFile(storagePathProduct, (err, data, info) => data);

				const imageURL = imageToFolder.options.fileOut;
				const imageName = await imageURL.split('/').pop();
				
				imgArr.push({ name: imageName, url: imageURL, notDeletedYet: true });
				await Promise.all([
					Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateStatus),
					ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { beforeImg: imgArr }})
				])
				.then(([customer, reExam]) => {

					// Xóa tệp ảnh tạm thời
					fs.unlinkSync(file.path);
					res.status(200).json({ message: 'Hoàn thành tải lên' });
				})
				.catch(next => {
					console.log(`Đã xảy ra lỗi này: ${next}`);
					res.status(500).json(`Đã xảy ra một lỗi: ${next}`);
					
				});
			}
		}
	}

	// Tải lên video trước phẫu thuật
	async uploadBeforeVideo(req, res, next) {
		const files = req.files;
		const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = `createdAt-${getDate}${(getMonth + 1)}${getYear}`;
		const videoArr = [];
		for (const file of files) {
			if (file.mimetype === 'video/avi' || file.mimetype === 'video/flv' || file.mimetype === 'video/wmv'|| file.mimetype === 'video/quicktime' || file.mimetype === 'video/mov' || file.mimetype === 'video/MOV' || file.mimetype === 'video/mp4' || file.mimetype === 'video/webm') {
				const logs = new Log({
					customerID: req.body.cusID,
					serviceNoteID: req.params.id,
					userID: req.userId,
					status: 'Cập nhật video trước phẫu thuật phiếu dịch vụ',
					contents: req.body
				});
				logs.save();
				let updateStatus = {
					$set: { statusCus: { statusVi: 'Đã cập nhật video trước phẫu thuật phiếu dịch vụ', statusEng: 'uploadedBeforeVideo'} },
					$push: { logIDs: logs._id }
				}
				const videoFormatName = `${file.fieldname}_video_${req.body.cusID}_${dateNow}_${Date.now()}${path.extname(file.originalname)}`;
				
				// Đường dẫn cho môi trường phát triển
				// const storagePathDev = `${appRoot}/src/public/before/video/${videoFormatName}`;

				// Đường dẫn cho môi trường sản xuất
				const storagePathProduct = `${rootPath}mnt/vdb/crm.drtuananh.vn/before/video/${videoFormatName}`;
				
				// Chuyển video đến thư mục trong môi trường phát triển
				// fs.copyFileSync(file.path, storagePathDev);

				// Chuyển video đến thư mục trong môi trường sản xuất
				fs.copyFileSync(file.path, storagePathProduct);


				// Biến đường dẫn cho môi trường phát triển
				// const videoURL = storagePathDev;

				// Biến đường dẫn cho môi trường sản xuât
				const videoURL = storagePathProduct;

				const videoName = await videoURL.split('/').pop();
				videoArr.push({ name: videoName, url: videoURL, notDeletedYet: true });
				await Promise.all([
					Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateStatus),
					ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { beforeVideo: videoArr }})
				])
				.then(([customer, reExam]) => {
					// Xóa tệp ảnh tạm thời
					fs.unlinkSync(file.path);
					res.status(200).json({ message: 'Hoàn thành tải lên' });
				})
				.catch(next => {
					console.log(`Đã xảy ra lỗi này: ${next}`);
					res.status(500).json(`Đã xảy ra một lỗi: ${next}`);
					
				});
			}
		}
	}

	// Cập nhật thông tin trước phẩu thuật
	updateBefore(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Cập nhật thông tin trước phẫu thuật',
			contents: req.body
		});
		logs.save();
		let updateStatus = {
			$set: { statusCus: { statusVi: 'Đã cập nhật thông tin trước phẫu thuật', statusEng: 'updatedBefore'} },
			$push: { logIDs: logs._id }
		}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateStatus),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, {
				$set: { beforeInfo: req.body.beforeInfo, isBeforeInfo: true}
			})
		])
		.then(() => {
			req.flash('messages_uploadBefore_success', 'Cập nhật thông tin trước phẫu thuật thành công');
			res.redirect('back')
		})
		.catch(next);
	}

	// Xóa ảnh trước phẫu thuật
	deleteBeforeImg(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Xóa hình ảnh trước phẫu thuật',
			contents: req.body
		});
		logs.save();
		let imgName = req.body.imgName;
		const arrayFilters = [];
		arrayFilters.push({ name:  imgName });
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = { $set: { "beforeImg.$.notDeletedYet": false } }
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id }}),
			ServiceNote.findById({ _id: req.params.id }).updateMany({ ['beforeImg.name']: req.body.imgName }, updateDocument, options)
		])
		.then(() => {
			req.flash('messages_deletedBeforeImg_success', 'Xóa hình ảnh trước phẫu thuật thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Khôi phục ảnh trước phẫu thuật
	restoreBeforeImg(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Khôi phục hình ảnh trước phẫu thuật',
			contents: req.body
		});
		logs.save();
		let imgName = req.body.imgName;
		const arrayFilters = [];
		arrayFilters.push({ name:  imgName });
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = { $set: { "beforeImg.$.notDeletedYet": true } }
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id }}),
			ServiceNote.findById({ _id: req.params.id }).updateMany({ ['beforeImg.name']: req.body.imgName }, updateDocument, options)
		])
		.then(() => {
			req.flash('messages_restoreBeforeImg_success', 'Khôi phục hình ảnh trước phẫu thuật thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Xóa video trước phẫu thuật
	deleteBeforeVideo(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Xóa video trước phẫu thuật',
			contents: req.body
		});
		logs.save();
		let videoName = req.body.videoName;
		const arrayFilters = [];
		arrayFilters.push({ name:  videoName });
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = { $set: { "beforeVideo.$.notDeletedYet": false } }
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id }}),
			ServiceNote.findById({ _id: req.params.id }).updateMany({ ['beforeVideo.name']: req.body.videoName }, updateDocument, options)
		])
		.then(() => {
			req.flash('messages_deletedBeforeVideo_success', 'Xóa video trước phẫu thuật thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Khôi phục video trước phẫu thuật
	restoreBeforeVideo(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Khôi phục video trước phẫu thuật',
			contents: req.body
		});
		logs.save();
		let videoName = req.body.videoName;
		const arrayFilters = [];
		arrayFilters.push({ name:  videoName });
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = { $set: { "beforeVideo.$.notDeletedYet": true } }
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id}}),
			ServiceNote.findById({ _id: req.params.id }).updateMany({ ['beforeVideo.name']: req.body.videoName }, updateDocument, options)
		])
		.then(() => {
			req.flash('messages_restoreBeforeVideo_success', 'Khôi phục video trước phẫu thuật thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Tải lên hình ảnh phẫu thuật
	async uploadInSurgeryImg(req, res, next) {
		const files = req.files;
		const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = `createdAt-${getDate}${(getMonth + 1)}${getYear}`;
		// const resizeOpts = { width: 512, height: 1024 };
		const imgArr = [];

		for (const file of files) {
			if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/avif' || file.mimetype === 'image/webp') {
				const logs = new Log({
					customerID: req.body.cusID,
					serviceNoteID: req.params.id,
					userID: req.userId,
					status: 'Cập nhật hình ảnh phẫu thuật phiếu dịch vụ',
					contents: req.body
				});
				logs.save();
				let updateStatus = {
					$set: { statusCus: { statusVi: 'Đã cập nhật hình ảnh phẫu thuật phiếu dịch vụ', statusEng: 'uploadedInSurgeryImg'} },
					$push: { logIDs: logs._id }
				}
				const image = sharp(file.path).resize().webp();
				const imageFormatName = `${file.fieldname}_img_${req.body.cusID}_${dateNow}_${Date.now()}.${image.options.formatOut}`;

				// Đường dẫn cho môi trường phát triển
				// const storagePathDev = `${appRoot}/src/public/in-surgery/img/${imageFormatName}`;

				// Đường dẫn cho môi trường sản xuất
				const storagePathProduct = `${rootPath}mnt/vdb/crm.drtuananh.vn/in-surgery/img/${imageFormatName}`;

				// Chuyển hình ảnh đến thư mục trong môi trường phát triển
				// const imageToFolder = image.toFile(storagePathDev, (err, data, info) => data);
				
				// Chuyển hình ảnh đến thư mục trong môi trường sản xuất
				const imageToFolder = image.toFile(storagePathProduct, (err, data, info) => data);

				const imageURL = imageToFolder.options.fileOut;
				const imageName = await imageURL.split('/').pop();

				imgArr.push({ name: imageName, url: imageURL, notDeletedYet: true });
				await Promise.all([
					Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateStatus),
					ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { inSurgeryImg: imgArr }})
				])
				.then(([customer, reExam]) => {

					// Xóa tệp ảnh tạm thời
					fs.unlinkSync(file.path);
					res.status(200).json({ message: 'Hoàn thành tải lên' });
				})
				.catch(next => {
					console.log(`Đã xảy ra lỗi này: ${next}`);
					res.status(500).json(`Đã xảy ra một lỗi: ${next}`);
					
				});
			}
		}
	}

	// Tải lên video phẫu thuật
	async uploadInSurgeryVideo(req, res, next) {
		const files = req.files;
		const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = `createdAt-${getDate}${(getMonth + 1)}${getYear}`;
		const videoArr = [];
		for (const file of files) {
			if (file.mimetype === 'video/avi' || file.mimetype === 'video/flv' || file.mimetype === 'video/wmv'|| file.mimetype === 'video/quicktime' || file.mimetype === 'video/mov' || file.mimetype === 'video/MOV' || file.mimetype === 'video/mp4' || file.mimetype === 'video/webm') {
				const logs = new Log({
					customerID: req.body.cusID,
					serviceNoteID: req.params.id,
					userID: req.userId,
					status: 'Cập nhật video phẫu thuật phiếu dịch vụ',
					contents: req.body
				});
				logs.save();
				let updateStatus = {
					$set: { statusCus: { statusVi: 'Đã cập nhật video phẫu thuật phiếu dịch vụ', statusEng: 'uploadedInSurgeryVideo'} },
					$push: { logIDs: logs._id }
				}
				const videoFormatName = `${file.fieldname}_video_${req.body.cusID}_${dateNow}_${Date.now()}${path.extname(file.originalname)}`;
				
				// Đường dẫn cho môi trường phát triển
				const storagePathDev = `${appRoot}/src/public/in-surgery/video/${videoFormatName}`;

				// Đường dẫn cho môi trường sản xuất
				const storagePathProduct = `${rootPath}mnt/vdb/crm.drtuananh.vn/in-surgery/video/${videoFormatName}`;
				
				// Chuyển video đến thư mục trong môi trường phát triển
				// fs.copyFileSync(file.path, storagePathDev);

				// Chuyển video đến thư mục trong môi trường sản xuất
				fs.copyFileSync(file.path, storagePathProduct);

				// Biến đường dẫn video trong môi trường phát triển
				// const videoURL = storagePathDev;

				// Biến đường dẫn video trong môi trường sản xuất
				const videoURL = storagePathProduct;

				const videoName = await videoURL.split('/').pop();
				videoArr.push({ name: videoName, url: videoURL, notDeletedYet: true });
				await Promise.all([
					Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateStatus),
					ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { inSurgeryVideo: videoArr }})
				])
				.then(([customer, reExam]) => {
					// Xóa tệp ảnh tạm thời
					fs.unlinkSync(file.path);
					res.status(200).json({ message: 'Hoàn thành tải lên' });
				})
				.catch(next => {
					console.log(`Đã xảy ra lỗi này: ${next}`);
					res.status(500).json(`Đã xảy ra một lỗi: ${next}`);
					
				});
			}
		}
	}

	// Cập nhật thông tin trong phẩu thuật
	updateInSurgery(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Cập nhật thông tin phẫu thuật',
			contents: req.body
		});
		logs.save();
		let updateStatus = {
			$set: { statusCus: { statusVi: 'Đã cập nhật hình ảnh và video phẫu thuật', statusEng: 'uploadedInsurgery'} },
			$push: { logIDs: logs._id }
		}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateStatus),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, {
				$set: { stepsToTake: req.body.stepsToTake, isInSurgeryInfo: true }
			})
		])
		.then(() => {
			req.flash('messages_uploadInsurgery_success', 'Cập nhật thông tin phẫu thuật thành công');
			res.redirect('back')
		})
		.catch(next);
	}

	// Xóa ảnh khi phẫu thuật
	deleteInSurgeryImg(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Xóa hình ảnh phẫu thuật',
			contents: req.body
		});
		logs.save();
		let imgName = req.body.imgName;
		const arrayFilters = [];
		arrayFilters.push({ name:  imgName });
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = { $set: { "inSurgeryImg.$.notDeletedYet": false } }
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id }}),
			ServiceNote.findById({ _id: req.params.id }).updateMany({ ['inSurgeryImg.name']: req.body.imgName }, updateDocument, options)
		])
		.then(() => {
			req.flash('messages_deletedInSurgeryImg_success', 'Xóa hình ảnh phẫu thuật thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Khôi phục ảnh khi phẫu thuật
	restoreInSurgeryImg(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Khôi phục hình ảnh phẫu thuật',
			contents: req.body
		});
		logs.save();
		let imgName = req.body.imgName;
		const arrayFilters = [];
		arrayFilters.push({ name:  imgName });
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = { $set: { "inSurgeryImg.$.notDeletedYet": true }}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id }}),
			ServiceNote.findById({ _id: req.params.id }).updateMany({ ['inSurgeryImg.name']: req.body.imgName }, updateDocument, options)
		])
		.then(() => {
			req.flash('messages_restoreInSurgeryImg_success', 'Khôi phục hình ảnh phẫu thuật thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Xóa video khi phẫu thuật
	deleteInSurgeryVideo(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Xóa video phẫu thuật',
			contents: req.body
		});
		logs.save();
		let videoName = req.body.videoName;
		const arrayFilters = [];
		arrayFilters.push({ name:  videoName });
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = { $set: { "inSurgeryVideo.$.notDeletedYet": false } }
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id }}),
			ServiceNote.findById({ _id: req.params.id }).updateMany({ ['inSurgeryVideo.name']: req.body.videoName }, updateDocument, options)
		])
		.then(() => {
			req.flash('messages_deletedInSurgeryVideo_success', 'Xóa video phẫu thuật thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Khôi phục video phẫu thuật
	restoreInSurgeryVideo(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Khôi phục video phẫu thuật',
			contents: req.body
		});
		logs.save();
		let videoName = req.body.videoName;
		const arrayFilters = [];
		arrayFilters.push({ name:  videoName });
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = { $set: { "inSurgeryVideo.$.notDeletedYet": true } }
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id }}),
			ServiceNote.findById({ _id: req.params.id }).updateMany({ ['inSurgeryVideo.name']: req.body.videoName }, updateDocument, options)
		])
		.then(() => {
			req.flash('messages_restoreInSurgeryVideo_success', 'Khôi phục video phẫu thuật thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Tải lên hình ảnh sau phẫu thuật - thay băng lần đầu
	async uploadAfterImg(req, res, next) {
		const files = req.files;
		const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = `createdAt-${getDate}${(getMonth + 1)}${getYear}`;
		// const resizeOpts = { width: 512, height: 1024 };
		const imgArr = [];

		for (const file of files) {
			if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/avif' || file.mimetype === 'image/webp') {
				const logs = new Log({
					customerID: req.body.cusID,
					serviceNoteID: req.params.id,
					userID: req.userId,
					status: 'Cập nhật hình ảnh sau phẫu thuật trên phiếu dịch vụ',
					contents: req.body
				});
				logs.save();
				let updateStatus = {
					$set: { statusCus: { statusVi: 'Đã cập nhật hình ảnh sau phẫu thuật phiếu dịch vụ', statusEng: 'uploadedAfterImg'} },
					$push: { logIDs: logs._id }
				}
				const image = sharp(file.path).resize().webp();
				const imageFormatName = `${file.fieldname}_img_${req.body.cusID}_${dateNow}_${Date.now()}.${image.options.formatOut}`;

				// Đường dẫn cho môi trường phát triển
				// const storagePathDev = `${appRoot}/src/public/after/img/${imageFormatName}`;

				// Đường dẫn cho môi trường sản xuất
				const storagePathProduct = `${rootPath}mnt/vdb/crm.drtuananh.vn/after/img/${imageFormatName}`;

				// Chuyển hình ảnh đến thư muc trong môi trường phát triển
				// const imageToFolder = image.toFile(storagePathDev, (err, data, info) => data);

				// Chuyển hình ảnh đến thư mục trong môi trường sản xuât
				const imageToFolder = image.toFile(storagePathProduct, (err, data, info) => data);

				const imageURL = imageToFolder.options.fileOut;
				const imageName = await imageURL.split('/').pop();

				imgArr.push({ name: imageName, url: imageURL, notDeletedYet: true });
				await Promise.all([
					Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateStatus),
					ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { afterImg: imgArr }})
				])
				.then(([customer, reExam]) => {

					// Xóa tệp ảnh tạm thời
					fs.unlinkSync(file.path);
					res.status(200).json({ message: 'Hoàn thành tải lên' });
				})
				.catch(next => {
					console.log(`Đã xảy ra lỗi này: ${next}`);
					res.status(500).json(`Đã xảy ra một lỗi: ${next}`);
					
				});
			}
		}
	}

	// Tải lên video sau phẫu thuật - thay băng lần đầu
	async uploadAfterVideo(req, res, next) {
		const files = req.files;
		const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = `createdAt-${getDate}${(getMonth + 1)}${getYear}`;
		const videoArr = [];
		for (const file of files) {
			if (file.mimetype === 'video/avi' || file.mimetype === 'video/flv' || file.mimetype === 'video/wmv'|| file.mimetype === 'video/quicktime' || file.mimetype === 'video/mov' || file.mimetype === 'video/MOV' || file.mimetype === 'video/mp4' || file.mimetype === 'video/webm') {
				const logs = new Log({
					customerID: req.body.cusID,
					serviceNoteID: req.params.id,
					userID: req.userId,
					status: 'Cập nhật video sau phẫu thuật trên phiếu dịch vụ',
					contents: req.body
				});
				logs.save();
				let updateStatus = {
					$set: { statusCus: { statusVi: 'Đã cập nhật video sau phẫu thuật trên phiếu dịch vụ', statusEng: 'uploadedAfterVideo'} },
					$push: { logIDs: logs._id }
				}
				const videoFormatName = `${file.fieldname}_video_${req.body.cusID}_${dateNow}_${Date.now()}${path.extname(file.originalname)}`;
				
				// Đường dẫn cho môi trường phát triển
				// const storagePathDev = `${appRoot}/src/public/after/video/${videoFormatName}`;

				// Đường dẫn cho môi trường sản xuất
				const storagePathProduct = `${rootPath}mnt/vdb/crm.drtuananh.vn/after/video/${videoFormatName}`;

				// Chuyển video đến thư mục trong môi trường phát triển
				// fs.copyFileSync(file.path, storagePathDev);

				// Chuyển video đến thư mục trong môi trường sản xuất
				fs.copyFileSync(file.path, storagePathProduct);

				// Biến đường dẫn trong môi trường phát triển
				// const videoURL = storagePathDev;

				// Biến đường dẫn trong môi trường sản xuất
				const videoURL = storagePathProduct;

				const videoName = await videoURL.split('/').pop();
				videoArr.push({ name: videoName, url: videoURL, notDeletedYet: true });
				await Promise.all([
					Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateStatus),
					ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { afterVideo: videoArr }})
				])
				.then(([customer, reExam]) => {
					// Xóa tệp ảnh tạm thời
					fs.unlinkSync(file.path);
					res.status(200).json({ message: 'Hoàn thành tải lên' });
				})
				.catch(next => {
					console.log(`Đã xảy ra lỗi này: ${next}`);
					res.status(500).json(`Đã xảy ra một lỗi: ${next}`);
					
				});
			}
		}
	}

	// Tải thông tin sau phẫu thuật - thay băng lần đầu
	updateAfter(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Cập nhật thông tin sau phẫu thuật - thay băng lần đầu',
			contents: req.body
		});
		logs.save();
		let updateStatus = {
			$set: { statusCus: { statusVi: 'Đã cập nhật hình ảnh và video thay băng cắt chỉ', statusEng: 'uploadedAfter'} },
			$push: { logIDs: logs._id }
		}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateStatus),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, {
				$set: {
					afterInfo: req.body.afterInfo,
					directedByDoctor: req.body.directedByDoctor,
					statusAfterInfo: req.body.statusAfterInfo,
					isAfterInfo: true
				}})
		])
		.then(() => {
			req.flash('messages_uploadAfter_success', 'Cập nhật thông tin sau phẫu thuật - thay băng lần đầu thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Xóa ảnh thay băng cắt chỉ
	deleteAfterImg(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Xóa hình ảnh thay băng cắt chỉ',
			contents: req.body
		});
		logs.save();
		let imgName = req.body.imgName;
		const arrayFilters = [];
		arrayFilters.push({ name:  imgName });
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = { $set: { "afterImg.$.notDeletedYet": false } }
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id }}),
			ServiceNote.findById({ _id: req.params.id }).updateMany({ ['afterImg.name']: req.body.imgName }, updateDocument, options)
		])
		.then(() => {
			req.flash('messages_deletedAfterImg_success', 'Xóa hình ảnh thay băng thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Khôi phục ảnh thay băng cắt chỉ
	restoreAfterImg(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Khôi phục hình ảnh thay băng cắt chỉ',
			contents: req.body
		});
		logs.save();
		let imgName = req.body.imgName;
		const arrayFilters = [];
		arrayFilters.push({ name:  imgName });
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = { $set: { "afterImg.$.notDeletedYet": true } }
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id }}),
			ServiceNote.findById({ _id: req.params.id }).updateMany({ ['afterImg.name']: req.body.imgName }, updateDocument, options)
		])
		.then(() => {
			req.flash('messages_restoreAfterImg_success', 'Khôi phục hình ảnh thay băng thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Xóa video thay băng cắt chỉ
	deleteAfterVideo(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Xóa video thay băng cắt chỉ',
			contents: req.body
		});
		logs.save();
		let videoName = req.body.videoName;
		const arrayFilters = [];
		arrayFilters.push({ name:  videoName });
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = { $set: { "afterVideo.$.notDeletedYet": false } }
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id }}),
			ServiceNote.findById({ _id: req.params.id }).updateMany({ ['afterVideo.name']: req.body.videoName }, updateDocument, options)
		])
		.then(() => {
			req.flash('messages_deletedAfterVideo_success', 'Xóa video thay băng thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Khôi phục video phẫu thuật
	restoreAfterVideo(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Khôi phục video thay băng cắt chỉ',
			contents: req.body
		});
		logs.save();
		let videoName = req.body.videoName;
		const arrayFilters = [];
		arrayFilters.push({ name:  videoName });
		const options = {"arrayFilters": arrayFilters}
		const updateDocument = { $set: { "afterVideo.$.notDeletedYet": true } }
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id }}),
			ServiceNote.findById({ _id: req.params.id }).updateMany({ ['afterVideo.name']: req.body.videoName }, updateDocument, options)
		])
		.then(() => {
			req.flash('messages_restoreAfterVideo_success', 'Khôi phục video thay băng thành công');
			res.redirect('back');
		})
		.catch(next);
	}

	// Chi tiết phiếu dịch vụ
	showServiceNoteDetail(req, res, next) {
		Promise.all([
			User.findById({ _id: req.userId }),
			ServiceNote.findById({ _id: req.params.id }).populate('performer')
			.populate({
				path: 'scheduleID',
				populate: {
					path: 'cusID',
					populate: {
						path: 'userID',
						model: 'User'
					}
				}
			}).populate({
				path: 'performer',
				model: 'User'
			})
		])
		.then(([user, serviceNote]) => {
			res.render('business/employ/employ-service-note-detail', {
				title: 'Chi tiết phiếu dịch vụ',
				serviceNote: mongooseToObject(serviceNote),
				user: mongooseToObject(user)
			})
		})
		.catch(next);
	}

	// Cập nhật phiếu dịch vụ sang chăm sóc hậu phẫu
	serviceNoteDone(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			scheduleID: req.body.scheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Chuyển thông tin khách hàng sang bộ phận hậu phẫu',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $set: { statusCus: { statusVi: 'Chăm sóc hậu phẫu', statusEng: 'postSurgeryCare' }, isPostSurgeryCare: true, hasWoundCleaningSchedule: false }, $push: { logIDs: logs._id }}),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { status: 'Chăm sóc hậu phẫu', isPostSurgeryCare: true, hasWoundCleaningSchedule: false })
		])
		.then(() => {
			req.flash('messages_movingCustomerCare_success', 'Chuyển hồ sơ khách hàng sang chăm sóc hậu phẫu thành công');
			res.redirect('back');
		})
	}
}

module.exports = new EmployBusinessController();
