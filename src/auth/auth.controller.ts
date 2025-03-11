import { Router, Request, Response } from "express";
import { handleError } from "../utils/express.utils";
import { AuthService } from "./auth.service";
import { authGuard, IRequest } from "./auth.middleware";

export class AuthController {
  router = Router();

  public loadRoutes() {
    this.router.get(
      "/me",
      authGuard,
      async (req: IRequest | any, res: Response | any) => {
        try {
          const user = req.user;
          return res.send(user);
        } catch (error) {
          handleError(error, res);
        }
      }
    );

    // signup
    this.router.post("/signup", async (req: any, res: any) => {
      try {
        const input = req.body;
        const data = await new AuthService().signup(input);
        return res.send(data);
      } catch (error) {
        handleError(error, res);
      }
    });

    // login
    this.router.post(
      "/login",
      async (req: Request | any, res: Response | any) => {
        try {
          const input = req.body;
          const data = await new AuthService().login(input);
          return res.send(data);
        } catch (error) {
          handleError(error, res);
        }
      }
    );

    // delete auth
    this.router.delete("/delete", authGuard, async (req, res) => {
      try {
        const id = req.body.id;
        const auth = await new AuthService().deleteAuth(id);
        res.json(auth);
      } catch (error) {
        handleError(error, res);
      }
    });
    this.router.get("/get-auths", async (_, res: Response) => {
      try {
        const auths = await new AuthService().getAuths();
        res.json(auths);
      } catch (error) {
        handleError(error, res);
      }
    });
    this.router.get("/:id", async (req: Request, res: Response) => {
      try {
        const auths = await new AuthService().getMe(req.params.id);
        res.json(auths);
      } catch (error) {
        handleError(error, res);
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
        const data = await new AuthService().resetPassword(email);
        res.json(data);
      } catch (error) {
        handleError(error, res);
      }
    });
    this.router.post("/update-password", async (req, res) => {
      try {
        const input = req.body;
        const data = await new AuthService().updatePassword(input);
        res.json(data);
      } catch (error) {
        handleError(error, res);
      }
    });
    // Change password
    this.router.post("/change-password", async (req, res) => {
      try {
        const input = req.body;
        const data = await new AuthService().changePassword(input);
        res.send({ message: `Password changed successfully for ${data}` });
      } catch (error) {
        handleError(error, res);
      }
    });
    return this.router;
  }
}
