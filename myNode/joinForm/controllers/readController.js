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

    deletePost: function (req, res, next) { // delete 기능을 위한 수정
        var idx = req.body.idx; // delete 기능을 위한 수정
        readModel.deleteData(idx, (err) => { // delete 기능을 위한 수정
            if (err) { // delete 기능을 위한 수정
                res.status(500).send("글 삭제를 실패하였습니다."); // delete 기능을 위한 수정
            } else { // delete 기능을 위한 수정
                res.redirect("/board/list/1"); // delete 기능을 위한 수정
            }
        });
    }
};