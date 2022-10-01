const Customer = require("../../models/Customer");
const User = require("../../models/User");
const { mongooseToObject, multipleMongooseToObject } = require("../../../util/mongoose");
const TypeService = require("../../models/TypeService");
const ServiceNote = require('../../models/ServiceNote');
const ServiceNote1 = require('../../models/ServiceNote');
const ServiceNote2 = require('../../models/ServiceNote');
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
				statusCus: {
					statusVi: 'Tạo mới',
					statusEng: 'New'
				},
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
				statusCus: {
					statusVi: 'Tạo mới',
					statusEng: 'New'
				},
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
			{ $push: { comments: { comment: req.body.comments } } }
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

	showServiceNote(req, res, next) {
		Promise.all([
			ServiceNote.find({ createName: req.userId, status: "Tạo mới" }).sort({ shedule: 1 }).populate('customerID').populate('createName').populate('recept').populate('performer').populate('nursing'),
			ServiceNote1.find({ createName: req.userId, status: "Đang xử lý" }).sort({ shedule: 1 }).populate('customerID').populate('createName').populate('recept').populate('performer').populate('nursing'),
			ServiceNote2.find({ createName: req.userId, status: "Hoàn thành" }).sort({ shedule: 1 }).populate('customerID').populate('createName').populate('recept').populate('performer').populate('nursing'),
			User.findById({ _id: req.userId })
		])
			.then(([serviceNotes, serviceNote1s, serviceNote2s, user]) => {
				res.render('business/employ/employ-service-note', {
					serviceNotes: multipleMongooseToObject(serviceNotes),
					serviceNote1s: multipleMongooseToObject(serviceNote1s),
					serviceNote2s: multipleMongooseToObject(serviceNote2s),
					user: mongooseToObject(user),
					title: "Quản lý phiếu dịch vụ"
				});
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
		Customer.findByIdAndUpdate({ _id: req.body.customerID }, { $push: { serviceNoteID: serviceNote.id }})
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
				res.redirect('back');
			})
	}
}

module.exports = new EmployBusinessController();
