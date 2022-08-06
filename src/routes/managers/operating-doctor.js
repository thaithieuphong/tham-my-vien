const express = require('express');
const router = express.Router();
const DoctorController = require('../../app/controllers/operating-controller/DoctorOperationRoomController');
const validateUploadImage = require('../../middleware/validateUpload');


//Employ



router.get('/', DoctorController.showServiceNote);



module.exports = router;