const Customer = require('../models/Customer');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');

class OperationRoomController {
    //doctor
    getOperatingDashboard(req, res) {
        res.render('operating/doctor/operating-overview');
    }

    showCustomer(req, res, next) {
        Customer.find({})
            .then((customers) => {
                res.render('operating/doctor/operating-customer', {
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
    getOneOperatingCustomer(req, res, next) {
		Customer.findById(req.params.id)
			.then(customer => {
				let commnetArray = customer.comments;
				commnetArray.forEach(element => {
					var date = new Date(element.createdAt);
					var newDate = date.toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })
					console.log('day', newDate)
					return newDate;
				})
				res.render('operating/doctor/operating-customer-detail', {
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
		res.render('operating/doctor/operating-service-note');
	}

    //nursing
    getNOperatingDashboard(req, res) {
        res.render('operating/nursing/operating-overview');
    }

    showNCustomer(req, res, next) {
        Customer.find({})
            .then((customers) => {
                res.render('operating/nursing/operating-customer', {
                    customers: multipleMongooseToObject(customers)
                })
            })
            .catch(next)
    }

    getNOneOperatingCustomer(req, res, next) {
		Customer.findById(req.params.id)
			.then(customer => {
				let commnetArray = customer.comments;
				commnetArray.forEach(element => {
					var date = new Date(element.createdAt);
					var newDate = date.toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })
					console.log('day', newDate)
					return newDate;
				})
				res.render('operating/nursing/operating-customer-detail', {
					customer: mongooseToObject(customer),
				});
			})
			.catch(next);
	}

}

module.exports = new OperationRoomController;
