var writeModel=require('../models/writeModel');
var express=require('express');

exports.writeForm=(req,res)=>{
    res.render('write',{title: "게시판 글 쓰기"});
}
exports.writeData=(req,res)=>{
    var creator_id = req.body.creator_id;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var datas = [creator_id, title, content, passwd];
    writeModel.insertData(datas,()=>{
        res.redirect('/board');
    });
};