const { mongooseToObject, multipleMongooseToObject } = require("../../../util/mongoose");
const User = require("../../models/User");
const fs = require("fs");
const appRoot = require("app-root-path");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const uploadAvatar = multer().single("image");
const helpers = require("../../../middleware/helpers");
const path = require("path");
const flash = require('connect-flash');

class EmployHRController {

    showUser(req, res, next) {
        User.find({})
            .then((users) => {
                res.render('human-resource/employ/hr-user', {
                    users: multipleMongooseToObject(users),
                    title: "Quản lý nhân sự"
                });
            })
            .catch(next);
    }

    createUser(req, res, next) {
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
                    res.redirect("back");
                })
                .catch(next);
        }
    }

    editUser(req, res, next){
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
                res.redirect("back");
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
                    res.redirect("back");
                })
                .catch(next);
        }
    }
}

module.exports = new EmployHRController();
