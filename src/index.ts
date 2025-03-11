import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import { config } from "./utils/config.utils";
import { UserController } from "./users/user.controller";
import { AuthController } from "./auth/auth.controller";
import { CourseController } from "./courses/course.controller";
import { setupSwagger } from "./utils/swagger.config";
const PORT = Number(process.env.PORT) || 8000;

const app = express();
class Server {
  private userRoutes = new UserController().loadRoutes();
  private authRoutes = new AuthController().loadRoutes();
  private courseRoutes = new CourseController().loadRoutes();

  public async initDB() {
    await connectDB(config.MONGO_URI);
  }

  public async loadControllers() {
    app.use(express.json({ limit: "50mb" }));
    app.use(cors({ origin: true }));
    app.get("/", (_, res) => {
      res.send("Talenvo API is running 🚀");
    });
    app.use("/users", this.userRoutes);
    app.use("/auth", this.authRoutes);
    app.use("/courses", this.courseRoutes);
  }
  public run() {
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
    setupSwagger(app);
  }
}

(async () => {
  try {
    const server = new Server();
    await server.initDB();
    await server.loadControllers();
    server.run();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
