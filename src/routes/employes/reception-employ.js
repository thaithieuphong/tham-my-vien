const express = require('express');
const router = express.Router();
const ReceptionController = require('../../app/controllers/reception-controller/EmployReceptionController');
const authJwt = require('../../middleware/authJwt');


//Employ

router.patch('/service-note/:id', ReceptionController.pushPerformer);
// router.patch('/service-note/:id', ReceptionController.pushPerformer);
router.patch('/reexam/:id', ReceptionController.pushOperationToReexam);
router.get('/profile', ReceptionController.showProfile);
router.get('/', ReceptionController.showServiceNote);


module.exports = router;