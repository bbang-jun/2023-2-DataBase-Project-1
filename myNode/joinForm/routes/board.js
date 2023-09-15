var express = require('express');
var router = express.Router();
var listController = require('../controllers/listController');
var writeController = require('../controllers/writeController'); // 61p
var readController = require('../controllers/readController'); // 68p

router.get('/', listController.getListFirst);
router.get('/list/:idx', listController.getList);
router.get('/write', writeController.writeForm); // 61p
router.post('/write', writeController.writeData); // 61p
router.get('/read/:idx', readController.readData); // 68p

module.exports=router;