var updateModel=require('../models/updateModel');
var express=require('express');
var url = require('url');

exports.updateForm=(req, res, next)=>{
    var queryData = url.parse(req.url, true).query;
    var idx = queryData.idx;
    updateModel.getData(idx, (row)=>{
        console.log('update에서 1개 글 조회 결과 확인 : ',row);
        res.render('update',{title: "글 수정", row: row[0]});
    });

}

exports.updateData = (req, res) => {

    // 이미지가 업로드되었을 때 이미지 경로를 포함하여 SQL 쿼리를 실행합니다.
        updateModel.uploadImage(req, res, function(err) {
            // if (result.affectedRows == 0) {
            //     res.send("<script>alert('패스워드가 일치하지 않거나, 잘못된 요청으로 인해 변경되지 않았습니다.');history.back();</script>");
            // } else {
                // res.redirect('/board/read/' + idx);
            //}
            var idx = req.body.idx;
            var creator_id = req.body.creator_id;
            var title = req.body.title;
            var content = req.body.content;
            var passwd = req.body.passwd;
            var image_path = req.file ? req.file.path : null; // 이미지 경로 가져오기
            var datas = [creator_id, title, content, idx, passwd, image_path];
            console.log("updateController data : ", datas);
            console.log(JSON.stringify(req.body));
            updateModel.updateData(datas, (result) => {
                if(result.affectedRows == 0){
                    res.send("<script>alert('패스워드가 일치하지 않거나, 잘못된 요청으로 인해 변경되지 않았습니다.');history.back();</script>");
                }
                else{
                res.redirect('/board'); // 바꾸어야 함
                }
            })
        });
};