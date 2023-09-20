var readModel = require('../models/readModel');
var express = require('express');

module.exports = {
    readData: function (req, res, next) {
        var idx = req.params.idx;
        readModel.getData(idx, (row) => {
            console.log('1개 글 조회 결과 확인 : ', row);
            res.render('read', { title: "글 조회", row: row[0] });
        });
    },

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