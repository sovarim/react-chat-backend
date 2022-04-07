"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ChatSchema = new mongoose_1.Schema({
    users: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'User',
        required: true,
        validate: function (arr) { return arr.length <= 2; },
    },
    messages: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Message',
        },
    ],
    lastMessage: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Message',
    },
});
var ChatModel = (0, mongoose_1.model)('Chat', ChatSchema);
exports.default = ChatModel;
