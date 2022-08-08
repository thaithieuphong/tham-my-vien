const express = require('express');
const ManagerBusinessController = require('../../app/controllers/business-controller/ManagerBusinessController');
const router = express.Router();
const validateUploadImage = require('../../middleware/validateUpload');
const authJwt = require('../../middleware/authJwt');

/* Business Manager Start*/
router.patch('/customers/:id/comment', [authJwt.verifyToken, authJwt.isBusinessManager], ManagerBusinessController.createComment);
router.patch('/service-note/:id', [authJwt.verifyToken, authJwt.isBusinessManager], ManagerBusinessController.deleteServiceNote);
router.put('/customers/:id', [authJwt.verifyToken, authJwt.isBusinessManager, validateUploadImage.uploadSingleCustomer], ManagerBusinessController.editCustomer);
router.post('/userid', [authJwt.verifyToken, authJwt.isBusinessManager], ManagerBusinessController.addUseridToCustomer)
router.post('/customers/:id/service-note', [authJwt.verifyToken, authJwt.isBusinessManager, validateUploadImage.counselorUpload], ManagerBusinessController.createServiceNote);
router.post('/customers', [authJwt.verifyToken, authJwt.isBusinessManager, validateUploadImage.uploadSingleCustomer], ManagerBusinessController.createCustomer);
router.post('/service-note/exam', [authJwt.verifyToken, authJwt.isBusinessManager], ManagerBusinessController.createReExam)
router.get('/customers/:id/detail', [authJwt.verifyToken, authJwt.isBusinessManager], ManagerBusinessController.showCustomerDetail)
router.get('/service-note', [authJwt.verifyToken, authJwt.isBusinessManager], ManagerBusinessController.showServiceNote);
router.get('/customers', [authJwt.verifyToken, authJwt.isBusinessManager], ManagerBusinessController.showCustomer);
router.get('/', [authJwt.verifyToken, authJwt.isBusinessManager], ManagerBusinessController.showDashboard);
/* Business Manager End*/


module.exports = router;