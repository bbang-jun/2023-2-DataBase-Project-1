var express = require('express');
var router = express.Router();
var listController = require('../controllers/listController');
var writeController = require('../controllers/writeController'); // 61p
var readController = require('../controllers/readController'); // 68p
var updateController = require('../controllers/updateController'); // 74p
const multer =require('multer'); // 74p

router.get('/', listController.getListFirst);
router.get('/list/:idx', listController.getList);
router.get('/write', writeController.writeForm); // 61p
router.post('/write', writeController.writeData); // 61p
router.get('/read/:idx', readController.readData); // 68p
router.get('/update', updateController.updateForm); // 74p
router.post('/update', multer().none(), (req,res)=>{updateController.updateData(req, res)}); // 74p
router.post('/delete', readController.deletePost); // POST 요청에 대한 deletePost 컨트롤러를 연결합니다.

module.exports=router;