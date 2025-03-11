"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = require("express");
const user_service_1 = require("./user.service");
const express_utils_1 = require("../utils/express.utils");
const auth_middleware_1 = require("../auth/auth.middleware");
class UserController {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    loadRoutes() {
        const staffService = new user_service_1.UserService();
        this.router.get("/", async (_, res) => {
            try {
                const staffs = await staffService.getUsers();
                res.json(staffs);
            }
            catch (error) {
                (0, express_utils_1.handleError)(error, res);
            }
        });
        this.router.put("/update", auth_middleware_1.authGuard, async (req, res) => {
            try {
                const staff = await staffService.updateUser(req.body);
                res.json(staff);
            }
            catch (error) {
                (0, express_utils_1.handleError)(error, res);
            }
        });
        this.router.delete("/delete/:id", async (req, res) => {
            try {
                const staff = await staffService.deleteUser(req.params.id);
                res.json(staff);
            }
            catch (error) {
                (0, express_utils_1.handleError)(error, res);
            }
        });
        this.router.get("/user/:id", auth_middleware_1.authGuard, async (req, res) => {
            try {
                const staff = await staffService.getUserById(req.params.id);
                res.json(staff);
            }
            catch (error) {
                (0, express_utils_1.handleError)(error, res);
            }
        });
        return this.router;
    }
}
exports.UserController = UserController;
