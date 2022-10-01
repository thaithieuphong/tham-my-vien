const Customer = require("../../models/Customer");
const Counselor = require("../../models/Counselor");
const Customer1 = require("../../models/Customer");
const User = require("../../models/User");
const User1 = require("../../models/User");
const { mongooseToObject, multipleMongooseToObject } = require("../../../util/mongoose");
const TypeService = require("../../models/TypeService");
const ServiceNote = require('../../models/ServiceNote');
const ServiceNote1 = require('../../models/ServiceNote');
const ServiceNote2 = require('../../models/ServiceNote');
const ServiceNote3 = require('../../models/ServiceNote');
const Reexamination = require('../../models/Reexamination');
const fs = require('fs');
const path = require('path');
const rootPath = path.sep;

class ManagerBusinessController {

	//BUSINESS MANAGER

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

	showDashboard(req, res) {
		Promise.all([
			Customer.find({ userID: null }),
			User1.find({ department: "Kinh doanh" }),
			User.findById({_id: req.userId})
		])
			.then(([customers, user1s, user]) => {
				res.render("business/manager/manager-overview", {
					customers: multipleMongooseToObject(customers),
					user1s: multipleMongooseToObject(user1s),
					user: mongooseToObject(user),
					title: 'Quản lý khách hàng 1'
				});
			})
	}

	showCustomer(req, res, next) {
		Promise.all([Customer.find({ userID: req.userId }), User.findById({ _id: req.userId }), Customer1.find({ userID: { $exists: true } }).populate('userID'),
		TypeService.find({})])
			.then(([customers, user, customer1s, typeservices]) => {
				res.render("business/manager/manager-customer", {
					customers: multipleMongooseToObject(customers),
					user: mongooseToObject(user),
					customer1s: multipleMongooseToObject(customer1s),
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

	addUseridToCustomer(req, res, next) {
		Customer.updateMany({ _id: { $in: req.body.customerIds } }, { $set: { userID: req.body.userID } })
			.then(() => res.redirect('back'))
			.catch(next);
	}

	showCustomerDetail(req, res, next) {
		Promise.all([Customer.findById({ _id: req.params.id }).populate('serviceNoteID').populate('reexamID'), User.findById({ _id: req.userId })])
			.then(([customer, user]) => {
				Counselor.find({ filename: { $in: customer.counselorName } })
					.then((counselors) => {
						res.render('business/manager/manager-customer-detail', {
							customer: mongooseToObject(customer),
							counselors: multipleMongooseToObject(counselors),
							user: mongooseToObject(user),
							title: "Chi tiết khách hàng"
						});
					})

			})
			.catch(next);
	}

	showCustomerDetailCTV(req, res, next) {
		Promise.all([Customer.findById({ _id: req.params.id }).populate('serviceNoteID').populate('reexamID'), User.findById({ _id: req.userId })])
			.then(([customer, user]) => {
				Counselor.find({ filename: { $in: customer.counselorName } })
					.then((counselors) => {
						res.render('business/manager/manager-customer-detail-ctv', {
							customer: mongooseToObject(customer),
							counselors: multipleMongooseToObject(counselors),
							user: mongooseToObject(user),
							title: "Chi tiết khách hàng"
						});
					})

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
		Promise.all([
			ServiceNote.find({ createName: req.userId, status: "Tạo mới" }).sort({ shedule: 1 }).populate('customerID').populate('createName').populate('recept').populate('performer').populate('nursing'),
			ServiceNote1.find({ createName: req.userId, status: "Đang xử lý" }).sort({ shedule: 1 }).populate('customerID').populate('createName').populate('recept').populate('performer').populate('nursing'),
			ServiceNote2.find({ createName: req.userId, status: "Hoàn thành" }).sort({ shedule: 1 }).populate('customerID').populate('createName').populate('recept').populate('performer').populate('nursing'),
			User.findById({ _id: req.userId })
		])
			.then(([serviceNotes, serviceNote1s, serviceNote2s, user]) => {
				res.render('business/manager/manager-service-note', {
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
		const videoArr = []
		file.forEach(element => {
			if (element.mimetype === 'image/jpg' || element.mimetype === 'image/jpeg' || element.mimetype === 'image/png') {
				imgArr.push({ name: element.filename, url: element.path });
				return imgArr;
			} else if (element.mimetype === 'video/avi' || element.mimetype === 'video/flv' || element.mimetype === 'video/wmv' || element.mimetype === 'video/mov' || element.mimetype === 'video/mp4' || element.mimetype === 'video/webm') {
				videoArr.push({ name: element.filename, url:  element.path });
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
			counselorVideo: videoArr
		});
		serviceNote.save();
		Customer.findByIdAndUpdate({ _id: req.body.customerID }, { $push: { serviceNoteID: serviceNote.id } })
			.then(() => {
				res.redirect('back');
			})
	}

	deleteServiceNote(req, res, next) {
		ServiceNote.delete({ _id: req.params.id })
			.then(() => res.redirect("back"))
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
	}


}

module.exports = new ManagerBusinessController();
