const Role = require("../models/Role");
const Account = require("../models/Account");
const User = require("../models/User");
const Department = require("../models/Department");
const Position = require("../models/Position");
const {
	multipleMongooseToObject,
	mongooseToObject,
} = require("../../util/mongoose");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const uploadAvatar = multer().single("image");
const helpers = require("../../middleware/helpers");
const path = require("path");
const appRoot = require("app-root-path");
const fs = require("fs");
const flash = require('connect-flash');

class RootController {

	getRootDashboard(req, res, next) {
		User.findById({ _id: req.userId })
			.then(user => {
				res.render("root/root-dashboard", {
					user: mongooseToObject(user)
				});
			})
		// res.render("root/root-dashboard");
	}

	getRootMarketingDashboard(req, res, next) {
		res.render("root/root-marketing");
	}

	getRootBussinessDashboard(req, res, next) {
		res.render("root/root-business");
	}

	getRootReceptionDashboard(req, res, next) {
		res.render("root/root-reception");
	}

	getRootOperatingRoomDashboard(req, res, next) {
		res.render("root/root-operating-room");
	}

	getRootCustomerDashboard(req, res, next) {
		res.render("root/root-customer");
	}

	getRootServiceNoteDashboard(req, res, next) {
		res.render("root/root-service-note");
	}

	getRootProfile(req, res, next) {
		User.findById({ _id: req.userId })
			.then(root => {
				res.render('root/root', {
					root: mongooseToObject(root)
				})
			})
	}

	// [GET] /user
	getRootUserDashboard(req, res, next) {
		Promise.all([
			User.find({}),
			Department.find({}),
			Position.find({}),
			Role.find({}),
			User.findById({ _id: req.userId })
		])
			.then(([users, departments, positions, roles, root]) => {
				res.render("root/root-users", {
					users: multipleMongooseToObject(users),
					departments: multipleMongooseToObject(departments),
					positions: multipleMongooseToObject(positions),
					roles: multipleMongooseToObject(roles),
					root: mongooseToObject(root),
				});
			})
			.catch(next);
	}

