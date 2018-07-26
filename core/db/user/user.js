var pool = require('../pool')
var config = require('../../../config/config')
var sqlResult = require('../../../core/db/sqlResult')

module.exports.selectUserByOpenid = (param, callback) => {
    pool.getPool().getConnection((err, connection) => {
        var sql = 'select ' + sqlResult.user + ' from v_user where appid = ' + config.arc4key + ' and isdel = 0 and openid = ?';
        connection.query(sql, param, (err, result) => {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            console.log('--------------------------SELECT----------------------------');
            console.log('selectUserByOpenid:', result);
            console.log('-----------------------------------------------------------------');
            callback(result);
        })

        connection.release();
    })
};

module.exports.insertTemporaryUser = (param, callback) => {
    pool.getPool().getConnection((err, connection) => {
        var sql = 'insert into v_user (appid,openid) values (?,?)';
        connection.query(sql, param, (err, result) => {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            console.log('--------------------------INSERT----------------------------');
            console.log('insertTemporaryUser:', result);
            console.log('-----------------------------------------------------------------');
            callback(result);
        })

        connection.release();
    })
};

module.exports.updateUserByAll = (param) => {
    pool.getPool().getConnection((err, connection) => {
        var sql = 'update v_user set nick_name = ?,avatar_url = ?,gender = ?,country = ?,province = ?,city = ? where openid = ?';
        connection.query(sql, param, (err, result) => {
            if (err) {
                console.log('[UPDATE ERROR] - ', err.message);
                return;
            }
            console.log('--------------------------UPDATE----------------------------');
            console.log('updateUserByAll:', result);
            console.log('-----------------------------------------------------------------');
        })

        connection.release();
    })
};