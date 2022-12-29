const express = require('express');
const router = express.Router();
const ManagerController = require('../../app/controllers/manager-controller/ManagerController');
const validateUpload = require('../../middleware/validateUpload');
const AuthController = require('../../app/controllers/AuthController');
const cloudinaryUpload = require('../../middleware/cloudinaryUpload');
const cloudinaryStorage = require('../../middleware/cloudinaryStorage');

/* Business Manager Start*/
// router.delete('/users/:id/delete', ManagerHRController.deleteUser);
// router.post('/users', validateUpload.uploadSingleUser, ManagerHRController.createUser);
router.post('/change-pass', AuthController.changePassword);
router.post('/report/filter-month', ManagerController.filterYearReport);
router.post('/report/filter-quarter', ManagerController.filterQuarterReport);
router.post('/report/filter-month', ManagerController.filterMonthReport);
router.get('/report', ManagerController.showReport);
router.get('/statistical', ManagerController.showStatistical);
router.get('/re-exam/:id/detail', ManagerController.showReExamDetail);
router.get('/service-note/:id/detail', ManagerController.showServiceNoteDetail);
router.get('/customer/:id/detail', ManagerController.showCustomerDetail);
router.get('/user/:id', ManagerController.userProfile);
router.get('/profile', ManagerController.showProfile);
router.get('/', ManagerController.showCustomer);
/* Business Manager End*/

module.exports = router;