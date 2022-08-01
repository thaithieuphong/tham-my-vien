const express = require('express');
const router = express.Router();
const DoctorController = require('../../app/controllers/operating-controller/DoctorOperationRoomController');
const validateUploadImage = require('../../middleware/validateUploadImage');


//Employ
router.get('/service-note/:id', DoctorController.updateServiceNote)



router.get('/service-note', DoctorController.showServiceNote);



module.exports = router;