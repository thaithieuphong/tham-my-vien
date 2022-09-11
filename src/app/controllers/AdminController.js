const ServiceNote = require("../models/ServiceNote");
const Customer = require("../models/Customer")
const User = require("../models/User");
const path = require('path');
const rootPath = path.sep;
const Reexamination = require('../models/Reexamination');

const {
	multipleMongooseToObject,
	mongooseToObject,
} = require("../../util/mongoose");

class AdminController {

	getAdminProfile(req, res, next) {
		User.findById({ _id: req.userId })
			.then(user => {
				res.render('profile', {
					user: mongooseToObject(user),
					title: 'Thông tin cá nhân'
				})
			})
			.catch(next);
	}

	getAdminLogin(req, res, next) {
		res.render("admin/admin-login");
	}

	postAdminLogin(req, res, next) {
        User.findOne({ account: req.body.account })
            .then( user => {
                if (!next) {
                    req.flash('messages_server_failure', 'Đã có lỗi xảy ra tại máy chủ');
                    res.render('/err/500');
                }
                if (!user) {
                    req.flash('messages_account_failure', 'Tài khoản không tồn tại');
					res.redirect('back');
                }
                // so sánh password nhập vào với password trong db
                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );
                if (!passwordIsValid) {
                    req.flash('messages_password_failure', 'Mật khẩu không đúng');
					res.redirect('back');
                }
                const accessToken = jwt.sign({ 
                    id: user._id,
                    role: user.role,
                    department: user.department,
                    position: user.position,
                    
                }, process.env.ACCESSTOKEN_KEY, {
                    expiresIn: 3600, // 10p
                });

                const refreshToken = jwt.sign({
                    id: user._id,
                    role: user.role,
                    department: user.department,
                    position: user.position
                }, process.env.REFRESHTOKEN_KEY, {
                    expiresIn: 31536000, // 24 giờ
                })
                
                req.session = {
                    token: accessToken,
                    secure: true
                };
                res.status(200).redirect(`/${user.roleEng}/dashboard`);
            })
            .catch(next);
    };

	//CUSTOMER
	getAdminCustomer(req, res, next) {
		Customer.find().populate('userID')
			.then(customers => {
				res.render("admin/customer/admin-customer", {
					customers: multipleMongooseToObject(customers),
					title: 'Quản lý khách hàng'
				});
			})
			.catch(next);
	}

	deleteCustomer(req, res, next) {
		Promise.all([ServiceNote.delete({ customerID: req.params.id }), Reexamination.delete({ customerID: req.params.id }), Customer.delete({ _id: req.params.id }).populate('userID')])
			.then(() => {
				res.redirect('back');
			})
	}

	getAdminCustomerDetail(req, res, next) {
		Customer.findById(req.params.id).populate('serviceNoteID').populate('reexamID')
			.then((customer) => {
				res.render("admin/customer/admin-customer-detail", {
					customer: mongooseToObject(customer),
					title: 'Thông tin khách hàng'
				});
			})
			.catch(next);
	}
	//END CUSTOMER

	//RE-EXAMINATION
	getAdminReExamination(req, res, next) {
		Reexamination.find({}).populate('customerID')
			.then((reExaminations) => {
				res.render('admin/re-examination/admin-re-examination', {
					reExaminations: multipleMongooseToObject(reExaminations),
					title: 'Phiếu tái khám'
				});
			})
			.catch(next);
	}

	getAdminReExaminationDetail(req, res, next) {
		Reexamination.findById({ _id: req.params.id }).populate('customerID').populate('serviceNoteId').populate('createName').populate('performer').populate('nursing').populate('recept')
		.then(reExamination => {
			if (reExamination.status === 'Tạo mới') {
				let reExaminationData = {
					reExaminationId: reExamination._id,
					customerId: reExamination.customerID._id,
					customerFullName: `${reExamination.customerID.firstName} ${reExamination.customerID.lastName}`,
					customerDescription: reExamination.customerID.description,
					customerComments: multipleMongooseToObject(reExamination.customerID.comments),
					createNameId: reExamination.createName._id,
					createNameFullName: `${reExamination.createName.firstName} ${reExamination.createName.lastName}`,
					createNameDepartment: reExamination.createName.department,
					createNamePosition: reExamination.createName.position,
					performers: multipleMongooseToObject(reExamination.performer),
					nursings: multipleMongooseToObject(reExamination.nursing),
					status: reExamination.status,
					service: reExamination.serviceNoteId.service,
					counselorImg: reExamination.serviceNoteId.counselorImg,
					counselorVideo: reExamination.serviceNoteId.counselorVideo,
					beforeImg: reExamination.serviceNoteId.beforeImg,
					beforeVideo: reExamination.serviceNoteId.beforeVideo,
					afterImg: reExamination.serviceNoteId.afterImg,
					afterVideo: reExamination.serviceNoteId.afterVideo,
					reExamImg: reExamination.reExamImg,
					reExamVideo: reExamination.reExamVideo,
					comments: multipleMongooseToObject(reExamination.comments),
					stepsToTake: reExamination.stepsToTake,
					schedule: reExamination.schedule,
					price: reExamination.price,
					createdAt: reExamination.createdAt,
					updatedAt: reExamination.updatedAt,
					receptId: '',
					receptFullName: '',
					receptDepartment: '',
					receptPosition: '',
					stored: reExamination.stored
				}
				res.render('admin/re-examination/admin-re-examination-detail', {
					reExamination: reExaminationData,
					title: 'Chi tiết phiếu tái khám'
				})
			} else {
				let reExaminationData = {
					reExaminationId: reExamination._id,
					customerId: reExamination.customerID._id,
					customerFullName: `${reExamination.customerID.firstName} ${reExamination.customerID.lastName}`,
					customerDescription: reExamination.customerID.description,
					customerComments: multipleMongooseToObject(reExamination.customerID.comments),
					createNameId: reExamination.createName._id,
					createNameFullName: `${reExamination.createName.firstName} ${reExamination.createName.lastName}`,
					createNameDepartment: reExamination.createName.department,
					createNamePosition: reExamination.createName.position,
					performers: multipleMongooseToObject(reExamination.performer),
					nursings: multipleMongooseToObject(reExamination.nursing),
					status: reExamination.status,
					service: reExamination.serviceNoteId.service,
					counselorImg: reExamination.serviceNoteId.counselorImg,
					counselorVideo: reExamination.serviceNoteId.counselorVideo,
					beforeImg: reExamination.serviceNoteId.beforeImg,
					beforeVideo: reExamination.serviceNoteId.beforeVideo,
					afterImg: reExamination.serviceNoteId.afterImg,
					afterVideo: reExamination.serviceNoteId.afterVideo,
					reExamImg: reExamination.reExamImg,
					reExamVideo: reExamination.reExamVideo,
					comments: multipleMongooseToObject(reExamination.comments),
					stepsToTake: reExamination.stepsToTake,
					schedule: reExamination.schedule,
					price: reExamination.price,
					createdAt: reExamination.createdAt,
					updatedAt: reExamination.updatedAt,
					receptId: reExamination.recept._id,
					receptFullName: `${reExamination.recept.firstName} ${reExamination.recept.lastName}`,
					receptDepartment: reExamination.recept.department,
					receptPosition: reExamination.recept.position,
					stored: reExamination.stored
				}
				res.render('admin/re-examination/admin-re-examination-detail', {
					reExamination: reExaminationData,
					title: 'Chi tiết phiếu tái khám'
				})
			}
		})
	}

	deleteReExamination(req, res, next) {
		Reexamination.delete({ _id: req.params.id })
			.then(() => res.redirect("back"))
			.catch(next);
	}

	//SERVICE NOTE

	deleteServiceNote(req, res, next) {
		Promise.all([Reexamination.delete({ serviceNoteId: req.params.id }), ServiceNote.delete({ _id: req.params.id }),
		ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $set: { stored: "Yes" } })])
			.then(() => res.redirect("back"))
			.catch(next);
	}

	//PATCH RESTORE
	restoreServiceNote(req, res, next) {
		Promise.all([ServiceNote.restore({ _id: req.params.id }),
		ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $set: { stored: "No" } })])
			.then(() => res.redirect("back"))
			.catch(next);

	}

	getAdminServiceNote(req, res, next) {
		ServiceNote.find({}).populate('customerID')
			.then((serviceNotes) => {
				res.render('admin/service-note/admin-service-note', {
					serviceNotes: multipleMongooseToObject(serviceNotes),
					title: 'Danh sách phiếu dịch vụ'
				})
			})
			.catch(next)
	}

	getAdminServiceNoteDetail(req, res, next) {
		ServiceNote.findById({ _id: req.params.id }).populate('customerID').populate('createName').populate('performer').populate('nursing').populate('recept')
			.then(serviceNote => {
				if (serviceNote.status === 'Tạo mới') {
					let serviceNoteData = {
						serviceNoteId: serviceNote._id,
						customerId: serviceNote.customerID._id,
						customerFullName: `${serviceNote.customerID.firstName} ${serviceNote.customerID.lastName}`,
						customerDescription: serviceNote.customerID.description,
						customerComments: multipleMongooseToObject(serviceNote.customerID.comments),
						createNameId: serviceNote.createName._id,
						createNameFullName: `${serviceNote.createName.firstName} ${serviceNote.createName.lastName}`,
						createNameDepartment: serviceNote.createName.department,
						createNamePosition: serviceNote.createName.position,
						performers: multipleMongooseToObject(serviceNote.performer),
						nursings: multipleMongooseToObject(serviceNote.nursing),
						status: serviceNote.status,
						service: serviceNote.service,
						counselorImg: serviceNote.counselorImg,
						counselorVideo: serviceNote.counselorVideo,
						beforeImg: serviceNote.beforeImg,
						beforeVideo: serviceNote.beforeVideo,
						afterImg: serviceNote.afterImg,
						afterVideo: serviceNote.afterVideo,
						comments: multipleMongooseToObject(serviceNote.comments),
						stepsToTake: serviceNote.stepsToTake,
						schedule: serviceNote.schedule,
						price: serviceNote.price,
						createdAt: serviceNote.createdAt,
						updatedAt: serviceNote.updatedAt,
						receptId: '',
						receptFullName: '',
						receptDepartment: '',
						receptPosition: '',
						stored: serviceNote.stored
					}
					res.render('admin/service-note/admin-service-note-detail', {
						serviceNote: serviceNoteData,
						title: 'Chi tiết phiếu dịch vụ'
					})
				} else {
					let serviceNoteData = {
						serviceNoteId: serviceNote._id,
						customerId: serviceNote.customerID._id,
						customerFullName: `${serviceNote.customerID.firstName} ${serviceNote.customerID.lastName}`,
						customerDescription: serviceNote.customerID.description,
						customerComments: multipleMongooseToObject(serviceNote.customerID.comments),
						createNameId: serviceNote.createName._id,
						createNameFullName: `${serviceNote.createName.firstName} ${serviceNote.createName.lastName}`,
						createNameDepartment: serviceNote.createName.department,
						createNamePosition: serviceNote.createName.position,
						performers: multipleMongooseToObject(serviceNote.performer),
						nursings: multipleMongooseToObject(serviceNote.nursing),
						status: serviceNote.status,
						service: serviceNote.service,
						counselorImg: serviceNote.counselorImg,
						counselorVideo: serviceNote.counselorVideo,
						beforeImg: serviceNote.beforeImg,
						beforeVideo: serviceNote.beforeVideo,
						afterImg: serviceNote.afterImg,
						afterVideo: serviceNote.afterVideo,
						comments: multipleMongooseToObject(serviceNote.comments),
						stepsToTake: serviceNote.stepsToTake,
						schedule: serviceNote.schedule,
						price: serviceNote.price,
						createdAt: serviceNote.createdAt,
						updatedAt: serviceNote.updatedAt,
						receptId: serviceNote.recept._id,
						receptFullName: `${serviceNote.recept.firstName} ${serviceNote.recept.lastName}`,
						receptDepartment: serviceNote.recept.department,
						receptPosition: serviceNote.recept.position,
						stored: serviceNote.stored
					}
					res.render('admin/service-note/admin-service-note-detail', {
						serviceNote: serviceNoteData,
						title: 'Chi tiết phiếu dịch vụ'
					})
				}
			})
	}

	//END SERVICE NOTE
}

module.exports = new AdminController();