	// [POST] /user
	postRootUserDashboard(req, res, next) {
		if (req.file) {
			const user = new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				birth: req.body.birth,
				gender: req.body.gender,
				phone: req.body.phone,
				email: req.body.email,
				address: req.body.address,
				department: req.body.department,
				position: req.body.position,
				description: req.body.description,
				account: req.body.account,
				password: bcrypt.hashSync(req.body.password, 8),
				role: req.body.role,
				image: {
					name: req.file.filename,
					url: req.file.path,
				},
			});
			User.findOne({ account: req.body.account })
				.then((account) => {
					if (!account) {
						user.save();
					} else {
						user.account =
							user.account + Math.floor(Math.random() * 100);
						user.save();
					}
                    req.session.message = {
                        type: 'danger',
                        intro: 'Chúc mừng! ',
                        message: 'Bạn tạo người dùng thành công',
                    }
                    res.redirect("user");
				})
				.catch(next);
		} else {
			const user = new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				birth: req.body.birth,
				gender: req.body.gender,
				phone: req.body.phone,
				email: req.body.email,
				address: req.body.address,
				department: req.body.department,
				position: req.body.position,
				description: req.body.description,
				account: req.body.account,
				password: bcrypt.hashSync(req.body.password, 8),
				role: req.body.role,
				image: {
					name: "",
					url: "",
				},
			});
			User.findOne({ account: req.body.account })
				.then((account) => {
					if (!account) {
						user.save();
					} else {
						user.account =
							user.account + Math.floor(Math.random() * 100);
						user.save();
					}
                    req.session.message = {
                        type: 'danger',
                        intro: 'Chúc mừng! ',
                        message: 'Bạn tạo người dùng thành công',
                    }
                    res.redirect("user");
				})
				.catch(next);
		}
	}

	// [PUT] /user
	putRootUser(req, res, next) {
        if (req.file) {
            User.findOneAndUpdate({ _id: req.params.id }, {
                firstName: req.body.filename,
                lastName: req.body.lastName,
                birth: req.body.birth,
                gender: req.body.gender,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address,
                department: req.body.department,
                position: req.body.position,
                description: req.body.description,
                account: req.body.account,
                password: bcrypt.hashSync(req.body.password, 8),
                role: req.body.role,
                image: {
                    name: req.file.filename,
                    url: req.file.path,
                },
            }).then((user) => {
                console.log(user.image.name);
                let imgUser = user.image.name;
                let url = user.image.url
                let files = fs.readdirSync(
                    appRoot + "/src/public/img/uploads/users/"
                );
                files.filter((img) => {
                    if (img === imgUser) {
                        console.log("img user", img);
                        fs.unlinkSync(url);
                    }
                });
                req.session.message = {
                    type: 'danger',
                    intro: 'Chúc mừng! ',
                    message: 'Sửa thông tin thành công',
                }
                res.redirect("/root/user");
            })
            .catch(next);
        } else {
            User.updateOne({ _id: req.params.id }, req.body)
                .then(() => {
                    req.session.message = {
                        type: 'danger',
                        intro: 'Chúc mừng! ',
                        message: 'Sửa thông tin thành công',
                    }
                    res.redirect("/root/user");
                })
                .catch(next);
        }
	}

	detailRootUser(req, res, next) {
		Promise.all([User.findById({ _id: req.params.id}), User.findById({ _id: req.userId})])
			.then(([user, root]) => {
				res.render('root/root-user-detail', {
					user: mongooseToObject(user),
					root: mongooseToObject(root)
				})
			})
	}

	deleteRootUser(req, res, next) {

	}


	// [POST] /department
	createDepartment(req, res, next) {
		const department = new Department(req.body);
		department
			.save()
			.then(() => res.redirect("department"))
			.catch(next);
	}

	// [GET] /department
	getRootDepartmentDashboard(req, res, next) {
		Department.find({})
			.then((departments) => {
				res.render("root/root-departments", {
					departments: multipleMongooseToObject(departments),
				});
			})
			.catch(next);
	}

	// [POST] /role
	createRootRoleDashboard(req, res, next) {
		const role = new Role(req.body);
		role.save()
			.then(() => res.redirect("roles"))
			.catch(next);
	}

	// [GET] /role
	getRootRoleDashboard(req, res, next) {
		Role.find({})
			.then((roles) => {
				res.render("root/root-roles", {
					roles: multipleMongooseToObject(roles),
				});
			})
			.catch(next);
	}

	getRootServiceDashboard(req, res, next) {
		res.render("services/service");
	}

	getRootStatusDashboard(req, res, next) {
		res.render("statuses/status");
	}

	// [GET] Login
	getRegister(req, res, next) {
		Role.find({})
			.then((roles) => {
				res.render("register", {
					roles: multipleMongooseToObject(roles),
				});
			})
			.catch(next);
	}

	// [POST] Register
	postRegister(req, res) {
		const account = new Account({
			userName: req.body.userName,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
			role_id: { $in: req.body.role_id },
		});
		account.save((err, account) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			}
			if (req.body.role_id) {
				Role.find(
					{
						name: { $in: req.body.role_id },
					},
					(err, role) => {
						if (err) {
							res.status(500).send({ message: err });
							return;
						}
						account.role_id = role.map((role) => role._id);
						account.save((err) => {
							if (err) {
								res.status(500).send({ message: err });
								return;
							}
							res.send({
								message: "Đăng ký tài khoản thành công!",
							});
						});
					}
				);
			} else {
				Role.findOne({ name: "manager" }, (err, role) => {
					if (err) {
						res.status(500).send({ message: err });
						return;
					}
					account.role = [role._id];
					account.save((err) => {
						if (err) {
							res.status(500).send({ message: err });
							return;
						}
						res.redirect("login");
					});
				});
			}
		});
	}
}

module.exports = new RootController();
