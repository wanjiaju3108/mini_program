var config = require('../../config/config');
const vactorLen = 256;

exports.Hex2Int = (data) => {
    var trimedStr = data.trim();
    var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
    var len = rawStr.length;
    if (len % 2 !== 0) {
        rawStr = "0" + rawStr;
    }
    var curCharCode;
    var resultStr = [];
    for (var i = 0; i < len; i += 2) {
        curCharCode = parseInt(rawStr.substr(i, 2), 16);
        resultStr.push(curCharCode);
    }
    return resultStr;
};

exports.Int2Hex = (data) => {
    var result = "";
    for (var i = 0; i < data.length; i++) {
        data[i] = data[i].toString(16);
        result += data[i];
    }
    return result;
};

exports.Int2Str = (data) => {
    var result = "";
    for (var i = 0; i < data.length; i++) {
        result += data[i];
    }
    return result;
};

exports.encodeAndDecodeStr = (data) => {
    var result = new Array();
    var key = config.arc4key;
    var i;
    var j = 0;
    var s = new Array(vactorLen);
    var k = new Array(vactorLen);
    var tmp = 0;
    for (i = 0; i < vactorLen; i++) {
        s[i] = i;
        k[i] = key[i % key.length];
    }
    for (i = 0; i < vactorLen; i++) {
        j = (j + s[i] + k[i]) % vactorLen;
        tmp = s[i];
        s[i] = s[j];
        s[j] = tmp;
    }

    i = 0;
    j = 0;
    var t = 0;
    tmp = 0;
    for (k = 0; k < data.length; k++) {
        i = (i + 1) % vactorLen;
        j = (j + s[i]) % vactorLen;
        tmp = s[i];
        s[i] = s[j];
        s[j] = tmp;
        t = (s[i] + s[j]) % vactorLen;
        result.push(data[k] ^ s[t]);
    }
    return result;
};