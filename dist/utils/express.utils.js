"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (e, res, statusCode = 500) => {
    if (!e)
        return;
    const error = e;
    const message = error === null || error === void 0 ? void 0 : error.message;
    res.status(statusCode).json(message);
};
exports.handleError = handleError;
