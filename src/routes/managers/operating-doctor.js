const express = require('express');
const router = express.Router();
const DoctorController = require('../../app/controllers/operating-controller/DoctorOperationRoomController');
const AuthController = require('../../app/controllers/AuthController');

//Employ
router.post('/change-pass', AuthController.changePassword);
router.get('/customers', DoctorController.showCustomer);
router.get('/schedule/:id/detail', DoctorController.showScheduleDetail);
router.get('/re-examination', DoctorController.showReExamination);
router.get('/profile', DoctorController.showProfile);
router.get('/', DoctorController.showSchedule);

module.exports = router;