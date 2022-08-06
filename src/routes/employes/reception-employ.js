const express = require('express');
const router = express.Router();
const ReceptionController = require('../../app/controllers/reception-controller/EmployReceptionController');
const validateUploadImage = require('../../middleware/validateUploadImage');
const authJwt = require('../../middleware/authJwt');


//Employ

router.patch('/service-note/:id', [authJwt.verifyToken, authJwt.isReceptionEmploy], ReceptionController.pushPerformer);
// router.patch('/service-note/:id', ReceptionController.pushPerformer);


router.get('/', [authJwt.verifyToken, authJwt.isReceptionEmploy], ReceptionController.showServiceNote);


module.exports = router;