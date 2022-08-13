const Department = require("../models/Department");
const User = require("../models/User");
const User1 = require("../models/User");
const Account = require("../models/Account");
const Role = require("../models/Role");
const Position = require("../models/Position");
const Status = require("../models/Status");
const ServiceNote = require("../models/ServiceNote");
const TypeService = require("../models/TypeService");
const Customer = require("../models/Customer")
const appRoot = require('app-root-path');

const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");
var bcrypt = require("bcryptjs");

class AdminController {

  getAdminDashboard(req, res, next) {
    res.render("admin/admin-login");
  }

  //CUSTOMER
  getAdminCustomer(req, res, next) {
    Promise.all([Customer.find({userID: null}), Customer.find({ userID: { $exists: true }}).populate('userID'), TypeService.find({}), User.find({ department: "Phẩu thuật" })])
      .then(([customers, customer1s, typeservices, users]) => {
        res.render("admin/customer/admin-customer", {
          customers: multipleMongooseToObject(customers),
          customer1s: multipleMongooseToObject(customer1s),
          typeservices: multipleMongooseToObject(typeservices),
          users: multipleMongooseToObject(users),
          title: 'Quản lý khách hàng'
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
        description: req.body.description,
        image: {
          name: req.file.filename,
          url: req.file.path,
        },
      });
      console.log(req.body.firstName);
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
      console.log(req.body.firstName);
      customer.save();
    }
    res.redirect("back");
  }

  editCustomer(req, res, next) {
    // if (req.file) {
		// 	Customer.findOneAndUpdate(
		// 		{ _id: req.params.id },
		// 		{
		// 			firstName: req.body.firstName,
		// 			lastName: req.body.lastName,
		// 			birth: req.body.birth,
		// 			gender: req.body.gender,
		// 			phone: req.body.phone,
		// 			email: req.body.email,
		// 			address: req.body.address,
		// 			description: req.body.description,
		// 			image: {
		// 				name: req.file.filename,
		// 				url: req.file.path,
		// 			},
		// 		}
		// 	)
		// 		.then((customer) => {
		// 			// console.log(customer.image.name);
		// 			let imgCustomer = customer.image.name;
		// 			let url = customer.image.url;
		// 			let files = fs.readdirSync(
		// 				appRoot + "/src/public/img/uploads/customers/"
		// 			);
		// 			files.filter((img) => {
		// 				if (img === imgCustomer) {
		// 					console.log("img user", img);
		// 					fs.unlinkSync(url);
		// 				}
		// 			});
		// 			res.redirect("back");
		// 		})
		// 		.catch(next);
		// } else {
		// 	console.log(req.file);
		// 	Customer.updateOne({ _id: req.params.id }, req.body)
		// 		.then((customer) => {
		// 			res.redirect("back");
		// 		})
		// 		.catch(next);
		// }
    res.json(req.file)
  }

  getOneAdminCustomer(req, res, next) {
    Customer.findById(req.params.id)
      .then((customer) => {
        res.render("admin/customer/admin-customer-detail", {
          customer: mongooseToObject(customer)
        });
      })
      .catch(next);
  }

  createComment(req, res, next) {
    Customer.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { comments: { comment: req.body.comments } } }
    )
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //END CUSTOMER

  //USER
  getAdminUser(req, res, next) {
    Promise.all([User.find({ departmentEng: "business" }), User.find({ departmentEng: "marketing" }),
    User.find({ departmentEng: "human-resources" }), User.find({ departmentEng: "it" }),
    User.find({ departmentEng: "reception" }), User.find({ departmentEng: "operating-room" }),
    Department.find({}), Position.find({}), Role.find({})
    ])
      .then(([users, user1s, user2s, user3s, user4s, user5s, departments, positions, roles]) => {
        res.render('admin/user/admin-user', {
          users: multipleMongooseToObject(users),
          user1s: multipleMongooseToObject(user1s),
          user2s: multipleMongooseToObject(user2s),
          user3s: multipleMongooseToObject(user3s),
          user4s: multipleMongooseToObject(user4s),
          user5s: multipleMongooseToObject(user5s),
          departments: multipleMongooseToObject(departments),
          positions: multipleMongooseToObject(positions),
          roles: multipleMongooseToObject(roles),
        });
      })
      .catch(next);
  }

  getAdminUserEdit(req, res, next) {
    Promise.all([
      User.findById({ _id: req.params.id }),
      Department.find({}),
      Position.find({})
    ])
      .then(([user, departments, positions]) => {
        res.render('admin/user/admin-useredit', {
          user: mongooseToObject(user),
          departments: multipleMongooseToObject(departments),
          positions: multipleMongooseToObject(positions),
        });
      })
      .catch(next)
  }

