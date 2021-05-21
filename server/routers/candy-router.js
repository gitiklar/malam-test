const express = require('express');
const router = express.Router();
const candyCtrl = require('../controllers/candy-ctrl');
const checkAuth = require('../middlewares/checkAuth');
const checkGrant = require('../middlewares/checkGrant');

router.post('/candies' , checkAuth.allowIfLoggedin , checkGrant.grantAccess('updateOwn' , 'profile') , candyCtrl.updateCandiesCounts);
router.post('/candy' , checkAuth.allowIfLoggedin , checkGrant.grantAccess('updateAny' , 'profile') , candyCtrl.addCandy);
router.get('/candies' , candyCtrl.getCandies);
router.delete('/candy/:id', checkAuth.allowIfLoggedin , checkGrant.grantAccess('deleteAny' , 'profile') , candyCtrl.deleteCandy);
router.put('/candy/:id', checkAuth.allowIfLoggedin , checkGrant.grantAccess('updateAny' , 'profile') , candyCtrl.updateCandy);

module.exports = router;