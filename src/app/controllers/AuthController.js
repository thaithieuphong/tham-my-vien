// Xử lý các hành động đăng ký, đăng nhập và đăng nhập
const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const flash = require('connect-flash');


class AuthController {
    

    getRootLogin(req, res) {
        res.render('root/root-login');
    }

    postRootLogin(req, res, next) {
        User.findOne({account: req.body.account})
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
                
                req.session.token = accessToken;
                res.status(200).redirect(`/${user.roleEng}/dashboard`);
            })
            .catch(next);
    };

    //[GET] Login UI
	getLogin(req, res) {
		res.render("login", {layout: false});
	}

    // [POST] Login
    postLogin(req, res, next) {
        User.findOne({account: req.body.account})
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
                
                req.session.token = accessToken;
                res.status(200).redirect(`/${user.departmentEng}/${user.positionEng}`);
            })
            .catch(next);
    };

    changePassword(req, res, next) {
		User.findById({ _id: req.userId })
			.then((user) => {
				var result = bcrypt.compareSync(req.body.oldPass, user.password)
				if(result){
					User.findByIdAndUpdate({ _id: req.userId },{ password: bcrypt.hashSync(req.body.newPass, 8)})
						.then(() =>{
							res.redirect('/');
						})
				} else {
					res.redirect('back');
				}
			})
			.catch(next);
		// res.json(req.body);
	}

    // Logout
    logout = async (req, res, next) => {
        try {
            req.session = null;
            return res.status(200).redirect('/');
        } catch (err) {
            this.next(err);
        }
    };

    rootLogout = async (req, res, next) => {
        try {
            req.session = null;
            return res.status(200).redirect('/root');
        } catch (err) {
            this.next(err);
        }
    };
}

module.exports = new AuthController;