var arc4 = require('./arc4');
exports.getId = function (data) {
    return arc4.Int2Str(arc4.encodeAndDecodeStr(arc4.Hex2Int(data)));
};
exports.getToken = function (data) {
    return arc4.Int2Hex(arc4.encodeAndDecodeStr(data.toString()));
};