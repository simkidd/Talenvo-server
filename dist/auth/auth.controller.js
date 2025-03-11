"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_1 = require("express");
const express_utils_1 = require("../utils/express.utils");
const auth_service_1 = require("./auth.service");
const auth_middleware_1 = require("./auth.middleware");
class AuthController {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    loadRoutes() {
        this.router.get("/me", auth_middleware_1.authGuard, async (req, res) => {
            try {
                const user = req.user;
                return res.send(user);
            }
            catch (error) {
                (0, express_utils_1.handleError)(error, res);
            }
        });
        // signup
        this.router.post("/signup", async (req, res) => {
            try {
                const input = req.body;
                const data = await new auth_service_1.AuthService().signup(input);
                return res.send(data);
            }
            catch (error) {
                (0, express_utils_1.handleError)(error, res);
            }
        });
        // login
        this.router.post("/login", async (req, res) => {
            try {
                const input = req.body;
                const data = await new auth_service_1.AuthService().login(input);
                return res.send(data);
            }
            catch (error) {
                (0, express_utils_1.handleError)(error, res);
            }
        });
        // delete auth
        this.router.delete("/delete", auth_middleware_1.authGuard, async (req, res) => {
            try {
                const id = req.body.id;
                const auth = await new auth_service_1.AuthService().deleteAuth(id);
                res.json(auth);
            }
            catch (error) {
                (0, express_utils_1.handleError)(error, res);
            }
        });
        this.router.get("/get-auths", async (_, res) => {
            try {
                const auths = await new auth_service_1.AuthService().getAuths();
                res.json(auths);
            }
            catch (error) {
                (0, express_utils_1.handleError)(error, res);
            }
        });
        this.router.get("/:id", async (req, res) => {
            try {
                const auths = await new auth_service_1.AuthService().getMe(req.params.id);
                res.json(auths);
            }
            catch (error) {
                (0, express_utils_1.handleError)(error, res);
            }
        });
        // this.router.get("/me", authGuard, async (req, res) => {
        //   try {
        //     const user = await new AuthService().getMe(req.params.id);
        //     res.send(user);
        //   } catch (error) {
        //     handleError(error, res);
        //   }
        // });
        this.router.post("/reset-password", async (req, res) => {
            try {
                const { email } = req.body;
                const data = await new auth_service_1.AuthService().resetPassword(email);
                res.json(data);
            }
            catch (error) {
                (0, express_utils_1.handleError)(error, res);
            }
        });
        this.router.post("/update-password", async (req, res) => {
            try {
                const input = req.body;
                const data = await new auth_service_1.AuthService().updatePassword(input);
                res.json(data);
            }
            catch (error) {
                (0, express_utils_1.handleError)(error, res);
            }
        });
        // Change password
        this.router.post("/change-password", async (req, res) => {
            try {
                const input = req.body;
                const data = await new auth_service_1.AuthService().changePassword(input);
                res.send({ message: `Password changed successfully for ${data}` });
            }
            catch (error) {
                (0, express_utils_1.handleError)(error, res);
            }
        });
        return this.router;
    }
}
exports.AuthController = AuthController;
