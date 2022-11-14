const Role = require("../models/Role");
const Account = require("../models/Account");
const Customer = require("../models/Customer");
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
const Schedule = require("../models/Schedule");
const ServiceNote = require("../models/ServiceNote");
const Reexamination = require("../models/Reexamination");

class RootController {

	getRootDashboard(req, res, next) {
		Promise.all([
			User.findById({ _id: req.userId }),
			Customer.find({}).populate('userID')
		])
			.then(([user, customers]) => {
				res.render("root/root-dashboard", {
					user: mongooseToObject(user),
					customers: multipleMongooseToObject(customers),
					title: 'Danh sách khách hàng'
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

	// Hiển thị chi tiết khách hàng
	getRootCustomerDetail(req, res, next) {
		Promise.all([
			Customer.findById({ _id: req.params.id}).populate('userID'),
			User.find({}),
			Schedule.find({}).populate({
				path: 'customerID',
				populate: {
					path: 'userID',
					model: 'User',
				}
			}),
			ServiceNote.find({}).populate('scheduleID'),
			Reexamination.find({}).populate('customerID').populate('serviceNoteId')
		])
			.then(([customer, users, schedules, serviceNotes, reExaminations]) => {
				console.log(schedules)
				res.render("root/root-customer-detail", {
					customer: mongooseToObject(customer),
					users: multipleMongooseToObject(users),
					schedules: multipleMongooseToObject(schedules),
					serviceNotes: multipleMongooseToObject(serviceNotes),
					reExaminations: multipleMongooseToObject(reExaminations),
					title: 'Chi tiết khách hàng'
				});
			})
	}

	// Cập nhật user id cho customer cũ
	patchCustomerUserID(req, res, next) {
		console.log('reexamID', req.body.userID)
	}

	// Cập nhật schedule id cho customer cũ
	patchCustomerScheduleID(req, res, next) {
		console.log('reexamID', req.body.scheduleID)
	}

	// Cập nhật service note id cho customer cũ
	patchCustomerServiceNoteID(req, res, next) {
		console.log('reexamID', req.body.serviceNoteID)
	}

	// Cập nhật re-examination id cho customer cũ
	patchCustomerRexamID(req, res, next) {
		console.log('reexamID', req.body.reexamID)
	}

	// Hiển thị danh hồ sơ khách hàng
	getRootServiceNoteDashboard(req, res, next) {
		ServiceNote.find({}).populate('scheduleID')
			.then(serviceNote => {
				console.log(serviceNote)
				res.render("root/root-service-note", {
					serviceNote: multipleMongooseToObject(serviceNote)
				});
			})
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
		Promise.all([
			Department.find({ name: req.body.department }),
			Position.find({ name: req.body.position }),
		]).then(([department, position]) => {
			const dpmEng = department.map((departmentEng) => departmentEng.engName);
			const pstEng = position.map((positionEng) => positionEng.engName);
			function convert_vi_to_en(str) {
				str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
				str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
				str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
				str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
				str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
				str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
				str = str.replace(/đ/g, "d");
				str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
				str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
				str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
				str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
				str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
				str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
				str = str.replace(/Đ/g, "D");
				str = str.replace(
					/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
					" "
				);
				str = str.replace(/  +/g, " ");
				return str;
			}
			const fName = convert_vi_to_en(req.body.firstName).split(" ");
			const lName = convert_vi_to_en(req.body.lastName).split(" ");
			const birth = req.body.birth.split("-");
			const newBirth = `birth-${birth[2]}${birth[1]}${birth[0]}`;
			const date = new Date();
			const getDate = date.getDate();
			const getMonth = date.getMonth();
			const getYear = date.getFullYear();
			const dateNow = "createdAt-" + getDate + (getMonth + 1) + getYear;
			let aFName;
			let bFName = "";
			let aLName;
			let bLName = "";
			fName.forEach((e) => {
				aFName = e.split(",");
				bFName += aFName;
			});
			lName.forEach((el) => {
				aLName = el.split(", ");
				bLName += aLName;
			});
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
					departmentEng: dpmEng[0],
					position: req.body.position,
					positionEng: pstEng[0],
					description: req.body.description,
					account: req.body.account,
					password: bcrypt.hashSync(req.body.password, 8),
					role: "Người dùng",
					roleEng: 'user',
					image: {
						name: req.file.filename,
						url: req.file.path,
					},
				});
				let imgUser = user.image.name;
				let files = fs.readdirSync(appRoot + "/src/public/img/uploads/users/");
				files.filter((img) => {
					if (img === imgUser) {
						imgUser = `${req.file.fieldname
							}-${bFName.toLowerCase()}${bLName.toLowerCase()}-${newBirth}-${dateNow}-${Date.now()}${path.extname(
								req.file.originalname
							)}`;
						user.image.name = imgUser;
						user.image.url = `${appRoot}/src/public/img/uploads/users/${imgUser}`;
						fs.renameSync(
							`${appRoot}/src/public/img/uploads/users/${img}`,
							`${appRoot}/src/public/img/uploads/users/${imgUser}`
						);
					}
				});
				User.findOne({ account: req.body.account })
					.then((account) => {
						if (!account) {
							user.save();
						} else {
							user.account = user.account + Math.floor(Math.random() * 100);
							user.save();
						}
						res.redirect("back");
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
					departmentEng: dpmEng[0],
					position: req.body.position,
					positionEng: pstEng[0],
					description: req.body.description,
					account: req.body.account,
					password: bcrypt.hashSync(req.body.password, 8),
					role: "Người dùng",
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
							user.account = user.account + Math.floor(Math.random() * 100);
							user.save();
						}
						res.redirect("back");
					})
					.catch(next);
			}
		});
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
                let imgUser = user.image.name;
                let url = user.image.url
                let files = fs.readdirSync(
                    appRoot + "/src/public/img/uploads/users/"
                );
                files.filter((img) => {
                    if (img === imgUser) {
                        fs.unlinkSync(url);
                    }
                });
                req.session.message = {
                    type: 'danger',
                    intro: 'Chúc mừng! ',
                    message: 'Sửa thông tin thành công',
                }
                res.redirect("/god/user");
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
                    res.redirect("/god/user");
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
		Promise.all([Department.find({}).populate('positionID'), Position.find({})])
			.then(([departments, positions]) => {
				res.render("root/root-departments", {
					departments: multipleMongooseToObject(departments),
					positions: multipleMongooseToObject(positions),
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
