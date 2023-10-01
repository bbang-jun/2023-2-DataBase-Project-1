var mysql = require('mysql'); // 76p
var connection = mysql.createConnection({ // 76p
    connectionLimit: 5, // 76p
    host: 'localhost', // 76p
    user: 'root', // 76p
    password: '@mrkdqudwns1', // 76p
    database: 'tutorial' // 76p
});

var multer = require('multer'); // image upload 기능을 위한 수정

var storage = multer.diskStorage({ // image upload 기능을 위한 수정
    destination: function (req, file, cb) { // image upload 기능을 위한 수정
        cb(null, 'public/images'); // image upload 기능을 위한 수정
    },
    filename: function (req, file, cb) { // image upload 기능을 위한 수정
        console.log("originalname :" + file.originalname); // image upload 기능을 위한 수정
        var filename = file.originalname.replace("public\\", ""); // image upload 기능을 위한 수정
        console.log("filename :" + filename); // image upload 기능을 위한 수정
        cb(null, Date.now() + '-' + filename); // image upload 기능을 위한 수정
    } // image upload 기능을 위한 수정
});

exports.getData = (idx, callback) => { // 76p
    connection.query('SELECT idx, creator_id, title, content FROM board WHERE idx=?;', idx, (err, row, fields) => { // 76p
        if (err) throw err; // 76p
        callback(row); // 76p
    });
};

var fs = require('fs'); // image upload 기능을 위한 수정

exports.updateData = (datas, callback) =>{ // 76p
    connection.query('SELECT image_path FROM board WHERE idx=?;', datas[3], (err, row, fields) => { // image upload 기능을 위한 수정
        const imagePath = row[0].image_path; // image upload 기능을 위한 수정
        fs.unlink('public/' + imagePath, (unlinkErr) => { // image upload 기능을 위한 수정
            if (unlinkErr) { // image upload 기능을 위한 수정
                console.error("기존 이미지 삭제를 실패했습니다.: " + unlinkErr); // image upload 기능을 위한 수정
                callback(unlinkErr); // image upload 기능을 위한 수정
            } else {
                console.log("기존 이미지 삭제를 성공하였습니다."); // image upload 기능을 위한 수정
            }
        });
    });

    datas[5] = datas[5].replace("public\\", ""); // image upload 기능을 위한 수정
    var sql = "UPDATE `board` SET `creator_id` = '" + datas[0] + "', `title` = '" + datas[1] + "', `content` = '" + datas[2] 
    + "', `image_path` = " + "?" + " WHERE (`idx` = '" + datas[3] + "');"; // image upload 기능을 위한 수정
    connection.query(sql, [datas[5]], function (err, result) { // image upload 기능을 위한 수정
        if (err) console.error("글 수정 중 에러 발생 err : " + err); // 76p
        callback(result); // 76p
    });
};

var upload = multer({ storage: storage }); // image upload 기능을 위한 수정

exports.uploadImage = upload.single('image'); // 이미지 업로드 미들웨어 설정