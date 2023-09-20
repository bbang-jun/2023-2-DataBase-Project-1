var mysql = require('mysql');
var connection = mysql.createConnection({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: '@mrkdqudwns1',
    database: 'tutorial'
});

module.exports = {
    getData: function (idx, callback) {
        connection.query('SELECT idx, creator_id, title, content, hit, image_path FROM board WHERE idx=?;', idx, (err, row, fields) => {
            if (err) throw err;
            callback(row);
        });
    },

    deleteData: function (idx, callback) {
        connection.query('DELETE FROM board WHERE idx=?', idx, (err, result) => {
            if (err) {
                console.error("글 삭제 실패: " + err);
                callback(err);
            } else {
                console.log("글 삭제 성공");
                callback(null);
            }
        });
    }
};