const Customer = require("../../models/Customer");
const Counselor = require("../../models/Counselor");
const Customer1 = require("../../models/Customer");
const User = require("../../models/User");
const { mongooseToObject, multipleMongooseToObject } = require("../../../util/mongoose");
const TypeService = require("../../models/TypeService");
const ServiceNote = require('../../models/ServiceNote');
const ServiceNote1 = require('../../models/ServiceNote');
const ServiceNote2 = require('../../models/ServiceNote');
const Reexamination = require('../../models/Reexamination');
const fs = require('fs');
const appRoot = require('app-root-path');

class ManagerBusinessController {

	//BUSINESS MANAGER

	// show404(req, res, next) {
	// 	res.render("err/404", {
	// 		title: 'Bảng báo cáo'
	// 	});
	// }

	showDashboard(req, res) {
		Promise.all([
			Customer.find({ userID: null }),
			User.find({ department: "Kinh doanh" })
		])
		.then(([customers, user]) => {
				res.render("business/manager/manager-overview", {
					customers: multipleMongooseToObject(customers),
					users: multipleMongooseToObject(user),
					title: 'Quản lý khách hàng'
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
					description: req.body.description,
					image: {
						name: req.file.filename,
						url: req.file.path,
					},
				}
			)
				.then((customer) => {
					// console.log(customer.image.name);
					let imgCustomer = customer.image.name;
					let url = customer.image.url;
					let files = fs.readdirSync(
						appRoot + "/src/public/img/uploads/customers/"
					);
					files.filter((img) => {
						if (img === imgCustomer) {
							console.log("img user", img);
							fs.unlinkSync(url);
						}
					});
					res.redirect("back");
				})
				.catch(next);
		} else {
			console.log(req.file);
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
		// res.json(req.body)
	}

	showCustomerDetail(req, res, next) {
		Customer.findById({ _id: req.params.id }).populate('serviceNoteID')
			.then((customer) => {
				console.log(customer.counselorName)
				Counselor.find({ filename: { $in: customer.counselorName } })
					.then((counselors) => {
						console.log(counselors)
						res.render('business/manager/manager-customer-detail', {
							customer: mongooseToObject(customer),
							counselors: multipleMongooseToObject(counselors),
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
			.then(([serviceNotes, serviceNote1s, serviceNote2s]) => {


				res.render('business/manager/manager-service-note', {
					serviceNotes: multipleMongooseToObject(serviceNotes),
					serviceNote1s: multipleMongooseToObject(serviceNote1s),
					serviceNote2s: multipleMongooseToObject(serviceNote2s),
					title: "Quản lý phiếu dịch vụ"
				});
			})
			.catch(next);
	}

	createServiceNote(req, res, next) {
		const file = req.files;
		const fnimg = [];
		const fnvideo = []
		file.forEach(element => {
			if (element.mimetype === 'image/jpg' || element.mimetype === 'image/jpeg' || element.mimetype === 'image/png') {
				fnimg.push(element.filename);
				return fnimg;
			} else if (element.mimetype === 'video/avi' || element.mimetype === 'video/flv' || element.mimetype === 'video/wmv' || element.mimetype === 'video/mov' || element.mimetype === 'video/mp4' || element.mimetype === 'video/webm') {
				fnvideo.push(element.filename);
				return fnvideo;
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
			counselorImg: fnimg,
			counselorVideo: fnvideo
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
		res.redirect('back');
		// res.json(req.body)
	}


}

module.exports = new ManagerBusinessController();
