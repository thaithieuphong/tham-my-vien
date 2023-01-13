const express = require('express');
const EmployBusinessController = require('../../app/controllers/business-controller/EmployBusinessController');
const router = express.Router();
const validateUploadImage = require('../../middleware/validateUpload');
const AuthController = require('../../app/controllers/AuthController');

/* Business Employ Start*/
router.patch('/customers/:id/comment', EmployBusinessController.createComment);
router.patch('/customers/:id/potential', EmployBusinessController.moveToPotential);
router.patch('/customers/:id/notOK', EmployBusinessController.moveToNotOK);
router.patch('/customers/:id/schedule', EmployBusinessController.moveToSchedule);
router.put('/customers/:id/edit', validateUploadImage.uploadSingleCustomer, EmployBusinessController.editCustomer);
router.post('/customers/:id/schedule/create', validateUploadImage.beforeCounselorUpload, EmployBusinessController.createSchedule);
router.post('/customers', validateUploadImage.uploadSingleCustomer, EmployBusinessController.createCustomer);
router.post('/schedule/exam', EmployBusinessController.createReExam);
router.post('/change-pass', AuthController.changePassword);

router.get('/service-note/:id/detail', EmployBusinessController.showServiceNoteDetail);
router.get('/customers/:id/detail', EmployBusinessController.showCustomerDetail);
router.get('/schedule', EmployBusinessController.showSchedule);
router.get('/customer/:id/discharge-from-hospital-detail', EmployBusinessController.showCustomerDischargeFromHospitalDetail);
router.get('/customers/:id/edit', EmployBusinessController.showCustomerEdit);
router.get('/customers/create', EmployBusinessController.showCustomerCreate);
router.get('/customers/done', EmployBusinessController.showCustomerDone);
router.get('/customers/discharge-from-hospital', EmployBusinessController.showCustomerDischargeFromHospital);
router.get('/customers/notok', EmployBusinessController.showCustomerNotOK);
router.get('/customers/schedule', EmployBusinessController.showCustomerSchedule);
router.get('/customers/potential', EmployBusinessController.showCustomerPotential);
router.get('/customers/new', EmployBusinessController.showCustomerNew);
router.get('/profile', EmployBusinessController.showProfile);
router.get('/', EmployBusinessController.showDashboard);
/* Business Employ End*/

module.exports = router;
