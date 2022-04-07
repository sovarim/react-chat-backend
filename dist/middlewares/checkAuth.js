"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("helpers");
var TokenService_1 = __importDefault(require("services/TokenService"));
var checkAuth = function (req, res, next) {
    var invalidMsg = 'invalid token';
    var token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ msg: invalidMsg });
    }
    var bearerToken = (0, helpers_1.parseBearer)(token);
    if (!bearerToken) {
        return res.status(401).json({ msg: invalidMsg });
    }
    var _a = TokenService_1.default.verify(bearerToken), decodedJwt = _a.decodedJwt, error = _a.error;
    if (error) {
        return res.status(401).json({ msg: invalidMsg });
    }
    req.user = decodedJwt.data;
    next();
};
exports.default = checkAuth;
