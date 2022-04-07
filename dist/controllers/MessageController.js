"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MessageModel_1 = __importDefault(require("models/MessageModel"));
var ChatModel_1 = __importDefault(require("models/ChatModel"));
var MessageController = /** @class */ (function () {
    function MessageController() {
    }
    MessageController.create = function (ws, wsClients, chatId, text) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var message_1, chat, participantId, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, MessageModel_1.default.create({ user: (_a = ws.data) === null || _a === void 0 ? void 0 : _a.id, chat: chatId, text: text })];
                    case 1:
                        message_1 = _d.sent();
                        return [4 /*yield*/, ChatModel_1.default.findByIdAndUpdate(chatId, {
                                $push: { messages: message_1.id },
                                lastMessage: message_1.id,
                            })];
                    case 2:
                        chat = _d.sent();
                        participantId = String(chat === null || chat === void 0 ? void 0 : chat.users.find(function (user) { var _a; return String(user) !== ((_a = ws.data) === null || _a === void 0 ? void 0 : _a.id); }));
                        // отправка сообщения собеседнику для всех устройств авторизованных под этим аккаунтом
                        if (wsClients[participantId]) {
                            wsClients[participantId].forEach(function (wsClient) {
                                return wsClient.send(JSON.stringify({ event: 'message', data: message_1 }));
                            });
                        }
                        // отправка сообщения самому отправителю для всех устройств авторизованных под этим аккаунтом
                        if (wsClients[(_b = ws.data) === null || _b === void 0 ? void 0 : _b.id]) {
                            wsClients[(_c = ws.data) === null || _c === void 0 ? void 0 : _c.id].forEach(function (wsClient) {
                                return wsClient.send(JSON.stringify({ event: 'message', data: message_1 }));
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _d.sent();
                        ws.send(JSON.stringify({ status: 'ERROR', error: error_1 }));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MessageController.get = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var params, chat, messages, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        params = req.params;
                        return [4 /*yield*/, ChatModel_1.default.findById(params.id)];
                    case 1:
                        chat = _a.sent();
                        if (!(chat && chat.users.includes(req.user.id))) return [3 /*break*/, 3];
                        return [4 /*yield*/, MessageModel_1.default.find({ chat: params.id })];
                    case 2:
                        messages = _a.sent();
                        return [2 /*return*/, res.status(200).json(messages)];
                    case 3:
                        res.status(403).json({ msg: 'Forbidden' });
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        res.status(500).json(error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return MessageController;
}());
exports.default = MessageController;
