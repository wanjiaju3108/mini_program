var pool = require('../pool');
var sqlResult = require('../../../core/db/sqlResult');

module.exports.selectByOpenid = (param, callback) => {
    console.log('===============')
    pool.getPool().getConnection((err, connection) => {
        var sql = 'select ' + sqlResult.template + ' from v_template where isdel = 0 and openid = ? order by createtime limit 1';
        connection.query(sql, param, (err, result) => {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            console.log('--------------------------SELECT----------------------------');
            console.log('param:{}',param);
            console.log('selectByOpenid:', result);
            console.log('-----------------------------------------------------------------');
            callback(result);
        });

        connection.release();
    })
};

module.exports.insertTemplate = (param) => {
    pool.getPool().getConnection((err, connection) => {
        var sql = 'insert into v_template (openid,form_id) values (?,?)';
        connection.query(sql, param, (err, result) => {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            console.log('--------------------------INSERT----------------------------');
            console.log('param:{}',param);
            console.log('insertTemporaryUser:', result);
            console.log('-----------------------------------------------------------------');
        });

        connection.release();
    })
};

module.exports.updateTemplate = (param) => {
    pool.getPool().getConnection((err, connection) => {
        var sql = 'update v_template set isdel = 1 where id = ?';
        connection.query(sql, param, (err, result) => {
            if (err) {
                console.log('[UPDATE ERROR] - ', err.message);
                return;
            }
            console.log('--------------------------UPDATE----------------------------');
            console.log('updateUserByAll:', result);
            console.log('-----------------------------------------------------------------');
        });

        connection.release();
    })
};