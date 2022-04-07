"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var http_1 = require("http");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var auth_1 = __importDefault(require("routes/auth"));
var chats_1 = __importDefault(require("routes/chats"));
var users_1 = __importDefault(require("routes/users"));
var configureWebSocketServer_1 = __importDefault(require("core/configureWebSocketServer"));
exports.default = (function (app) {
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({
        extended: true,
    }));
    app.use((0, cors_1.default)());
    app.use((0, cookie_parser_1.default)());
    app.get('/ss', function (_, res) { return res.send('Hello'); });
    app.use('/auth', auth_1.default);
    app.use('/chats', chats_1.default);
    app.use('/users', users_1.default);
    var server = (0, http_1.createServer)(app);
    (0, configureWebSocketServer_1.default)(server);
    server.listen(process.env.PORT || 5000, function () {
        console.log("Server runned on PORT: ".concat(process.env.PORT || 8001));
    });
});
