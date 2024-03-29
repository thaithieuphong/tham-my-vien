const express = require('express');
const ManagerBusinessController = require('../../app/controllers/business-controller/ManagerBusinessController');
const router = express.Router();
const validateUploadImage = require('../../middleware/validateUpload');
const AuthController = require('../../app/controllers/AuthController');

/* Business Manager Start*/
router.patch('/customers/:id/comment', ManagerBusinessController.createComment);
router.patch('/service-note/:id', ManagerBusinessController.deleteServiceNote);
router.put('/customers/:id', validateUploadImage.uploadSingleCustomer, ManagerBusinessController.editCustomer);
router.post('/userid', ManagerBusinessController.addUseridToCustomer)
router.post('/customers/:id/service-note', validateUploadImage.counselorUploadImg, ManagerBusinessController.createServiceNote);
router.post('/customers', validateUploadImage.uploadSingleCustomer, ManagerBusinessController.createCustomer);
router.post('/service-note/exam', ManagerBusinessController.createReExam)
router.post('/change-pass', AuthController.changePassword);

router.get('/customers/:id/detail', ManagerBusinessController.showCustomerDetail)
router.get('/customers/:id/detail/ctv', ManagerBusinessController.showCustomerDetailCTV)
router.get('/service-note', ManagerBusinessController.showServiceNote);
router.get('/customers', ManagerBusinessController.showCustomer);
router.get('/profile', ManagerBusinessController.showProfile);
router.get('/', ManagerBusinessController.showDashboard);
/* Business Manager End*/


module.exports = router;