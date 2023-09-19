var mysql = require('mysql');
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images'); // 이미지를 저장할 디렉터리 경로 설정
    },
    filename: function (req, file, cb) {
        console.log("originalname :" +file.originalname);
        var filename = file.originalname.replace("public\\", ""); // "public\\" 제거
        console.log("filename :" +filename);
        cb(null, Date.now() + '-' + filename);
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
        // datas 배열의 다섯 번째 요소는 이미지 파일 이름이 됩니다.
        // 여기에서 "public\\"를 제거하여 저장합니다.
        datas[4] = datas[4].replace("public\\", "");

        var sql = "INSERT INTO board(creator_id, title, content, passwd, image_path) VALUES(?,?,?,?,?)";
        connection.query(sql, datas, function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("rows : " + JSON.stringify(rows));
            callback();
        });
    },

    uploadImage: upload.single('image') // 이미지 업로드 미들웨어 설정
};