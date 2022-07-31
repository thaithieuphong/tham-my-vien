const Customer = require("../../models/Customer");
const Status = require("../../models/Status");
const User = require("../../models/User");
const { mongooseToObject, multipleMongooseToObject } = require("../../../util/mongoose");
const TypeService = require("../../models/TypeService");
const ServiceNote = require('../../models/ServiceNote');
const fs = require('fs');
const appRoot = require('app-root-path');


class EmployBusinessController {
	//BUSINESS EMPLOY

	// show404(req, res, next) {
	// 	res.render("err/404", {
	// 		title: 'Bảng báo cáo'
	// 	});
	// }

	showDashboard(req, res, next) {
		res.render("business/employ/business-overview", {
			title: 'Bảng báo cáo'
		});
	}

	/** Customer */
	showCustomer(req, res, next) {
		Promise.all([Customer.find({}), TypeService.find({})])
			.then(([customers, typeservices]) => {
				res.render("business/employ/employ-customer", {
					customers: multipleMongooseToObject(customers),
					typeservices: multipleMongooseToObject(typeservices),
					title: 'Quản lý khách hàng'
				});
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

	showCustomerDetail(req, res, next) {
		// console.log(req.params.id);
		// Promise.all([Customer.findById(req.params.id), ServiceNote.find({customerID: req.params.id})])
		// 	.then(([customer, serviceNote]) => {
		// 		let commnetArray = customer.comments;
		// 		commnetArray.forEach(element => {
		// 			var date = new Date(element.createdAt);
		// 			var newDate = date.toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })
		// 			console.log('day', newDate)
		// 			return newDate;
		// 		})
		// 		res.render('business/employ/employ-customer-detail', {
		// 			customer: mongooseToObject(customer),
		// 			serviceNote:multipleMongooseToObject(serviceNote),
		// 			title: "Chi tiết khách hàng"
		// 		});
		// 	})
		// 	.catch(next);
		// res.json(req.params.id)
		Customer.findById({ _id: req.params.id }).populate('serviceNoteID')
			.then((customer) => {
				console.log(customer);
				res.render('business/employ/employ-customer-detail', {
					customer: mongooseToObject(customer),
					title: "Chi tiết khách hàng"
				});
			})
			.catch(next);
		// res.json(req.params)
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
				res.render('business/employ/employ-service-note', {
					serviceNotes: multipleMongooseToObject(serviceNotes),
					title: "Quản lý phiếu dịch vụ"
				});
			})
			.catch(next);
	}

	createServiceNote(req, res, next) {
		const serviceNote = new ServiceNote({
			customerID: req.body.customerID,
			customer: {
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
		console.log(serviceNote.id);
		Customer.findByIdAndUpdate({ _id: req.body.customerID }, { $push: { serviceNoteID: serviceNote.id } })
			.then(() => {
				res.redirect('back');

			})
			.catch(next);
		// res.json(req.body)
	}
}

module.exports = new EmployBusinessController();
