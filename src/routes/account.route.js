const accountController = require("../controllers/account.controller.js");
const express = require('express');
const router = express.Router();

router.post('/register', accountController.registerAccount);
router.post('/login', accountController.loginAccount);
router.get('/:id', accountController.getAccount);

module.exports = router;