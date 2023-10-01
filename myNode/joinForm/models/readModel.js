var mysql = require('mysql'); // 70p
var connection = mysql.createConnection({ // 70p
    connectionLimit: 5, // 70p
    host: 'localhost', // 70p
    user: 'root', // 70p
    password: '@mrkdqudwns1', // 70p
    database: 'tutorial' // 70p
});

var fs = require('fs'); // 파일 시스템 모듈 추가

module.exports = {getData: function (idx, callback) { // 70p
        connection.query('SELECT idx, creator_id, title, content, hit, image_path FROM board WHERE idx=?;', idx, (err, row, fields) => { // 70p
            if (err) throw err; // 70p
            callback(row); // 70p
        });
    },

    deleteData: function (idx, callback) {
        connection.query('SELECT image_path FROM board WHERE idx=?', idx, (err, rows) => { // image upload 기능을 위한 수정
            if (err) { // image upload 기능을 위한 수정
                console.error("image_path를 가져오는데 실패하였습니다. : " + err); // image upload 기능을 위한 수정
                callback(err); // image upload 기능을 위한 수정
            } else {
                if (rows.length > 0) {
                    const imagePath = rows[0].image_path;

                    fs.unlink('public/' + imagePath, (unlinkErr) => { // 기존 이미지 삭제
                        if (unlinkErr) {
                            console.error("이미지 삭제를 실패했습니다.: " + unlinkErr);
                            callback(unlinkErr);
                        } else {
                            console.log("이미지 삭제를 성공했습니다.");

                            connection.query('DELETE FROM board WHERE idx=?', idx, (deleteErr, result) => {
                                if (deleteErr) {
                                    console.error("글 삭제 실패: " + deleteErr);
                                    callback(deleteErr); 
                                } else {
                                    console.log("글 삭제 성공");
                                    callback(null);
                                }
                            });
                        }
                    });
                } else {
                    console.error("해당 게시물을 찾을 수 없습니다.");
                    callback("게시물을 찾을 수 없음");
                }
            }
        });
    }
};