"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const config_utils_1 = require("./utils/config.utils");
const user_controller_1 = require("./users/user.controller");
const auth_controller_1 = require("./auth/auth.controller");
const course_controller_1 = require("./courses/course.controller");
const PORT = Number(process.env.PORT) || 8000;
const app = (0, express_1.default)();
class Server {
    constructor() {
        this.userRoutes = new user_controller_1.UserController().loadRoutes();
        this.authRoutes = new auth_controller_1.AuthController().loadRoutes();
        this.courseRoutes = new course_controller_1.CourseController().loadRoutes();
    }
    async initDB() {
        await (0, db_1.default)(config_utils_1.config.MONGO_URI);
    }
    async loadControllers() {
        app.use(express_1.default.json({ limit: "50mb" }));
        app.use((0, cors_1.default)({ origin: true }));
        app.get("/", (_, res) => {
            res.send("Talenvo API is running 🚀");
        });
        app.use("/users", this.userRoutes);
        app.use("/auth", this.authRoutes);
        app.use("/courses", this.courseRoutes);
    }
    run() {
        app.listen(PORT, () => {
            console.log(`server started on port ${PORT}`);
        });
    }
}
(async () => {
    try {
        const server = new Server();
        await server.initDB();
        await server.loadControllers();
        server.run();
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
