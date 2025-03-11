"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_utils_1 = require("../utils/config.utils");
const user_schema_1 = require("../users/user.schema");
const authGuard = async (req, res, next) => {
    try {
        const authorization = req.headers["authorization"];
        if (!authorization) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        const token = authorization.split(" ")[1];
        const payload = (0, jsonwebtoken_1.verify)(token, config_utils_1.config.SECRET);
        if (!(payload === null || payload === void 0 ? void 0 : payload.id)) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        const user = await user_schema_1.User.findById(payload.id);
        if (!user) {
            return res.status(403).json({ message: "Invalid user ID" });
        }
        req.user = user;
        return next(); // ✅ Ensure `next()` is called to continue the request
    }
    catch (error) {
        return res.status(401).json({ message: "Authentication failed", error });
    }
};
exports.authGuard = authGuard;
