"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var TokenService = /** @class */ (function () {
    function TokenService() {
    }
    TokenService.generateUserTokens = function (user) {
        var _user = {
            id: user._id,
            username: user.username,
            email: user.email,
        };
        var accessToken = this._createToken(_user, process.env.ACCESS_EXPIRATION);
        var refreshToken = this._createToken(_user, process.env.REFRESH_EXPIRATION);
        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    };
    TokenService._createToken = function (data, expiresIn) {
        return jsonwebtoken_1.default.sign({
            data: data,
        }, process.env.JWT_KEY, {
            expiresIn: expiresIn,
            algorithm: 'HS256',
        });
    };
    TokenService.verify = function (token) {
        try {
            var decodedJwt = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
            return { decodedJwt: decodedJwt, error: null };
        }
        catch (error) {
            return { decodedJwt: null, error: error };
        }
    };
    return TokenService;
}());
exports.default = TokenService;
