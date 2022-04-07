"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (token) {
    var Bearer = 'Bearer';
    var splittedToken = token.split(' ');
    if (splittedToken[0] !== Bearer)
        return false;
    return splittedToken[1];
});
