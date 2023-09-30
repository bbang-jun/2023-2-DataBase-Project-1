var express = require('express'); // 56p
var router = express.Router(); // 56p
var listController = require('../controllers/listController'); // 56p
var writeController = require('../controllers/writeController'); // 61p
var readController = require('../controllers/readController'); // 68p
var updateController = require('../controllers/updateController'); // 74p
var updateModel = require('../models/updateModel');
//const multer =require('multer'); // 74p

router.get('/', listController.getListFirst); // 56p
router.get('/list/:idx', listController.getList); // 56p
router.get('/write', writeController.writeForm); // 61p
router.post('/write', writeController.writeData); // 61p
router.get('/read/:idx', readController.readData); // 68p
router.get('/update', updateController.updateForm); // 74p
//router.post('/update', multer().none(), (req,res)=>{updateController.updateData(req, res)}); // 74p
// router.post('/update', updateModel.upload.single('image'), (req, res) => {
//     updateController.updateData(req, res);
// });
router.post('/update', updateController.updateData); // 61p
router.post('/delete', readController.deletePost); // POST 요청에 대한 deletePost 컨트롤러를 연결합니다.

module.exports=router; // 56p