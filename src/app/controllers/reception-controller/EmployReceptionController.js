const ServiceNote = require('../../models/ServiceNote');
const User = require('../../models/User');
const User1 = require('../../models/User');
const User2 = require('../../models/User');
const Reexamination = require('../../models/Reexamination');
const bcrypt = require("bcryptjs");



const { mongooseToObject, multipleMongooseToObject } = require('../../../util/mongoose');



class ReceptionController {

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

    showServiceNote(req, res, next) {
        Promise.all([User.findById({ _id: req.userId }),
        ServiceNote.find({ stored: null }).sort({ schedule: 1 }).populate('customerID').populate('createName'),
        User1.find({ department: "Phẩu thuật", positionEng: "doctor", $or: [{ state: "Medium" }, { state: null }] }),
        User2.find({ department: "Phẩu thuật", $or: [{ $and: [{ $or: [{ state: "Medium" }, { state: null }] }, { positionEng: "nurse" }] }, { $and: [{ $or: [{ state: "Medium" }, { state: null }] }, { positionEng: "nursing" }] }] })
        ])
            .then(([user, serviceNotes, user1s, user2s]) => {
                res.render('reception/employ/reception-schedule', {
                    user: mongooseToObject(user),
                    serviceNotes: multipleMongooseToObject(serviceNotes),
                    user1s: multipleMongooseToObject(user1s),
                    user2s: multipleMongooseToObject(user2s),
                    title: "Quản lý dịch vụ"
                });

            })
            .catch(next);
    }

    showReExam(req, res, next) {
        Promise.all([User.findById({ _id: req.userId }),
        Reexamination.find({ stored: null }).sort({ schedule: 1 }).populate('customerID').populate('createName').populate('serviceNoteId'),
        User1.find({ department: "Phẩu thuật", positionEng: "doctor", $or: [{ state: "Medium" }, { state: null }] }),
        User2.find({ department: "Phẩu thuật", $or: [{ $and: [{ $or: [{ state: "Medium" }, { state: null }] }, { positionEng: "nurse" }] }, { $and: [{ $or: [{ state: "Medium" }, { state: null }] }, { positionEng: "nursing" }] }] })
        ])
            .then(([user, reexams, user1s, user2s]) => {
                res.render('reception/employ/reception-schedule-re-exam', {
                    user: mongooseToObject(user),
                    reexams: multipleMongooseToObject(reexams),
                    user1s: multipleMongooseToObject(user1s),
                    user2s: multipleMongooseToObject(user2s),
                    title: "Quản lý dịch vụ"
                });

            })
    }

    pushPerformer(req, res, next) {
        console.log(req.body);
        Promise.all([
            ServiceNote.findByIdAndUpdate({ _id: req.params.id },
                {
                    $push: { performer: req.body.performer, nursing: req.body.nursing },
                    $set: { stored: "No", status: "Đang xử lý", recept: req.userId, schedule: req.body.schedule }
                }),
        ])
            .then(() => {

                res.redirect("back")
            })
            .catch(next);
        // res.json(req.body);
        // res.json(req.body)

    }

    pushOperationToReexam(req, res, next) {
        Reexamination.findByIdAndUpdate({ _id: req.params.id },
            {
                $push: { performer: req.body.performer, nursing: req.body.nursing },
                $set: { stored: "No", status: "Đang xử lý", recept: req.userId, schedule: req.body.schedule }
            })
            .then(() => {
                res.redirect("back")
            })
            .catch(next);
        // res.json(req.body)
    }

};


module.exports = new ReceptionController;