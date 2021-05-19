const express = require('express');
const router = express.Router();
const candyCtrl = require('../controllers/candy-ctrl');

router.post('/candy' , candyCtrl.addCandy);
router.get('/candies' , candyCtrl.getCandies);

module.exports = router;