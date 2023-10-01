var express = require('express'); // 56p
var router = express.Router(); // 56p
var listController = require('../controllers/listController'); // 56p
var writeController = require('../controllers/writeController'); // 61p
var readController = require('../controllers/readController'); // 68p
var updateController = require('../controllers/updateController'); // 74p
// const multer =require('multer'); // 74p

router.get('/', listController.getListFirst); // 56p
router.get('/list/:idx', listController.getList); // 56p
router.get('/write', writeController.writeForm); // 61p
router.post('/write', writeController.writeData); // 61p
router.get('/read/:idx', readController.readData); // 68p
router.get('/update', updateController.updateForm); // 74p
// router.post('/update', multer().none(), (req,res)=>{updateController.updateData(req, res)}); // 74p
router.post('/update', updateController.updateData); // image upload 기능을 위한 수정
router.post('/delete', readController.deletePost); // delete 기능을 위한 수정

module.exports=router; // 56p