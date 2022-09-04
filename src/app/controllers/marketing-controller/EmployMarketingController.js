const Customer = require('../../models/Customer');
const User = require('../../models/User');
const { mongooseToObject, multipleMongooseToObject } = require('../../../util/mongoose');
const fs = require('fs');
const path = require('path');
const rootPath = path.sep;

class MarketingController {

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

    //EMPLOY
    showDashboard(req, res, next) {
		User.findById({_id: req.userId})
			.then(user => {
				res.render('marketing/employ/employ-overview', {
					user: mongooseToObject(user)
				});
			})
			.catch(next);
    }

    showCustomer(req, res, next) {
		Promise.all([User.findById({_id: req.userId}), Customer.find({userID: null})])
            .then(([user, customers]) => {
				// console.log('user', mongooseToObject(user))
                res.render('marketing/employ/employ-customer', {
					user: mongooseToObject(user),
                    customers: multipleMongooseToObject(customers),
					title: 'Quản lý khách hàng'
                })
            })
            .catch(next);
    }

	showCustomerDetail(req, res, next) {
		Promise.all([
			Customer.findById({ _id: req.params.id }).populate('serviceNoteID'),
			User.findById({_id: req.userId})
		])
			.then(([customer, user]) => {
				res.render('marketing/employ/employ-customer-detail', {
					customer: mongooseToObject(customer),
					user: mongooseToObject(user),
					title: "Chi tiết khách hàng"
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
				description: req.body.description + req.body.userName,
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
		res.redirect('back');
	}

	editCustomer(req, res, next) {
		if (req.file) {
			Customer.findOneAndUpdate(
				{ _id: req.params.id },
				{
					firstName: req.body.filename,
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
};

module.exports = new MarketingController;

