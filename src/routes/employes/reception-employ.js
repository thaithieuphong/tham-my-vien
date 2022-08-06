const express = require('express');
const router = express.Router();
const ReceptionController = require('../../app/controllers/reception-controller/EmployReceptionController');
const validateUploadImage = require('../../middleware/validateUpload');


//Employ

router.patch('/service-note/:id',ReceptionController.pushPerformer);
// router.patch('/service-note/:id', ReceptionController.pushPerformer);


router.get('/', ReceptionController.showServiceNote);


module.exports = router;