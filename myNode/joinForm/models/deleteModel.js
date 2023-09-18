var mysql = require('mysql');
var connection = mysql.createConnection({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: '@mrkdqudwns1',
    database: 'tutorial'
});

module.exports={updateData(datas,callback){
        var sql="INSERT INTO board(creator_id, title, content, passwd) VALUES(?,?,?,?)";
        connection.query(sql,datas,function(err,rows){
         if(err) console.error("err : "+err);
         console.log("rows : " + JSON.stringify(rows));
         callback();
        });
    }
}