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
		res.redirect('/business/employ/customers')
	}

	/** Customer */
	showCustomer(req, res, next) {
		Promise.all([Customer.find({}), User.findById({ _id: req.userId }),
		TypeService.find({})])
			.then(([customers, user, typeservices]) => {
				let cusNew = [];
				let cusPotential = [];
				let cusSchedule = [];
				let cusFail = [];
				customers.forEach(customer => {
					if(customer.statusCus.statusEng === 'New') {
						cusNew.push(customer);
					}
					if(customer.statusCus.statusEng === 'Potential') {
						cusPotential.push(customer);
					}
					if(customer.statusCus.statusEng === 'Schedule') {
						cusSchedule.push(customer);
					}
					if(customer.statusCus.statusEng === 'Fail') {
						cusFail.push(customer);
					}
				})
				res.render("business/employ/employ-customer", {
					cusNew: multipleMongooseToObject(cusNew),
					cusPotential: multipleMongooseToObject(cusPotential),
					cusSchedule: multipleMongooseToObject(cusSchedule),
					cusFail: multipleMongooseToObject(cusFail),
					user: mongooseToObject(user),
					typeservices: multipleMongooseToObject(typeservices),
					title: 'Quản lý khách hàng'
				});
			})
			.catch(next);
	}

	createCustomer(req, res, next) {
		if (req.file) {
			if(req.body.statusVi === 'Tạo mới') {
				const customer = new Customer({
					userID: req.userId,
					nickName: req.body.nickName,
					fullName: req.body.fullName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					email: req.body.email,
					address: req.body.address,
					resource: req.body.resource,
					description: req.body.description,
					statusCus: {
						statusVi: req.body.statusVi,
						statusEng: 'New'
					},
					image: {
						name: req.file.filename,
						url: req.file.path,
					},
				});
				customer.save();
			}

			if(req.body.statusVi === 'Tiềm năng') {
				const customer = new Customer({
					userID: req.userId,
					nickName: req.body.nickName,
					fullName: req.body.fullName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					email: req.body.email,
					address: req.body.address,
					resource: req.body.resource,
					description: req.body.description,
					statusCus: {
						statusVi: req.body.statusVi,
						statusEng: 'Potential'
					},
					image: {
						name: req.file.filename,
						url: req.file.path,
					},
				});
				customer.save();
			}

			if(req.body.statusVi === 'Đặt lịch') {
				const customer = new Customer({
					userID: req.userId,
					nickName: req.body.nickName,
					fullName: req.body.fullName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					email: req.body.email,
					address: req.body.address,
					resource: req.body.resource,
					description: req.body.description,
					statusCus: {
						statusVi: req.body.statusVi,
						statusEng: 'Schedule'
					},
					image: {
						name: req.file.filename,
						url: req.file.path,
					},
				});
				customer.save();
			}

			if(req.body.statusVi === 'Không thành công') {
				const customer = new Customer({
					userID: req.userId,
					nickName: req.body.nickName,
					fullName: req.body.fullName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					email: req.body.email,
					address: req.body.address,
					resource: req.body.resource,
					description: req.body.description,
					statusCus: {
						statusVi: req.body.statusVi,
						statusEng: 'Fail'
					},
					image: {
						name: req.file.filename,
						url: req.file.path,
					},
				});
				customer.save();
			}
		} else {
			if(req.body.statusVi === 'Tạo mới') {
				const customer = new Customer({
					userID: req.userId,
					nickName: req.body.nickName,
					fullName: req.body.fullName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					email: req.body.email,
					address: req.body.address,
					resource: req.body.resource,
					description: req.body.description,
					statusCus: {
						statusVi: req.body.statusVi,
						statusEng: 'New'
					},
					image: {
						name: "",
						url: "",
					},
				});
				customer.save();
			}

			if(req.body.statusVi === 'Tiềm năng') {
				const customer = new Customer({
					userID: req.userId,
					nickName: req.body.nickName,
					fullName: req.body.fullName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					email: req.body.email,
					address: req.body.address,
					resource: req.body.resource,
					description: req.body.description,
					statusCus: {
						statusVi: req.body.statusVi,
						statusEng: 'Potential'
					},
					image: {
						name: "",
						url: "",
					},
				});
				customer.save();
			}

			if(req.body.statusVi === 'Đặt lịch') {
				const customer = new Customer({
					userID: req.userId,
					nickName: req.body.nickName,
					fullName: req.body.fullName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					email: req.body.email,
					address: req.body.address,
					resource: req.body.resource,
					description: req.body.description,
					statusCus: {
						statusVi: req.body.statusVi,
						statusEng: 'Schedule'
					},
					image: {
						name: "",
						url: "",
					},
				});
				customer.save();
			}
			if(req.body.statusVi === 'Đặt lịch') {
				const customer = new Customer({
					userID: req.userId,
					nickName: req.body.nickName,
					fullName: req.body.fullName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					email: req.body.email,
					address: req.body.address,
					resource: req.body.resource,
					description: req.body.description,
					statusCus: {
						statusVi: req.body.statusVi,
						statusEng: 'Schedule'
					},
					image: {
						name: "",
						url: "",
					},
				});
				customer.save();
			}
		}
		req.flash('messages_createCustomer_success', 'Tạo khách hàng thành công');
		res.redirect("back");
	}

	editCustomer(req, res, next) {
		if (req.file) {
			if(req.body.statusVi === 'Tạo mới') {
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
						statusCus: {
							statusVi: req.body.statusVi,
							statusEng: 'New'
						},
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
						res.redirect("back");
					})
					.catch(next);
			}

			if(req.body.statusVi === 'Tiềm năng') {
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
						statusCus: {
							statusVi: req.body.statusVi,
							statusEng: 'Potential'
						},
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
						res.redirect("back");
					})
					.catch(next);
			}

			if(req.body.statusVi === 'Đặt lịch') {
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
						statusCus: {
							statusVi: req.body.statusVi,
							statusEng: 'Schedule'
						},
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
						res.redirect("back");
					})
					.catch(next);
			}

			if(req.body.statusVi === 'Không thành công') {
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
						statusCus: {
							statusVi: req.body.statusVi,
							statusEng: 'Fail'
						},
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
						res.redirect("back");
					})
					.catch(next);
			}
		} else {
			if(req.body.statusVi === 'Tạo mới') {
				Customer.updateOne({ _id: req.params.id },{
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					email: req.body.email,
					address: req.body.address,
					resource: req.body.resource,
					description: req.body.description,
					statusCus: {
						statusVi: req.body.statusVi,
						statusEng: 'New'
					},
				})
				.then((customer) => {
					req.flash('messages_editCustomer_success', 'Chỉnh sửa thông tin khách hàng thành công');
					res.redirect("back");
				})
				.catch(next);
			}
			if(req.body.statusVi === 'Tiềm năng') {
				Customer.updateOne({ _id: req.params.id },{
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					email: req.body.email,
					address: req.body.address,
					resource: req.body.resource,
					description: req.body.description,
					statusCus: {
						statusVi: req.body.statusVi,
						statusEng: 'Potential'
					},
				})
				.then((customer) => {
					req.flash('messages_editCustomer_success', 'Chỉnh sửa thông tin khách hàng thành công');
					res.redirect("back");
				})
				.catch(next);
			}
			if(req.body.statusVi === 'Đặt lịch') {
				Customer.updateOne({ _id: req.params.id },{
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					email: req.body.email,
					address: req.body.address,
					resource: req.body.resource,
					description: req.body.description,
					statusCus: {
						statusVi: req.body.statusVi,
						statusEng: 'Schedule'
					},
				})
				.then((customer) => {
					req.flash('messages_editCustomer_success', 'Chỉnh sửa thông tin khách hàng thành công');
					res.redirect("back");
				})
				.catch(next);
			}
			if(req.body.statusVi === 'Không thành công') {
				Customer.updateOne({ _id: req.params.id },{
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					birth: req.body.birth,
					gender: req.body.gender,
					phone: req.body.phone,
					email: req.body.email,
					address: req.body.address,
					resource: req.body.resource,
					description: req.body.description,
					statusCus: {
						statusVi: req.body.statusVi,
						statusEng: 'Fail'
					},
				})
				.then((customer) => {
					req.flash('messages_editCustomer_success', 'Chỉnh sửa thông tin khách hàng thành công');
					res.redirect("back");
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
		console.log('user id', req.userId)
		Customer.findByIdAndUpdate(
			{ _id: req.params.id },
			{$push: { comments: { comment: req.body.comments } }, userID: req.userId}
		)
			.then(() => res.redirect("back"))
			.catch(next);
	}

	moveToPotential(req, res, next) {
		Customer.findByIdAndUpdate({ _id: req.params.id }, {$set: {statusCus: {statusVi: 'Tiềm năng', statusEng: 'Potential'}}})
			.then(() => {
				res.redirect('back');
			})
			.catch(next);
	}

	moveToSchedule(req, res, next) {
		Customer.findByIdAndUpdate({ _id: req.params.id }, {$set: {statusCus: {statusVi: 'Đặt lịch', statusEng: 'Schedule'}}})
			.then(() => {
				res.redirect('back');
			})
			.catch(next);
	}

	moveToNotOK(req, res, next) {
		Customer.findById({ _id: req.params.id }).updateOne({statusCus: {statusVi: 'Không thành công', statusEng: 'Fail'}})
			.then(() => {
				res.redirect('back');
			})
			.catch(next);
	}

	showSchedule(req, res, next) {
		Promise.all([
			Schedule.find({ createName: req.userId, status: "Tạo mới" }).populate('customerID').populate('createName'),
			Schedule.find({ createName: req.userId, status: 'Đang xử lý'}).populate('customerID').populate('createName').populate('serviceNoteID'),
			Schedule.find({ createName: req.userId, status: "Hoàn thành" }).populate('customerID').populate('createName').populate('serviceNoteID'),
			User.findById({ _id: req.userId })
		])
			.then(([newSchedule, handlingSchedule, doneSchedule, user]) => {
				console.log('handling schedule', doneSchedule)
				res.render('business/employ/employ-schedule', {
					newSchedule: multipleMongooseToObject(newSchedule),
					handlingSchedule: multipleMongooseToObject(handlingSchedule),
					doneSchedule: multipleMongooseToObject(doneSchedule),
					user: mongooseToObject(user),
					title: "Quản lý phiếu dịch vụ"
				});
			})
			.catch(next);
	}

	createSchedule(req, res, next) {
		const file = req.files;
		console.log('file', file)
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
		const schedule = new Schedule({
			customerID: req.body.customerID,
			createName: req.body.createName,
			status: "Tạo mới",
			service: req.body.service,
			comments: { comment: req.body.comment },
			schedule: req.body.schedule,
			priceBefore: req.body.priceBefore,
			deposit: req.body.deposit,
			counselorImg: imgArr,
			counselorVideo: videoArr,
		});
		schedule.save();
		Customer.findByIdAndUpdate({ _id: req.body.customerID }, { $push: { scheduleID: schedule.id }})
			.then(() => {
				req.flash('messages_createSchedule_success', 'Tạo lịch hẹn thành công');
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
				res.redirect('back');
			})
	}
}

module.exports = new EmployBusinessController();
