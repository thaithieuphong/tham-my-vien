const Customer = require('../../models/Customer');
const { mongooseToObject, multipleMongooseToObject } = require('../../../util/mongoose');
const User = require('../../models/User');

class ReceptionController{

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

    getReceptionDashboard(req, res) {
        res.render('reception/reception-overview');
    }

    showCustomer(req, res, next) {
        Customer.find({})
            .then((customers) => {
                res.render('reception/reception-customer', {
                    customers: multipleMongooseToObject(customers)
                })
            })
            .catch(next)
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
		res.redirect('back');
	}
    getOneReceptionCustomer(req, res, next) {
		Customer.findById(req.params.id)
			.then(customer => {
				let commnetArray = customer.comments;
				commnetArray.forEach(element => {
					var date = new Date(element.createdAt);
					var newDate = date.toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })
					return newDate;
				})
				res.render('reception/reception-customer-detail', {
					customer: mongooseToObject(customer),
				});
			})
			.catch(next);
	}

    createComment(req, res, next) {
		Customer.findByIdAndUpdate({ _id: req.params.id }, { $push: { comments: { comment: req.body.comments } } })
			.then(() => res.redirect('back'))
			.catch(next);
	}

	getServiceNoteDashboard(req, res) {
		res.render('reception/reception-service-note');
	}

};


module.exports = new ReceptionController;