const express = require('express');
const router = express.Router();
const DoctorController = require('../../app/controllers/operating-controller/DoctorOperationRoomController');
const validateUploadImage = require('../../middleware/validateUploadImage');
const authJwt = require('../../middleware/authJwt');


//Employ



router.get('/',[authJwt.verifyToken, authJwt.isDoctor], DoctorController.showServiceNote);



module.exports = router;