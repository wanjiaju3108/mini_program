exports.uuid = function() {
    var s = [];
    var hexDigits = "0123456789";
    for (var i = 0; i < 19; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    return s.join("");
}