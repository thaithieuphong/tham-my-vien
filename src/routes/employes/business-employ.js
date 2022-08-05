const express = require('express');
const EmployBusinessController = require('../../app/controllers/business-controller/EmployBusinessController');
const router = express.Router();
const validateUploadImage = require('../../middleware/validateUploadImage');
const uploadGoogleDrive = require('../../middleware/uploadGoogleDriveCounselor');
const authJwt = require("../../middleware/authJwt");

/* Business Employ Start*/
router.patch('/customers/:id/comment', [authJwt.verifyToken, authJwt.isBusinessEmploy], EmployBusinessController.createComment);
router.put('/customers/:id', [authJwt.verifyToken, authJwt.isBusinessEmploy, validateUploadImage.uploadSingleCustomer], EmployBusinessController.editCustomer);
router.post('/customers/:id/service-note', [authJwt.verifyToken, authJwt.isBusinessEmploy, validateUploadImage.counselorUploadGoogleDrive, uploadGoogleDrive.uploadDriveCounselor], EmployBusinessController.createServiceNote);
router.post('/customers', [authJwt.verifyToken, authJwt.isBusinessEmploy, validateUploadImage.uploadSingleCustomer], EmployBusinessController.createCustomer);
router.get('/customers/:id/detail', [authJwt.verifyToken, authJwt.isBusinessEmploy], EmployBusinessController.showCustomerDetail)
router.get('/service-note', [authJwt.verifyToken, authJwt.isBusinessEmploy], EmployBusinessController.showServiceNote);
router.get('/customers', [authJwt.verifyToken, authJwt.isBusinessEmploy], EmployBusinessController.showCustomer);
router.get('/', [authJwt.verifyToken, authJwt.isBusinessEmploy], EmployBusinessController.showDashboard);
/* Business Employ End*/

module.exports = router;
