var express = require('express');
var router = express.Router();

var user = require('../common/user');
var userUtils = require('../common/user/userUtils')

router.post('/getTokenByCode', (req, res) => {
    user.getUserByCode(req.body.code, result => {
        res.end(JSON.stringify(result))
    })
});

router.post('/getTokenbyAll', (req, res) => {
    user.getUserByAll(req.body.code, req.body.encryptedData, req.body.iv, result => {
        res.end(JSON.stringify(result))
    })
});

module.exports = router;