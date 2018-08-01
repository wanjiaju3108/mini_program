var www = require('../bin/www');
module.exports = (req, res) => {
    www.sendWsMessage(req.body.message)
    res.end('')
};