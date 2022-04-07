"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ws = void 0;
var ws_1 = require("ws");
var url_parse_1 = __importDefault(require("url-parse"));
var TokenService_1 = __importDefault(require("services/TokenService"));
var ws_2 = __importDefault(require("routes/ws"));
exports.default = (function (server) {
    var wsServer = new ws_1.WebSocketServer({
        server: server,
        //@ts-ignore
        verifyClient: function (info, done) {
            var token = (0, url_parse_1.default)(info.req.url, true).query.token || '';
            var _a = TokenService_1.default.verify(token), decodedJwt = _a.decodedJwt, error = _a.error;
            if (error) {
                return done(false, 401);
            }
            info.req.jwtData = decodedJwt.data;
            info.req.token = token;
            done(true);
        },
    });
    exports.ws = new ws_2.default(wsServer);
});
