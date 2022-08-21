const express = require('express');
const EmployBusinessController = require('../../app/controllers/business-controller/EmployBusinessController');
const router = express.Router();
const validateUploadImage = require('../../middleware/validateUpload');
const AuthController = require('../../app/controllers/AuthController');

/* Business Employ Start*/
router.patch('/customers/:id/comment', EmployBusinessController.createComment);
router.put('/customers/:id', validateUploadImage.uploadSingleCustomer, EmployBusinessController.editCustomer);
router.post('/customers/:id/service-note', validateUploadImage.counselorUpload, EmployBusinessController.createServiceNote);
router.post('/customers', validateUploadImage.uploadSingleCustomer, EmployBusinessController.createCustomer);
router.post('/service-note/exam', EmployBusinessController.createReExam);
router.post('/change-pass', AuthController.changePassword);

router.get('/customers/:id/detail', EmployBusinessController.showCustomerDetail);
router.get('/service-note', EmployBusinessController.showServiceNote);
router.get('/customers', EmployBusinessController.showCustomer);
router.get('/profile', EmployBusinessController.showProfile);
router.get('/', EmployBusinessController.showDashboard);
/* Business Employ End*/

module.exports = router;
