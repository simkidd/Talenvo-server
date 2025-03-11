"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = exports.CourseSechema = void 0;
const mongoose_1 = require("mongoose");
exports.CourseSechema = new mongoose_1.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    subject: { type: String, require: true },
    description: { type: String, required: true },
    course: { type: String, required: true },
    resourceUrl: { type: String, required: true },
    uploadedBy: { type: mongoose_1.Types.ObjectId, ref: "User", autopopulate: true },
});
exports.Course = (0, mongoose_1.model)("Course", exports.CourseSechema);
