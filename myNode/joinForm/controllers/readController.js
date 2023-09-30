var readModel = require('../models/readModel'); // 69p
var express = require('express'); // 69p

module.exports = { // 69p
    readData: function (req, res, next) { // 69p
        var idx = req.params.idx; // 69p
        readModel.getData(idx, (row) => { // 69p
            console.log('1개 글 조회 결과 확인 : ', row); // 69p
            res.render('read', { title: "글 조회", row: row[0] }); // 69p
        }); // 69p
    }, // 69p

    deletePost: function (req, res, next) {
        var idx = req.body.idx;
        readModel.deleteData(idx, (err) => {
            if (err) {
                res.status(500).send("글 삭제 실패");
            } else {
                res.redirect("/board"); // 삭제 후 리스트 페이지로 이동
            }
        });
    }
};