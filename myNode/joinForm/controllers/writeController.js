var writeModel=require('../models/writeModel'); // 62p
var express=require('express'); // 62p

exports.writeForm=(req,res)=>{ // 62p
    res.render('write',{title: "게시판 글 쓰기"}); // 62p
}
exports.writeData=(req,res)=>{ // 62p

    writeModel.uploadImage(req, res, function (err) { // image upload 기능을 위한 수정
        if (err) { // image upload 기능을 위한 수정
            console.error(err); // image upload 기능을 위한 수정
            return res.status(500).send("이미지 업로드 중 오류가 발생하였습니다."); // image upload 기능을 위한 수정
        }
        
        var creator_id = req.body.creator_id; // 62p
        var title = req.body.title; // 62p
        var content = req.body.content; // 62p
        var passwd = req.body.passwd; // 62p
        var image_path = req.file ? req.file.path : null; // image upload 기능을 위한 수정

        var datas = [creator_id, title, content, passwd, image_path]; // image upload 기능을 위한 수정
        writeModel.insertData(datas, () => { // 62p
            res.redirect('/board'); // 62p
        }); // 62p
    });
}; // 62p