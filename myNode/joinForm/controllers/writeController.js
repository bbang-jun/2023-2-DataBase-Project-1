var writeModel=require('../models/writeModel');
var express=require('express');

exports.writeForm=(req,res)=>{
    res.render('write',{title: "게시판 글 쓰기"});
}
exports.writeData=(req,res)=>{
    // 이미지 업로드 미들웨어 호출
    writeModel.uploadImage(req, res, function (err) {
        if (err) {
            // 업로드 중 오류가 발생한 경우 처리
            console.error(err);
            return res.status(500).send("이미지 업로드 오류");
        }
        
        // 이미지 업로드 성공한 경우
        var creator_id = req.body.creator_id;
        var title = req.body.title;
        var content = req.body.content;
        var passwd = req.body.passwd;
        var image_path = req.file ? req.file.path : null; // 이미지 경로 가져오기

        var datas = [creator_id, title, content, passwd, image_path];
        console.log("writeController data : ", datas);
        console.log(JSON.stringify(req.body));
        writeModel.insertData(datas, () => {
            res.redirect('/board');
        });
    });
};