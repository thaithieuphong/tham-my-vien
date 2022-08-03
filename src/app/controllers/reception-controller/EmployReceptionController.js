const ServiceNote = require('../../models/ServiceNote');
const User = require('../../models/User');
const User1 = require('../../models/User');
const Recept = require('../../models/User');



const { mongooseToObject, multipleMongooseToObject } = require('../../../util/mongoose');



class ReceptionController {
    getReceptionDashboard(req, res) {
        res.render('reception/reception-overview');
    }

    showServiceNote(req, res, next) {
        Promise.all([Recept.findById({_id: req.userId}), ServiceNote.find({}).sort({ schedule: 1 }).populate('customerID').populate('createName'),
        User.find({ department: "Phẩu thuật", position: "Bác sĩ", $or: [{ state: "Medium" }, { state: null }]  }),
        User1.find({ department: "Phẩu thuật", $and:[{$or: [{ state: "Medium" }, { state: null }]},{ position: "Y tá" } ], $and:[{$or: [{ state: "Medium" }, { state: null }]},{ position: "Điều dưỡng" } ]})
        ])
            .then(([recept, serviceNotes, users, user1s]) => {
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
                    recept: mongooseToObject(recept),
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
                { $push: { performer: req.body.performer, nursing: req.body.nursing }, 
                $set: { stored: "No", status: "Đang xử lý", recept: req.userId, schedule: req.body.schedule } }),
            ServiceNote.delete({ _id: req.params.id }),
            // User.updateMany({ _id: { $in: req.body.performer}}, { $set: { state: "Busy" } }),
            // User1.updateMany({ _id: { $in: req.body.nursing}}, { $set: { state: "Busy" } })
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