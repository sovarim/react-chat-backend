"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = __importDefault(require("controllers/UserController"));
var middlewares_1 = require("middlewares");
var usersRouter = (0, express_1.Router)();
usersRouter.use(middlewares_1.checkAuth);
usersRouter.get('', UserController_1.default.get);
exports.default = usersRouter;
