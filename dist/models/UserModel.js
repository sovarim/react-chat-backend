"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bcrypt_1 = require("bcrypt");
var UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: String,
    lastVisit: {
        type: Date,
        default: new Date(),
    },
}, {
    timestamps: true,
});
UserSchema.pre('save', function (next) {
    this.password = (0, bcrypt_1.hashSync)(this.password, 10);
    next();
});
UserSchema.methods.isCorrectPassword = function (password) {
    return (0, bcrypt_1.compareSync)(password, this.password);
};
UserSchema.index({ username: 'text' });
var UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.default = UserModel;
