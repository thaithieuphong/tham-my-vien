const Customer = require("../../models/Customer");
const Counselor = require("../../models/Counselor");
const Status = require("../../models/Status");
const User = require("../../models/User");
const { mongooseToObject, multipleMongooseToObject } = require("../../../util/mongoose");
const TypeService = require("../../models/TypeService");
const ServiceNote = require('../../models/ServiceNote');
const fs = require('fs');
const appRoot = require('app-root-path');

require('dotenv').config();

const { google } = require('googleapis');
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
		res.render("business/employ/business-overview", {
			title: 'Bảng báo cáo'
		});
	}

	/** Customer */
	showCustomer(req, res, next) {
		Promise.all([Customer.find({userID: req.userId}), User.findById({ _id: req.userId }),
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
		ServiceNote.find({createName: req.userId}).sort({shedule:1}).populate('customerID').populate('createName')
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
		const serviceNote = new ServiceNote({
			customerID: req.body.customerID,
			performer: req.body.performer,
			createName: req.body.createName,
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

	uploadToDrive(req, res, next) {
		Customer.findById({ _id: req.params.id })
			.then((customer) => {
				const fName = customer.firstName;
				const lName = customer.lastName;
				const birth = customer.birth.split('-');
				const newBirth = `${birth[2]}/${birth[1]}/${birth[0]}`;
				const folderCustomer = {
					mimeType: 'application/vnd.google-apps.folder',
					parents: [folderId],
					'name': `${fName} ${lName} ${newBirth}`,
				}
				const arrayFile = req.files;
				try {
					drive.files.create({
						resource: folderCustomer,
						fields: 'id',
					})
						.then(res => {
							// console.log('res', res.data);
							const files = fs.readdirSync(
								appRoot + "/src/public/temp"
							);
							const img = [];
							arrayFile.forEach(element => { // lap qua cac file
								drive.files.create({ // ham khoi tao file tren google drive
									requestBody: { // cau hinh file tren drive
										name: element.filename,
										mimeType: element.mimetype,
										parents: [res.data.id] // id thu muc chua
									},
									media: { // lay thong tin file tu he thong
										mimeType: element.mimetype,
										body: fs.createReadStream(`${appRoot}/src/public/temp/${element.filename}`)
									}
								}).then(data => {
									// console.log('data', data);
									const counselorID = data.data.id
									const counselorName = data.data.name
									const counselorMimeType = data.data.mimeType
									img.push({
										name: counselorName,
										id: counselorID,
										mimeType: counselorMimeType,
									})

									console.log('img', img)
								})
								const counselor = new Counselor({ img });
								// files.filter((img) => {
								// 	if (img === element.filename) {
								// 		fs.unlinkSync(element.path);
								// 	}
								// });
								counselor.save();
							});


						})
						.catch();

					console.log('Folder', folderCustomer);
					// console.log('data', folderCustomer.id);
				} catch (error) {

				}
				res.redirect('back');

			})
	}
}

module.exports = new EmployBusinessController();
