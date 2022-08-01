const Department = require("../models/Department");
const User = require("../models/User");
const Account = require("../models/Account");
const Role = require("../models/Role");
const Position = require("../models/Position");
const Status = require("../models/Status");
const ServiceNote = require("../models/ServiceNote");
const TypeService = require("../models/TypeService");
const Customer = require("../models/Customer")

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
    Promise.all([Customer.find({}), TypeService.find({}), Status.findById("62bdafa2c2815bf0e273e5a2"), User.find({ department: "Phẩu thuật" })])
      .then(([customers, typeservices, status, users]) => {
        res.render("admin/customer/admin-customer", {
          customers: multipleMongooseToObject(customers),
          typeservices: multipleMongooseToObject(typeservices),
          status: mongooseToObject(status),
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
          let url = user.image.url;
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

  getOneBusinessCustomer(req, res, next) {
    Customer.findById(req.params.id)
      .then((customer) => {
        let commnetArray = customer.comments;
        commnetArray.forEach((element) => {
          var date = new Date(element.createdAt);
          var newDate = date.toLocaleString("en-GB", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          });
          console.log("day", newDate);
          return newDate;
        });
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
    Promise.all([User.find({}), Department.find({}), Position.find({}), Role.find({})])
      .then(([users, departments, positions, roles]) => {
        res.render('admin/user/admin-user', {
          users: multipleMongooseToObject(users),
          departments: multipleMongooseToObject(departments),
          positions: multipleMongooseToObject(positions),
          roles: multipleMongooseToObject(roles),
        });
      })
      .catch(next);
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

  updateUser(req, res, next) {
    User.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('back'))
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
    Promise.all([ServiceNote.find({}), ServiceNote.countDocumentsDeleted({ stored:"Yes" })])
      .then(([serviceNotes,deletedCount]) => {
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
      ServiceNote.findByIdAndUpdate({ _id: req.params.id},{ $set: { stored: "Yes" }})])
			.then(() => res.redirect("back"))
			.catch(next);
	}

	realDestroyServiceNote(req, res, next) {
		ServiceNote.deleteOne({ _id: req.params.id })
			.then(() => res.redirect("back"))
			.catch(next);
	}

	trashServiceNote(req, res, next) {
		ServiceNote.findDeleted({ stored: "Yes"})
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
      ServiceNote.findByIdAndUpdate( { _id: req.params.id },{$set: { stored: "No" } })])
			.then(() => res.redirect("back"))
			.catch(next);

	}

  //END SERVICE NOTE



}

module.exports = new AdminController();
