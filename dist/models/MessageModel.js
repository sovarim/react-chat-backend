"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var MessageSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    chat: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true,
    },
    text: String,
}, {
    timestamps: true,
});
var MessageModel = (0, mongoose_1.model)('Message', MessageSchema);
exports.default = MessageModel;
