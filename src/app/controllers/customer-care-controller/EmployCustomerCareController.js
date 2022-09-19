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
		res.redirect('/customer-care/employ/customers')
	}

	/** Customer */
	showCustomer(req, res, next) {
		ServiceNote.find({ status: 'Hoàn thành' }).populate('customerID')
			.then((serviceNotes) => {
				res.render("customer-care/employ/employ-customer", {
					serviceNotes: multipleMongooseToObject(serviceNotes),
					title: 'Danh sách khách hàng đã phẩu thuật'
				})
			})
	}

	

	showReExaminations(req, res, next) {
		Promise.all([
			Customer.findById({ _id: req.params.id }).populate('serviceNoteID').populate('reexamID'),
			User.findById({ _id: req.userId })
		])
			.then(([customer, user]) => {
				console.log(customer)
				res.render('customer-care/employ/employ-re-exam-detail', {
					customer: mongooseToObject(customer),
					user: mongooseToObject(user),
					title: "Danh sách phiếu tái khám"
				});

			})
			.catch(next);
	}
}

module.exports = new EmployBusinessController();
