// [POST] Đăng ký, đăng nhập và đăng nhập

const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const controller = require("../app/controllers/AuthController");
const rootRouter = require("./root");
// const adminRouter = require("./admin");

const validateUploadImage = require('../middleware/validateUploadImage');
const AdminController = require('../app/controllers/AdminController')
const UserController = require('../app/controllers/operating-controller/NursingOperationRoomController.js')


router.get("/root", rootRouter);

router.get("/user/customers", UserController.getUserCustomer)
router.post("/user/customers", UserController.createCustomer)

/*Amin Start*/
router.get("/admin",  AdminController.getAdminDashboard);

router.get('/admin/customers', AdminController.getAdminCustomer)
router.post('/admin/customers', AdminController.createCustomer)
router.get('/admin/service-note', AdminController.showServiceNote);
router.post('/admin/customers/:id/service-note', AdminController.createServiceNote);
router.get('/admin/customers/:id/detail', AdminController.getOneBusinessCustomer)
router.patch('/admin/customers/:id/comment', AdminController.createComment)
router.put('/admin/customers/:id', validateUploadImage.uploadSingleCustomer, AdminController.editCustomer);


router.delete('/admin/service-note/:id', AdminController.destroyServiceNote);
router.patch('/admin/service-note/:id', AdminController.destroyServiceNote);
router.get('/admin/service-note/trash', AdminController.trashServiceNote);
router.delete('/admin/service-note-trash/:id', AdminController.realDestroyServiceNote);
router.patch('/admin/service-note-trash/:id/restore', AdminController.restoreServiceNote);
/*Admin End*/
// [authJwt.verifyToken, authJwt.isBusinessEmploy]

router.post("/logout", controller.logout);
router.post("/", controller.postLogin);
router.get('/', controller.getLogin);

module.exports = router;