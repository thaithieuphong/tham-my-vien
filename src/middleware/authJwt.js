// Xác minh mã thông báo, kiểm tra vai trò người dùng trong cơ sở dữ liệu
const jwt = require("jsonwebtoken");
const User = require("../app/models/User");
const flash = require('connect-flash');

class authJwt {
	verifyToken(req, res, next) {
		let token = req.session.token;
		console.log('auth token', token);
		if (!token) {
			req.flash('messages_token_wrong', 'Mã bảo mật không đúng');
			res.redirect('/');
		}
		jwt.verify(token, process.env.ACCESSTOKEN_KEY, (err, decoded) => {
			if (err) {
				req.flash('messages_token_failure', 'Tài khoản hết hạn truy cập');
				res.redirect('/');
			}
			req.userId = decoded.id;
			next();
		});
	}

	isMarketingEmploy(req, res, next) {
		User.findById(req.userId)
			.then((user) => {
				if (user.departmentEng === 'marketing' && user.positionEng === 'employ') {
					next();
				} else {
					res.render('err/403', { layout: false });
				}
			}).catch(next);
	}
	
	isMarketingManager(req, res, next) {
		User.findById(req.userId)
			.then((user) => {
				if (user.departmentEng === 'marketing' && user.positionEng === 'manager') {
					next();
				} else {
					res.render('err/403', { layout: false });
				}
			}).catch(next);
	}

	isBusinessEmploy(req, res, next) {
		User.findById(req.userId)
			.then((user) => {
				if (user.departmentEng === 'business' && user.positionEng === 'employ') {
					next();
				} else {
					res.render('err/403', { layout: false });
				}
			}).catch(next);
	}

	isBusinessManager(req, res, next) {
		User.findById(req.userId)
			.then((user) => {
				if (user.departmentEng === 'business' && user.positionEng === 'manager') {
					next();
				} else {
					res.render('err/403', { layout: false });
				}
			}).catch(next);
	}

	isReceptionEmploy(req, res, next) {
		User.findById(req.userId)
			.then((user) => {
				if (user.departmentEng === 'reception' && user.positionEng === 'employ') {
					next();
				} else {
					res.render('err/403', { layout: false });
				}
			}).catch(next);
	}

	isReceptionManager(req, res, next) {
		User.findById(req.userId)
			.then((user) => {
				if (user.departmentEng === 'reception' && user.positionEng === 'employ') {
					next();
				} else {
					res.render('err/403', { layout: false });
				}
			}).catch(next);
	}

	isDoctor(req, res, next) {
		User.findById(req.userId)
			.then((user) => {
				if (user.departmentEng === 'operating-room' && user.positionEng === 'doctor') {
					next();
				} else {
					res.render('err/403', { layout: false });
				}
			}).catch(next);
	}

	isNursing(req, res, next) {
		User.findById(req.userId)
			.then((user) => {
				if (user.departmentEng === 'operating-room' && user.positionEng === 'nursing') {
					next();
				} else {
					res.render('err/403', { layout: false });
				}
			}).catch(next);
	}

	isHREmploy(req, res, next) {
		User.findById(req.userId)
			.then((user) => {
				if (user.departmentEng === 'human-resources' && user.positionEng === 'employ') {
					next();
				} else {
					res.render('err/403', { layout: false });
				}
			}).catch(next);
	}

	isHRManager(req, res, next) {
		User.findById(req.userId)
			.then((user) => {
				if (user.departmentEng === 'human-resources' && user.positionEng === 'manager') {
					next();
				} else {
					res.render('err/403', { layout: false });
				}
			}).catch(next);
	}

	isAdmin(req, res, next) {
		Promise.all([Account.findById(req.body._id), Role.find({})])
			.then((users, roles) => {
				if (users.role === roles.engName) {
					next();
				} else {
					res.render('err/403', { layout: false });
				}
			})
			.catch(next);
	}

	isRoot(req, res, next) {
		User.findById(req.userId)
			.then((user) => {
				if (user.roleEng === 'root') {
					console.log(user.role);
					next();
				} else {
					res.render('err/403', { layout: false });
				}
			})
			.catch(next);
	}
}

module.exports = new authJwt();
