var request = require('request');
var config = require('../config/config');
var userDb = require('../core/db/user/user');
var templateDb = require('../core/db/template/template');

module.exports.getToken = (callback) => {
    request({
        url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + config.appid + "&secret=" + config.secret,
        method: "GET",
        json: true,
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            callback(body.access_token)
        }
    })
};

module.exports.sendTemplate = (id, accessToken, templateId, data) => {
    userDb.selectUserById([id], userResult => {
        var openid = userResult[0].openid;
        templateDb.selectByOpenid([id], templateResult => {
            templateDb.updateTemplate([templateResult[0].id]);
            var formId = templateResult[0].form_id;
            request({
                url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + accessToken,
                method: "POST",
                json: true,
                headers: {
                    "content-type": "application/json",
                },
                body: {
                    "touser": openid,
                    "template_id": templateId,
                    "form_id": formId,
                    "data": data,
                }
            })
        });
    });
};

module.exports.pushFormId = (id, formId) => {
    templateDb.insertTemplate([id, formId])
};

module.exports.getTemplateData = (type, callback) => {
    if (type == 1) {
        var data = {
            "keyword1": {
                "value": "2016年6月6日"
            },
            "keyword2": {
                "value": "咖啡"
            },
            "keyword3": {
                "value": "23432132"
            },
            "keyword4": {
                "value": "9601101256898452"
            },
            "keyword5": {
                "value": "10元"
            }
        };
        callback(data)
    }
};