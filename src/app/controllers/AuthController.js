// Xử lý các hành động đăng ký, đăng nhập và đăng nhập
const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const flash = require('connect-flash');


class AuthController {
    

    getRootLogin(req, res) {
        res.render('root/root-login', {layout: false});
    }

    getAdminLogin(req, res) {
        res.render('admin/admin-login');
    }

    getRootRegister(req, res) {
        Role.find({})
            .then(roles => {
                res.render('root/root-register', {
                    roles: multipleMongooseToObject(roles)
                });
            })
    }

    postRootRegister(req, res) {
        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            role: req.body.roleEngName,
        });

        if (req.body.roleEngName === '') {
            res.redirect('register');
        }
        if (req.body.roleEngName) {
            user.save((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                Role.find({ engName: req.body.roleEngName },
                    (err, role) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        user.role = role.map((role) => {
                            role.engname;
                        })
                        user.save((err) => {
                            res.redirect('user');
                        });
                    }
                    );
                
                })
        }
    }

    postRootLogin(req, res, next) {
        User.findOne({email: req.body.email})
            .then( user => {
                if (!next) {
                    res.status(500).json({ message: 'Đã có lỗi xảy ra tại máy chủ' });
                    return;
                }
                if (!user) {
                    return res.status(404).json({ message: "Không tìm thấy người dùng này" });
                }
                // so sánh password nhập vào với password trong db
                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );
                if (!passwordIsValid) {
                    return res.redirect('/');
                }
                var token = jwt.sign({ id: user._id, role: user.role }, process.env.SECURITY_KEY, {
                    expiresIn: '30s', // 30 giay
                });
                const { password, ...others } = user._doc;
                var authorities = [];
                authorities.push("ROLES_" + user.role.toUpperCase());
                req.session.token = token;
                // res.status(200).json({...others, token});
                res.status(200).render('root/root', {
                    id: user._id,
                    userName: user.userName,
                    email: user.email,
                    role: authorities,
                    token: accesstoken
                });
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
}

module.exports = new AuthController;