"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("interfaces");
var MessageController_1 = __importDefault(require("controllers/MessageController"));
var WS = /** @class */ (function () {
    function WS(wsServer) {
        this._wsServer = wsServer;
        this._wsClients = {};
        this._createEventListeners();
    }
    WS.prototype._createEventListeners = function () {
        var _this = this;
        this._wsServer.on('connection', function (ws, req) {
            ws.data = req.jwtData;
            ws.token = req.token;
            if (Array.isArray(_this._wsClients[ws.data.id])) {
                _this._wsClients[ws.data.id].push(ws);
            }
            else {
                _this._wsClients[ws.data.id] = [ws];
            }
            ws.send('connection success');
            ws.on('message', function (msg) {
                var _msg = JSON.parse(msg.toString());
                switch (_msg.event) {
                    case interfaces_1.WsEvents.message:
                        MessageController_1.default.create(ws, _this._wsClients, _msg.chatId, _msg.text);
                    default:
                        break;
                }
            });
        });
    };
    Object.defineProperty(WS.prototype, "clients", {
        get: function () {
            return this._wsClients;
        },
        enumerable: false,
        configurable: true
    });
    return WS;
}());
exports.default = WS;
