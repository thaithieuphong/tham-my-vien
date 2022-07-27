const User = require("../../models/User");
const Department = require("../../models/Department");
const Position = require("../../models/Position");
const {
	mongooseToObject,
	multipleMongooseToObject,
} = require("../../../util/mongoose");
const appRoot = require("app-root-path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const path = require("path");

class HRController {
	showDashboard(req, res) {
		res.render("human-resource/manager/manager-overview");
	}

	showUsers(req, res, next) {
		Promise.all([
			User.findById({ _id: req.userId }),
			User.find({}),
			Department.find({}),
			Position.find({}),
		])
			.then(([user, users, departments, positions]) => {
				res.render("human-resources/manager/manager-users", {
					user: mongooseToObject(user),
					users: multipleMongooseToObject(users),
					departments: multipleMongooseToObject(departments),
					positions: multipleMongooseToObject(positions),
					title: "Quan ly nhan su",
				});
			})
			.catch(next);
	}

	createUser(req, res, next) {
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
			const userBirth = `${birth[2]}-${birth[1]}-${birth[0]}`;
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
					birth: userBirth,
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
							appRoot + `/src/public/img/uploads/users/${img}`,
							appRoot + `/src/public/img/uploads/users/${imgUser}`
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
					birth: userBirth,
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

	editUser(req, res, next) {
		Promise.all([
			Department.find({ name: req.body.department }),
			Position.find({ name: req.body.position }),
		])
			.then(([department, position]) => {
				const editDpmEng = department.map(
					(departmentEng) => departmentEng.engName
				);
				const editPstEng = position.map((positionEng) => positionEng.engName);
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
				const birth = req.body.birth.split("-");
				const userBirth = `${birth[2]}-${birth[1]}-${birth[0]}`;
				if (req.file) {
					User.findOneAndUpdate(
						{ _id: req.params.id },
						{
							birth: userBirth,
							gender: req.body.gender,
							phone: req.body.phone,
							email: req.body.email,
							department: req.body.department,
							departmentEng: editDpmEng[0],
							position: req.body.position,
							positionEng: editPstEng[0],
							address: req.body.address,
							description: req.body.description,
							image: {
								name: req.file.filename,
								url: req.file.path,
							},
						}
					)
						.then((user) => {
							const birth = user.birth.split("-");
							const formatBirth = `birth-${birth[2]}${birth[1]}${birth[0]}`;
							const date = new Date();
							const getDate = date.getDate();
							const getMonth = date.getMonth();
							const getYear = date.getFullYear();
							const dateNow = `createdAt-${getDate}${getMonth + 1}${getYear}`;
							const fName = convert_vi_to_en(user.firstName).split(" ");
							const lName = convert_vi_to_en(user.lastName).split(" ");
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
							let imgUser = user.image.name;
							let url = user.image.url;
							let files = fs.readdirSync(
								appRoot + "/src/public/img/uploads/users/"
							);
							files.filter((img) => {
								if (img === imgUser) {
									let newImgUser = `${req.file.fieldname
										}-${bFName.toLowerCase()}${bLName.toLowerCase()}-${formatBirth}-${dateNow}-${Date.now()}${path.extname(
											req.file.originalname
										)}`;
									user.image.name = newImgUser;
									user.image.url = `${appRoot}/src/public/img/uploads/users/${newImgUser}`;
									fs.unlinkSync(
										appRoot + `/src/public/img/uploads/users/${img}`
									);
								}
							});
							res.redirect("back");
						})
						.catch(next);
				} else {
					console.log(req.file);
					User.updateOne(
						{ _id: req.params.id },
						{
							birth: req.body.birth,
							gender: req.body.gender,
							phone: req.body.phone,
							email: req.body.email,
							department: req.body.department,
							departmentEng: editDpmEng[0],
							position: req.body.position,
							positionEng: editPstEng[0],
							address: req.body.address,
							description: req.body.description,
							image: {
								name: "",
								url: "",
							},
						}
					)
						.then(() => {
							res.redirect("back");
						})
						.catch(next);
				}
			})
			.catch(next);
	}

	deleteUser(req, res, next) {
		User.findById({ _id: req.params.id })
			.then((user) => {
				let imgUser = user.image.name;
				let url = user.image.url;
				let files = fs.readdirSync(
					appRoot + "/src/public/img/uploads/users/"
				);
				files.filter((img) => {
					if (img === imgUser) {
						fs.unlinkSync(url);
					}
				});
				// console.log(appRoot)
				user.delete();
				res.redirect('back');
			})
			.catch(next)
	}
}

module.exports = new HRController();
