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
    }
}
