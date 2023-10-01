var mysql = require('mysql'); // 76p
var connection = mysql.createConnection({ // 76p
    connectionLimit: 5, // 76p
    host: 'localhost', // 76p
    user: 'root', // 76p
    password: '@mrkdqudwns1', // 76p
    database: 'tutorial' // 76p
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

exports.getData = (idx, callback) => { // 76p
    connection.query('SELECT idx, creator_id, title, content FROM board WHERE idx=?;', idx, (err, row, fields) => { // 76p
        if (err) throw err; // 76p
        callback(row); // 76p
    });
};

var fs = require('fs'); // 파일 시스템 모듈 추가

exports.updateData = (datas, callback) =>{ // 76p
    connection.query('SELECT image_path FROM board WHERE idx=?;', datas[3], (err, row, fields) => {
        const imagePath = row[0].image_path;
        fs.unlink('public/' + imagePath, (unlinkErr) => {
            if (unlinkErr) {
                console.error("이미지 파일 삭제 실패: " + unlinkErr);
                callback(unlinkErr); // 이미지 파일 삭제 실패 시 에러를 콜백으로 전달
            } else {
                console.log("이미지 파일 삭제 성공");
            }
        });
        //if (err) throw err;
        //callback(row);
        
    });

    datas[5] = datas[5].replace("public\\", "");
    var sql = "UPDATE `board` SET `creator_id` = '" + datas[0] + "', `title` = '" + datas[1] + "', `content` = '" + datas[2] + "', `image_path` = " + "?" + " WHERE (`idx` = '" + datas[3] + "');";
    connection.query(sql, [datas[5]], function (err, result) {
        if (err) console.error("글 수정 중 에러 발생 err : " + err); // 76p
        callback(result); // 76p
    });
};

exports.uploadImage = upload.single('image'); // 이미지 업로드 미들웨어 설정