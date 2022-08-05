const Customer = require("../../models/Customer");
const Counselor = require("../../models/Counselor");
const Status = require("../../models/Status");
const User = require("../../models/User");
const { mongooseToObject, multipleMongooseToObject } = require("../../../util/mongoose");
const TypeService = require("../../models/TypeService");
const ServiceNote = require('../../models/ServiceNote');
const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');

require('dotenv').config();

const { google } = require('googleapis');
const { uploadDrive } = require("../../../middleware/uploadGoogleDrive");
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectURI = process.env.REDIRECT_URI;
const refreshTokenGG = process.env.REFRESH_TOKEN_GOOGLE;
const folderId = process.env.GOOGLE_API_FOLDER_ID;

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectURI);
oAuth2Client.setCredentials({ refresh_token: refreshTokenGG });

const drive = google.drive({
	version: 'v3',
	auth: oAuth2Client,
})


class EmployBusinessController {
	//BUSINESS EMPLOY

	showDashboard(req, res, next) {
		res.redirect('/business/employ/customers')
		// res.render("business/employ/business-overview", {
		// 	title: 'Bảng báo cáo'
		// });
	}

	/** Customer */
	showCustomer(req, res, next) {
		// console.log("path-join", path.join("src", "pulic", "temp"))s
		Promise.all([Customer.find({ userID: req.userId }), User.findById({ _id: req.userId }),
		TypeService.find({})])
			.then(([customers, user, typeservices]) => {
				res.render("business/employ/employ-customer", {
					customers: multipleMongooseToObject(customers),
					user: mongooseToObject(user),
					typeservices: multipleMongooseToObject(typeservices),
					title: 'Quản lý khách hàng'
				});
			})
			.catch(next);
		// res.json(req.firstName);
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
				console.log(customer.counselorName)
				Counselor.find({ filename: {$in: customer.counselorName}})
					.then((counselors) => {
						res.render('business/employ/employ-customer-detail', {
							customer: mongooseToObject(customer),
							counselors: multipleMongooseToObject(counselors), 
							title: "Chi tiết khách hàng"
						});
					})
				
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
		ServiceNote.find({ createName: req.userId }).sort({ shedule: 1 }).populate('customerID').populate('createName')
			.then(serviceNotes => {
				res.render('business/employ/employ-service-note', {
					serviceNotes: multipleMongooseToObject(serviceNotes),
					title: "Quản lý phiếu dịch vụ"
				});
			})
			.catch(next);
		// res.json(req.userId)
	}

	createServiceNote(req, res, next) {
		// console.log(req.files);
		const file = req.files;
		const fn = []
		// const fn = file.filter(element => element.filename !== "" ? element.filename : null);
		file.forEach(element => {
			fn.push(element.filename)
			return fn;
		})
		console.log("fn",fn);
		const serviceNote = new ServiceNote({
			customerID: req.body.customerID,
			performer: req.body.performer,
			createName: req.body.createName,
			status: "Tạo mới",
			service: req.body.service,
			comments: { comment: req.body.comment },
			schedule: req.body.schedule,
			price: req.body.price,
			counselorName: fn,
		});
		serviceNote.save();
		Customer.findByIdAndUpdate({ _id: req.body.customerID }, { $push: { serviceNoteID: serviceNote.id, counselorName:  fn } })
			.then(() => {
				res.redirect('back');

			})



		// res.json(req.body)
	}

}

module.exports = new EmployBusinessController();
