"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./core/config");
var express_1 = __importDefault(require("express"));
var database_1 = require("core/database");
var configureRoutes_1 = __importDefault(require("core/configureRoutes"));
(0, database_1.dbconnect)();
var app = (0, express_1.default)();
(0, configureRoutes_1.default)(app);
