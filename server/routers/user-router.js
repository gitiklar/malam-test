const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user-ctrl');

router.post('/user' , userCtrl.createUser);
router.post('/login' , userCtrl.login);

module.exports = router;