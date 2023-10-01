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
        connection.query('SELECT image_path FROM board WHERE idx=?', idx, (err, rows) => {
            if (err) {
                console.error("글 삭제 실패: " + err);
                callback(err);
            } else {
                if (rows.length > 0) {
                    const imagePath = rows[0].image_path;

                    // 이미지 파일을 삭제합니다.
                    fs.unlink('public/' + imagePath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error("이미지 파일 삭제 실패: " + unlinkErr);
                            callback(unlinkErr); // 이미지 파일 삭제 실패 시 에러를 콜백으로 전달
                        } else {
                            console.log("이미지 파일 삭제 성공");

                            // 게시물을 삭제합니다.
                            connection.query('DELETE FROM board WHERE idx=?', idx, (deleteErr, result) => {
                                if (deleteErr) {
                                    console.error("글 삭제 실패: " + deleteErr);
                                    callback(deleteErr); // 게시물 삭제 실패 시 에러를 콜백으로 전달
                                } else {
                                    console.log("글 삭제 성공");
                                    callback(null); // 삭제 성공 시 null을 콜백으로 전달
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