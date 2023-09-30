var writeModel=require('../models/writeModel'); // 62p
var express=require('express'); // 62p

exports.writeForm=(req,res)=>{ // 62p
    res.render('write',{title: "게시판 글 쓰기"}); // 62p
}
exports.writeData=(req,res)=>{ // 62p
    // 이미지 업로드 미들웨어 호출
    writeModel.uploadImage(req, res, function (err) {
        if (err) {
            // 업로드 중 오류가 발생한 경우 처리
            console.error(err);
            return res.status(500).send("이미지 업로드 오류");
        }
        
        // 이미지 업로드 성공한 경우
        var creator_id = req.body.creator_id; // 62p
        var title = req.body.title; // 62p
        var content = req.body.content; // 62p
        var passwd = req.body.passwd; // 62p
        var image_path = req.file ? req.file.path : null; // 이미지 경로 가져오기

        var datas = [creator_id, title, content, passwd, image_path]; // 62p
        console.log("writeController data : ", datas);
        console.log(JSON.stringify(req.body));
        writeModel.insertData(datas, () => { // 62p
            res.redirect('/board'); // 62p
        }); // 62p
    });
}; // 62p