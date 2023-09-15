var express = require('express');
var router = express.Router();
var listController = require('../controllers/listController');

router.get('/', listController.getListFirst);
router.get('/list/:idx', listController.getList);

module.exports=router;