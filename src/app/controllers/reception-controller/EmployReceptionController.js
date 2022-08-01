const ServiceNote = require('../../models/ServiceNote');
const User = require('../../models/User');
const User1 = require('../../models/User');

const { mongooseToObject, multipleMongooseToObject } = require('../../../util/mongoose');



class ReceptionController {
    getReceptionDashboard(req, res) {
        res.render('reception/reception-overview');
    }

    showServiceNote(req, res, next) {
        Promise.all([ServiceNote.find({}).sort({ schedule: 1 }),
        User.find({ department: "Phẩu thuật", position: "Bác sĩ" }),
        User1.find({ department: "Phẩu thuật", $or: [{ position: "Y tá" }, { position: "Điều dưỡng" }] })
        ])
            .then(([serviceNotes, users, user1s]) => {
                let commnetArray = serviceNotes;
                commnetArray.forEach((element) => {
                    var date = new Date(element.schedule);
                    var newDate = date.toLocaleString("en-GB", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                    });
                    console.log(newDate);
                    return newDate;
                })
                res.render('reception/employ/reception-schedule', {
                    serviceNotes: multipleMongooseToObject(serviceNotes),
                    users: multipleMongooseToObject(users),
                    user1s: multipleMongooseToObject(user1s),
                    title: "Quản lý dịch vụ"
                });

            })
            .catch(next);
    }

    pushPerformer(req, res, next) {
        console.log(req.body);
        Promise.all([
            ServiceNote.findByIdAndUpdate({ _id: req.params.id },
                { $push: { performer: req.body.performer, nursing: req.body.nursing }, $set: { stored: "No" } }),
            ServiceNote.delete({ _id: req.params.id }),
            User.updateMany({ _id: { $in: req.body.userid }}, { $set: { state: "Busy" } })
        ])
            .then(([serviceNote, users]) => {
                console.log(serviceNote);

                res.redirect("back")
            })
            .catch(next);
        // res.json(req.body);
    }


};


module.exports = new ReceptionController;