var mysql = require('mysql');
var connection = mysql.createConnection({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: '@mrkdqudwns1',
    database: 'tutorial'
});
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images'); // 이미지를 저장할 디렉터리 경로 설정
    },
    filename: function (req, file, cb) {
        console.log("originalname :" + file.originalname);
        var filename = file.originalname.replace("public\\", ""); // "public\\" 제거
        console.log("filename :" + filename);
        cb(null, Date.now() + '-' + filename);
    }
});

var upload = multer({ storage: storage });



exports.getData = (idx, callback) => {
    connection.query('SELECT idx, creator_id, title, content FROM board WHERE idx=?;', idx, (err, row, fields) => {
        if (err) throw err;
        callback(row);
    });
};

exports.updateData = (datas, callback) =>{
    datas[5] = datas[5].replace("public\\", "");
    console.log("=====================" + datas[0] +" "+datas[1]+" "+datas[2]+ " " +datas[3] +" "+ datas[4] + " "+datas[5])
    var sql = "UPDATE `board` SET `creator_id` = '" + datas[0] + "', `title` = '" + datas[1] + "', `content` = '" + datas[2] + "', `image_path` = " + "?" + " WHERE (`idx` = '" + datas[3] + "');";         // " , content=?, image_path=? WHERE idx=? AND passwd=?";
    //console.log("sql test:" + sql);
    //var sql = "UPDATE `board` SET `creator_id` = 'aaa', `title` = 'aaa', `content` = 'aaa', `image_path` = 'aaaa' WHERE (`idx` = '37');"
    connection.query(sql, [datas[5]], function (err, result) {
        if (err) console.error("글 수정 중 에러 발생 err : " + err);
        callback(result);
    });
};

exports.uploadImage = upload.single('image'); // 이미지 업로드 미들웨어 설정
