const express = require('express');
const router = express.Router();
const ReceptionController = require('../../app/controllers/reception-controller/ManagerReceptionController');
const validateUploadImage = require('../../middleware/validateUpload');


module.exports = router;