const express = require('express');
const router = express.Router();
const ReceptionController = require('../../app/controllers/reception-controller/EmployReceptionController');
const authJwt = require('../../middleware/authJwt');


//Employ

router.patch('/service-note/:id', [authJwt.verifyToken, authJwt.isReceptionEmploy], ReceptionController.pushPerformer);
// router.patch('/service-note/:id', ReceptionController.pushPerformer);
router.patch('/reexam/:id', [authJwt.verifyToken, authJwt.isReceptionEmploy], ReceptionController.pushOperationToReexam);

router.get('/', [authJwt.verifyToken, authJwt.isReceptionEmploy], ReceptionController.showServiceNote);


module.exports = router;