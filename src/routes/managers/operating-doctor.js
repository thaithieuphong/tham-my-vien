const express = require('express');
const router = express.Router();
const DoctorController = require('../../app/controllers/operating-controller/DoctorOperationRoomController');
const authJwt = require('../../middleware/authJwt');

//Employ
router.get('/service-note', DoctorController.showServiceNote);
router.get('/re-examination', DoctorController.showReExamination);
router.get('/', DoctorController.showDashboard);

module.exports = router;