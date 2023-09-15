var express = require('express');
var router = express.Router();
var listController = require('../controllers/listController');

router.get('/', listContrller, getListFirst);
router.get('/list/:idx', listController, getList);

module.exports=router;