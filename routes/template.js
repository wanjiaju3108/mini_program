var userUtiles = require('../common/user/userUtils');
var express = require('express');
var router = express.Router();

var template = require('../common/template');

router.post('/sendTemplate', (req, res) => {
    template.getToken(result => {
        template.sendTemplate(userUtiles.getId(req.body.token), result)
    });
    res.end("")
});

router.post('/pushFormId', (req, res) => {
    template.pushFormId(userUtiles.getId(req.body.token), req.body.formId)
    res.end("")
});

module.exports = router;