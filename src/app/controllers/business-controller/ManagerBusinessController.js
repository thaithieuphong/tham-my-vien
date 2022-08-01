const Customer = require("../../models/Customer");
const Customer1 = require("../../models/Customer");
const User = require("../../models/User");
const { mongooseToObject, multipleMongooseToObject } = require("../../../util/mongoose");
const TypeService = require("../../models/TypeService");
const ServiceNote = require('../../models/ServiceNote');
const fs = require('fs');
const appRoot = require('app-root-path');

class ManagerBusinessController {

	//BUSINESS MANAGER

	show404(req, res, next) {
		res.render("err/404", {
			title: 'Bảng báo cáo'
		});
	}

	showDashboard(req, res) {
		res.render("business/manager/manager-overview");
	}

	showCustomer(req, res, next) {
		Promise.all([Customer.find({ userID: null }), Customer1.find({ userID: { $exists: true } }).populate('userID'),
		TypeService.find({}), User.find({ department: "Kinh doanh", position: "Nhân viên" })])
			.then(([customers, customer1s, typeservices, users]) => {
				res.render("business/manager/manager-customer", {
					customers: multipleMongooseToObject(customers),
					customer1s: multipleMongooseToObject(customer1s),
					typeservices: multipleMongooseToObject(typeservices),
					users: multipleMongooseToObject(users),
					title: 'Quản lý khách hàng'
				});
				customer1s.forEach(element => console.log(element.userID));
			})
			.catch(next);
	}



	createCustomer(req, res, next) {
		if (req.file) {
			const customer = new Customer({
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

	}

	showCustomerDetail(req, res, next) {
		Customer.findById({ _id: req.params.id }).populate('serviceNoteID')
			.then((customer) => {
				console.log(customer);
				res.render('business/manager/manager-customer-detail', {
					customer: mongooseToObject(customer),
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

	showServiceNote(req, res, next) {
		ServiceNote.find({})
			.then(serviceNotes => {
				res.render('business/manager/manager-service-note', {
					serviceNotes: multipleMongooseToObject(serviceNotes),
					title: "Quản lý phiếu dịch vụ"
				});
			})
			.catch(next);
	}

	createServiceNote(req, res, next) {
		const serviceNote = new ServiceNote({
			customer: {
				customerID: req.body.customerID,
				name: req.body.name,
				birth: req.body.birth,
				gender: req.body.gender,
				email: req.body.email,
				phone: req.body.phone,
				address: req.body.address
			},

			performer: req.body.performer,
			createName: req.body.name,
			status: "Tạo mới",
			service: req.body.service,
			comments: { comment: req.body.comment },
			schedule: req.body.schedule,
			price: req.body.price,
		});
		serviceNote.save();
		res.redirect('back');
	}

	deleteServiceNote(req, res, next) {
		Promise.all([ServiceNote.delete({ _id: req.params.id }),
		ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $set: { stored: "Yes" } })])
			.then(() => res.redirect("back"))
			.catch(next);
	}


}

module.exports = new ManagerBusinessController();
