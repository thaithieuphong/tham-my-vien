const express = require('express');
const router = express.Router();
const NursingController = require('../../app/controllers/operating-controller/NursingOperationRoomController');
const validateUploadImage = require('../../middleware/validateUploadImage');


//Employ
router.patch('/service-note/:id', NursingController.updateServiceNote)
router.get('/', NursingController.showServiceNote);

module.exports = router;