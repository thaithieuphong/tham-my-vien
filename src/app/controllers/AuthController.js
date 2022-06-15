// Xử lý các hành động đăng ký, đăng nhập và đăng nhập
const config = require("../../config/auth");
const Account = require('../models/Account');
const Role = require('../models/Role');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { multipleMongooseToObject } = require('../../util/mongoose');


class AuthController {
    //[GET] Login
	getSignin(req, res) {
		res.render("signin", { layout: false });
	}

    getSignup(req, res, next) {
        Role.find({})
			.then(roles => {
				res.render('signup', {
					roles: multipleMongooseToObject(roles),
				});
			})
			.catch(next);
	}

    // Signup
    signup = (req, res) => {
        
        const account = new Account({
            userName: req.body.userName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            role: { $in: req.body._id }
        });
        account.save((err, account) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.redirect('/signin');
            // if (req.body.role) {
            //     Role.find(
            //         {
            //             name: { $in: req.body.role },
            //         },
            //         (err, role) => {
            //             if (err) {
            //                 res.status(500).send({ message: err });
            //                 return;
            //             }
            //             account.role = role.map((role) => role._id);
            //             account.save((err) => {
            //                 if (err) {
            //                     res.status(500).send({ message: err });
            //                     return;
            //                 }
            //                 res.send({ message: "User was registered successfully!" });
            //             });
            //         }
            //     );
            // } else {
            //     Role.findOne({ name: "manager" }, (err, role) => {
            //         if (err) {
            //             res.status(500).send({ message: err });
            //             return;
            //         }
            //         account.role = [role._id];
            //         account.save((err) => {
            //             if (err) {
            //                 res.status(500).send({ message: err });
            //                 return;
            //             }
            //             res.send({ message: "User was registered successfully!" });
            //         });
            //     });
            // }
        });
    };

    // Signin
    signin = (req, res, next) => {
        Account.findOne({
            email: req.body.email,
        })
		// .populate("roles", "-__v")
		.then( account => {
            console.log(account);
            // if (err) {
            //     res.status(500).send({ message: 'Bi loi roi' });
            //     return;
            // }
            if (!account) {
                return res.status(404).send({ message: "User Not found." });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                account.password
            );
            console.log(req.body.password)
            if (!passwordIsValid) {
                return res.status(401).send({ message: "Invalid Password!" });
            }
            var token = jwt.sign({ id: account._id }, config.secret, {
                expiresIn: 86400, // 24 hours
            });
            // var authorities = [];
            // for (let i = 0; i < account.role.length; i++) {
            //     authorities.push("ROLE_" + account.role[i].roleName.toUpperCase());
            // }
            req.session.token = token;
            res.status(200).render('root', {
                id: account._id,
                userName: account.userName,
                email: account.email,
                // role: authorities,
            });
        })
        .catch(next);
    };

    // Signout
    signout = async (req, res) => {
        try {
            req.session = null;
            return res.status(200).send({ message: "You've been signed out!" });
        } catch (err) {
            this.next(err);
        }
    };
}

module.exports = new AuthController;