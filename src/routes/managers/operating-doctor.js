const express = require('express');
const router = express.Router();
const DoctorController = require('../../app/controllers/operating-controller/DoctorOperationRoomController');
const authJwt = require('../../middleware/authJwt');


//Employ

router.get('/', [authJwt.verifyToken, authJwt.isDoctor], DoctorController.showDashboard)

router.get('/service-note',[authJwt.verifyToken, authJwt.isDoctor], DoctorController.showServiceNote);
router.get('/re-examination',[authJwt.verifyToken, authJwt.isDoctor], DoctorController.showReExamination);




module.exports = router;