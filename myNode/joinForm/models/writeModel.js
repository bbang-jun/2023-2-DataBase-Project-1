var mysql = require('mysql');
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images'); // 이미지를 저장할 디렉터리 경로 설정
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // 파일 이름 설정
    }
});

var upload = multer({ storage: storage });

var connection = mysql.createConnection({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: '@mrkdqudwns1',
    database: 'tutorial'
});

module.exports = {
    insertData: function (datas, callback) {
        var sql = "INSERT INTO board(creator_id, title, content, passwd, image_path) VALUES(?,?,?,?,?)";
        connection.query(sql, datas, function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("rows : " + JSON.stringify(rows));
            callback();
        });
    },

    uploadImage: upload.single('image') // 이미지 업로드 미들웨어 설정
};