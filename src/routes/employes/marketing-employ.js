const express = require('express');
const router = express.Router();
const MarketingController = require('../../app/controllers/marketing-controller/EmployMarketingController');
const validateUploadImage = require('../../middleware/validateUploadImage');
// const getHeaderToken = require('../getHeaderToken');

//Employ
router.patch('/customers/:id/comment', MarketingController.createComment);
router.put('/customers/:id', validateUploadImage.uploadSingleCustomer, MarketingController.editCustomer);

router.post('/customers', validateUploadImage.uploadSingleCustomer, MarketingController.createCustomer);

router.get('/customers/:id/detail', MarketingController.showCustomerDetail);
router.get('/customers', MarketingController.showCustomer);
router.get('/', MarketingController.showDashboard);


module.exports = router;