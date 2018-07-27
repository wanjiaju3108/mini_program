var userUtiles = require('../common/user/userUtils');
var config = require('../config/config');
var template = require('../common/template');
var express = require('express');
var router = express.Router();


router.post('/sendBuyTemplate', (req, res) => {
    template.getToken(result => {
        template.getTemplateData(1, data => {
            template.sendTemplate(userUtiles.getId(req.body.token), result, config.buyTemplateId, data)
        });
    });
    res.end("")
});

router.post('/pushFormId', (req, res) => {
    template.pushFormId(userUtiles.getId(req.body.token), req.body.formId);
    res.end("")
});

module.exports = router;