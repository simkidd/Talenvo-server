"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    image: { type: String, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    courses: [{ type: mongoose_1.Types.ObjectId, ref: "Course", autopopulate: true }],
    role: {
        type: String,
        enum: ["teacher", "user"],
        default: "teacher",
    },
});
exports.User = (0, mongoose_1.model)("User", exports.UserSchema);
