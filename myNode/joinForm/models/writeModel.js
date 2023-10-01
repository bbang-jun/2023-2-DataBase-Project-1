var mysql = require('mysql'); // 63p
var multer = require('multer'); //  // image upload 기능을 위한 수정

var storage = multer.diskStorage({ // image upload 기능을 위한 수정
    destination: function (req, file, cb) { // image upload 기능을 위한 수정
        cb(null, 'public/images'); // image upload 기능을 위한 수정
    },
    filename: function (req, file, cb) { // image upload 기능을 위한 수정
        console.log("originalname :" +file.originalname); // image upload 기능을 위한 수정
        var filename = file.originalname.replace("public\\", ""); // image upload 기능을 위한 수정
        console.log("filename :" +filename); // image upload 기능을 위한 수정
        cb(null, Date.now() + '-' + filename); // image upload 기능을 위한 수정
    }
});

var connection = mysql.createConnection({ // 63p
    connectionLimit: 5, // 63p
    host: 'localhost', // 63p
    user: 'root', // 63p
    password: '@mrkdqudwns1', // 63p
    database: 'tutorial' // 63p
}); // 63p

var upload = multer({ storage: storage }); // image upload 기능을 위한 수정

module.exports = {insertData: function (datas, callback) { // 63p
        datas[4] = datas[4].replace("public\\", ""); // image upload 기능을 위한 수정
        var sql = "INSERT INTO board(creator_id, title, content, passwd, image_path) VALUES(?,?,?,?,?)"; // image upload 기능을 위한 수정
        connection.query(sql, datas, function (err, rows) { // 63p
            if (err) console.error("err : " + err); // 63p
            console.log("rows : " + JSON.stringify(rows)); // 63p
            callback(); // 63p
        }); // 63p
    },

    uploadImage: upload.single('image') // image upload 기능을 위한 수정
};