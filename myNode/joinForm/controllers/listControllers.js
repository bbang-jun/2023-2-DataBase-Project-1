var listModel=require('../models/listModel');
var express=require('express');

exports.getList=(req, res, nex)=>{
    listModel.getList((rows)=>{
        console.log('list', {title: "게시판 전체 글 조회", rows: rows});
    });
}

exports.getListFirst=(req, res)=>{
    res.redirect('/board/list/1');
}