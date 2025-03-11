"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryDelete = exports.cloudinaryUpload = exports.cloudinary = void 0;
const Cloudinary = __importStar(require("cloudinary"));
const config_utils_1 = require("./config.utils");
exports.cloudinary = Cloudinary.v2;
const options = {
    cloud_name: config_utils_1.config.CLOUDINARY_NAME,
    api_key: config_utils_1.config.CLOUDINARY_KEY,
    api_secret: config_utils_1.config.CLOUDINARY_SECRET,
};
exports.cloudinary.config(options);
const cloudinaryUpload = async (image) => {
    try {
        const res = await exports.cloudinary.uploader.upload(image, {
            fetch_format: "auto",
            crop: "scale",
            quality: "auto",
        });
        return res.secure_url;
    }
    catch (error) {
        console.log(error);
        throw new Error(String(error));
    }
};
exports.cloudinaryUpload = cloudinaryUpload;
const cloudinaryDelete = async (fileUrl) => {
    var _a, _b;
    const publicId = (_b = (_a = fileUrl === null || fileUrl === void 0 ? void 0 : fileUrl.split("/")) === null || _a === void 0 ? void 0 : _a.pop()) === null || _b === void 0 ? void 0 : _b.split(".")[0];
    await exports.cloudinary.uploader.destroy(String(publicId));
};
exports.cloudinaryDelete = cloudinaryDelete;
