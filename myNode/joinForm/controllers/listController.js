 // 57p
var listModel=require('../models/listModel');
var express=require('express');


exports.getList=(req, res, next)=>{
    listModel.getList((rows)=>{
        console.log('rows: '+JSON.stringify(rows));
        res.render('list', {title: "게시판 전체 글 조회", rows: rows});
    });
}
exports.getListFirst=(req, res)=>{
    res.redirect('/board/list/1');
}