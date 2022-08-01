const express = require('express');
const router = express.Router();
const ReceptionController = require('../../app/controllers/reception-controller/EmployReceptionController');
const validateUploadImage = require('../../middleware/validateUploadImage');


//Employ

router.delete('/service-note/:id',ReceptionController.pushPerformer);
// router.patch('/service-note/:id', ReceptionController.pushPerformer);


router.get('/service-note', ReceptionController.showServiceNote);


module.exports = router;