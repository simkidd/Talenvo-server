"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const mongoose_1 = require("mongoose");
const AuthSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    emailToken: { type: String },
    profile: { type: mongoose_1.Types.ObjectId, ref: "User" },
});
exports.Auth = (0, mongoose_1.model)("Auth", AuthSchema);
