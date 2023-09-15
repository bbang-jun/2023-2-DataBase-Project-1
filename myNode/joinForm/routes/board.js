var express = require('express');
var router = express.Router();
var listController = require('../controllers/listController');
var writeController = require('../controllers/writeController'); // 61p

router.get('/', listController.getListFirst);
router.get('/list/:idx', listController.getList);
router.get('/write', writeController.writeForm);
router.post('/write', writeController.writeData); // 61p

module.exports=router;