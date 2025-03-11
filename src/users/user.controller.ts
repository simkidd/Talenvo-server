import { Router } from "express";
import { UserService } from "./user.service";
import { handleError } from "../utils/express.utils";
import { authGuard } from "../auth/auth.middleware";

export class UserController {
  router = Router();

  loadRoutes() {
    const staffService = new UserService();

    this.router.get("/", async (_, res) => {
      try {
        const staffs = await staffService.getUsers();
        res.json(staffs);
      } catch (error) {
        handleError(error, res);
      }
    });

    this.router.put("/update", authGuard, async (req, res) => {
      try {
        const staff = await staffService.updateUser(req.body);
        res.json(staff);
      } catch (error) {
        handleError(error, res);
      }
    });

    this.router.delete(
      "/delete/:id",

      async (req, res) => {
        try {
          const staff = await staffService.deleteUser(req.params.id);
          res.json(staff);
        } catch (error) {
          handleError(error, res);
        }
      }
    );

    this.router.get("/user/:id", authGuard, async (req, res) => {
      try {
        const staff = await staffService.getUserById(req.params.id);
        res.json(staff);
      } catch (error) {
        handleError(error, res);
      }
    });
    return this.router;
  }
}
