var crypto = require('crypto');
var config = require('../../config/config');

module.exports.decryptData = (encryptedData, sessionKey, iv) => {
    var sessionKey = new Buffer(sessionKey, 'base64');
    encryptedData = new Buffer(encryptedData, 'base64');
    iv = new Buffer(iv, 'base64');

    try {
        // 解密
        var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
        decipher.setAutoPadding(true);
        var decoded = decipher.update(encryptedData, 'binary', 'utf8');
        decoded += decipher.final('utf8');

        decoded = JSON.parse(decoded)

    } catch (err) {
        throw new Error('Illegal Buffer')
    }

    if (decoded.watermark.appid !== config.appid) {
        throw new Error('Illegal Buffer')
    }

    return decoded
};
