// [POST] Đăng ký, đăng nhập và đăng nhập

const express = require('express');
const router = express.Router();
const controller = require("../app/controllers/AuthController");

router.post("/logout", controller.logout);
router.post("/", controller.postLogin);
router.get('/', controller.getLogin);

module.exports = router;