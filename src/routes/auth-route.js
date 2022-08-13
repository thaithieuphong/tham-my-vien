// [POST] Đăng ký, đăng nhập và đăng nhập

const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const controller = require("../app/controllers/AuthController");
const rootRouter = require("./root");
// const adminRouter = require("./admin");

const validateUploadImage = require('../middleware/validateUpload');
const AdminController = require('../app/controllers/AdminController')
const UserController = require('../app/controllers/operating-controller/NursingOperationRoomController.js')


/*Admin End*/
// [authJwt.verifyToken, authJwt.isBusinessEmploy]

router.post("/logout", controller.logout);
router.post("/", controller.postLogin); 
router.get('/', controller.getLogin);

module.exports = router;