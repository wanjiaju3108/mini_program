var uuid = require('../common/utils/uuid');
var userWx = require('../common/user/userWx');
var WXBizDataCrypt = require('../common/user/WXBizDataCrypt')
module.exports = (req, res) => {
    userWx.getUserByCode(req.body.code, (x) => {
        res.end(JSON.stringify(x))
    })
};