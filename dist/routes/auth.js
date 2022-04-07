"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = __importDefault(require("controllers/UserController"));
var middlewares_1 = require("middlewares");
var authRouter = (0, express_1.Router)();
authRouter.post('/register', UserController_1.default.register);
authRouter.post('/login', UserController_1.default.login);
authRouter.get('/me', middlewares_1.checkAuth, UserController_1.default.me);
exports.default = authRouter;
