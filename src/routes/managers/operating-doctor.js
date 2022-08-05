const express = require('express');
const router = express.Router();
const DoctorController = require('../../app/controllers/operating-controller/DoctorOperationRoomController');
const validateUploadImage = require('../../middleware/validateUploadImage');


//Employ
router.patch('/service-note/:id', DoctorController.updateServiceNote);
router.get('/', DoctorController.showServiceNote);



module.exports = router;