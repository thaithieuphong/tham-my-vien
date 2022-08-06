const express = require('express');
const router = express.Router();
const MarketingController = require('../../app/controllers/marketing-controller/EmployMarketingController');
const validateUploadImage = require('../../middleware/validateUploadImage');
const authJwt = require('../../middleware/authJwt');

//Employ
router.put('/customers/:id', [authJwt.verifyToken, authJwt.isMarketingEmploy, validateUploadImage.uploadSingleCustomer], MarketingController.editCustomer);
router.post('/customers', [authJwt.verifyToken, authJwt.isMarketingEmploy, validateUploadImage.uploadSingleCustomer], MarketingController.createCustomer);
router.get('/customers/:id/detail', [authJwt.verifyToken, authJwt.isMarketingEmploy,], MarketingController.showCustomerDetail);
router.get('/customers', [authJwt.verifyToken, authJwt.isMarketingEmploy], MarketingController.showCustomer);
router.get('/', [authJwt.verifyToken, authJwt.isMarketingEmploy], MarketingController.showDashboard);


module.exports = router;