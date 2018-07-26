var config = require('../../config/config');
var request = require('request');
var url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + config.appid + "&secret=" + config.secret + "&js_code=";
var requestData = "上送的数据";

module.exports.getUserByCode = (code, callback) => {
    request({
        url: url + code + "&grant_type=authorization_code",
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: requestData
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            callback(body)
        }
    });
};