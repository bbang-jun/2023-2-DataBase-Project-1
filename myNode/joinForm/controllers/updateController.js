var updateModel=require('../models/updateModel'); // 75p
var express=require('express'); // 75p
var url = require('url'); // 75p

exports.updateForm=(req, res, next)=>{ // 75p
    var queryData = url.parse(req.url, true).query; // 75p
    var idx = queryData.idx; // 75p
    updateModel.getData(idx, (row)=>{ // 75p
        console.log('update에서 1개 글 조회 결과 확인 : ',row); // 75p
        res.render('update',{title: "글 수정", row: row[0]}); // 75p
    });

}

exports.updateData = (req, res) => { // 75p

    // 이미지가 업로드되었을 때 이미지 경로를 포함하여 SQL 쿼리를 실행합니다.
        updateModel.uploadImage(req, res, function(err) {
            var idx = req.body.idx; // 75p
            var creator_id = req.body.creator_id; // 75p
            var title = req.body.title; // 75p
            var content = req.body.content; // 75p
            var passwd = req.body.passwd; // 75p
            var image_path = req.file ? req.file.path : null; // 이미지 경로 가져오기
            var datas = [creator_id, title, content, idx, passwd, image_path]; // 75p
            console.log("updateController data : ", datas); // 75p
            console.log(JSON.stringify(req.body)); // 75p
            updateModel.updateData(datas, (result) => { // 75p
                if(result.affectedRows == 0){ // 75p
                    res.send("<script>alert('패스워드가 일치하지 않거나, 잘못된 요청으로 인해 변경되지 않았습니다.');history.back();</script>"); // 75p
                } // 75p
                else{ // 75p
                res.redirect('/board/read/'+idx); // 75p
                } // 75p
            })
        });
};