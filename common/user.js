var userDb = require('../core/db/user/user');
var userWx = require('./user/userWx');
var uuid = require('./utils/uuid');
var config = require('../config/config');
var userUtils = require('./user/userUtils');
var WXBizDataCrypt = require('./user/WXBizDataCrypt')

module.exports.getUserByCode = (code, callback) => {
    userWx.getUserByCode(code, cb => {
        var openid = cb.openid;
        var sqlParam = [openid];
        var user = {isTemporary: 0};
        userDb.selectUserByOpenid(sqlParam, result => {
            if (result.length == 0) {
                var userId = parseInt(uuid.uuid());
                sqlParam = [openid];
                userDb.insertTemporaryUser(sqlParam, () => {
                    user['token'] = userUtils.getToken(userId);
                    user.isTemporary = 1;
                    callback(user)
                });
            } else {
                if (result[0].nick_name == null) {
                    user['token'] = userUtils.getToken(result[0].id);
                    user.isTemporary = 1;
                    callback(user)
                } else {
                    user['token'] = userUtils.getToken(result[0].id);
                    callback(user)
                }
            }
        })
    })
};

module.exports.getUserByAll = (code, encryptedData, iv, callback) => {
    userWx.getUserByCode(code, cb => {
        var data = WXBizDataCrypt.decryptData(encryptedData, cb.session_key, iv);
        var param = [data.nickName, data.avatarUrl, data.gender, data.country, data.province, data.city, cb.openid];
        var user = {isTemporary: 0};
        userDb.updateUserByAll(param);
        userDb.selectUserByOpenid([cb.openid], result => {
            user['token'] = userUtils.getToken(result[0].id);
            callback(user)
        })
    })
};

module.exports.getOpenidById = (id) => {

};