  createUser(req, res, next) {
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
    });
    user.save()
      .then(() => res.redirect('user'))
      .catch(next)
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
          User.findByIdAndUpdate(
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
              res.redirect('/admin/user');
            })
            .catch(next);
        } else {
          User.findByIdAndUpdate(
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
              res.redirect('/admin/user');
            })
            .catch(next);
        }
      })
      .catch(next);
  }

  destroyUser(req, res, next) {
    User.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next)
  }
  //END USER

  //DEPARTMENT
  getAdminDepartment(req, res, next) {
    Department.find({})
      .then(departments => {
        res.render("admin/department/admin-department", {
          departments: multipleMongooseToObject(departments)
        });
      })
      .catch(next);
  }

  createDepartment(req, res, next) {
    const department = new Department(req.body);
    department.save()
      .then(() => res.redirect('department'))
      .catch(next)
  }

  updateDepartment(req, res, next) {
    Department.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('back'))
      .catch(next);
  }

  destroyDepartment(req, res, next) {
    Department.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next)
  }


  //END DEPARTMENT

  //ACCOUNT
  getAdminAccount(req, res, next) {
    Promise.all([Account.find({}), User.find({}), Position.find({}), Role.find({})])
      .then(([accounts, users, positions, roles]) => {
        res.render('admin/account/admin-account', {
          accounts: multipleMongooseToObject(accounts),
          users: multipleMongooseToObject(users),
          positions: multipleMongooseToObject(positions),
          roles: multipleMongooseToObject(roles),
        });
      })
      .catch(next);
  }

  createAccount(req, res, next) {
    const account = new Account({
      userName: req.body.userName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      role_id: req.body.roleId
    });
    // save user into db
    account.save((err, account) => {
      // check error
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        console.log('2', req.body.roleId)
        Role.find(
          {
            _id: { $in: req.body.roleId },
          },
          (err, role) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            console.log('account.role', account.role_id);
            account.role_id = role.map((role) => role._id);
            account.save((err) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              res.redirect('account');
              return;
            });
          }
        );
      }
    });
  }

  editAccount(req, res, next) {
    Account.findById(req.params.id)
      .then(account => res.render('admin/admin-accountedit', {
        account: mongooseToObject(account)
      }))
      .catch(next);
  }

  updateAccount(req, res, next) {
    Account.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/admin/account'))
      .catch(next);
  }
  //END ACCOUNT

  //ROLES
  getAdminRole(req, res, next) {
    Role.find({})
      .then(roles => {
        res.render("admin/role/admin-role", {
          roles: multipleMongooseToObject(roles)
        });
      })
      .catch(next);
  }
  //END ROLES

  //POSITION
  getAdminPosition(req, res, next) {
    Position.find({})
      .then(positions => {
        res.render("admin/position/admin-position", {
          positions: multipleMongooseToObject(positions)
        });
      })
      .catch(next);
  }

  createPosition(req, res, next) {
    const position = new Position(req.body);
    position.save()
      .then(() => res.redirect('position'))
      .catch(next)
  }

  editPosition(req, res, next) {
    Position.findById(req.params.id)
      .then(position => res.render('admin/admin-positionedit', {
        position: mongooseToObject(position)
      }))
      .catch(next);
  }

  updatePosition(req, res, next) {
    Position.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/admin/position'))
      .catch(next);
  }
  //END POSITION


  //SERVICE NOTE
  showServiceNote(req, res, next) {
    Promise.all([ServiceNote.find({}), ServiceNote.countDocumentsDeleted({ stored: "Yes" })])
      .then(([serviceNotes, deletedCount]) => {
        res.render('admin/service-note/admin-service-note', {
          deletedCount,
          serviceNotes: multipleMongooseToObject(serviceNotes)
        });
      })
      .catch(next);
  }

  createServiceNote(req, res, next) {
    const serviceNote = new ServiceNote({
      customer: {
        name: req.body.name,
        birth: req.body.birth,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
      },
      createName: req.body.name,
      status: req.body.status,
      service: req.body.service,
      comments: { comment: req.body.comment },
      schedule: req.body.schedule,
    });
    serviceNote.save();
    res.redirect('back');
  }

  destroyServiceNote(req, res, next) {
    Promise.all([ServiceNote.delete({ _id: req.params.id }),
    ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $set: { stored: "Yes" } })])
      .then(() => res.redirect("back"))
      .catch(next);
  }

  realDestroyServiceNote(req, res, next) {
    ServiceNote.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  trashServiceNote(req, res, next) {
    ServiceNote.findDeleted({ stored: "Yes" })
      .then(serviceNotes => {
        res.render('admin/service-note/admin-service-note-trash', {
          serviceNotes: multipleMongooseToObject(serviceNotes)
        });
      })
      .catch(next);
  }
  //PATCH RESTORE
  restoreServiceNote(req, res, next) {
    Promise.all([ServiceNote.restore({ _id: req.params.id }),
    ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $set: { stored: "No" } })])
      .then(() => res.redirect("back"))
      .catch(next);

  }

  //END SERVICE NOTE



}

module.exports = new AdminController();
