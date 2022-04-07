"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ChatController_1 = __importDefault(require("controllers/ChatController"));
var MessageController_1 = __importDefault(require("controllers/MessageController"));
var middlewares_1 = require("middlewares");
var chatRouter = (0, express_1.Router)();
chatRouter.use(middlewares_1.checkAuth);
chatRouter.get('', ChatController_1.default.getChats);
chatRouter.post('/create', ChatController_1.default.create);
chatRouter.get('/:id', ChatController_1.default.get);
chatRouter.get('/:id/messages', MessageController_1.default.get);
exports.default = chatRouter;
