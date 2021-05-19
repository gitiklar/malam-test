const express = require('express');
const router = express.Router();
const candyCtrl = require('../controllers/candy-ctrl');

router.post('/candy' , candyCtrl.addCandy);
router.get('/candies' , candyCtrl.getCandies);
router.delete('/candy/:id', candyCtrl.deleteCandy);
router.put('/candy/:id', candyCtrl.updateCandy);

module.exports = router;