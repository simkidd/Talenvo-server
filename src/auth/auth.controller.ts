import { Router, Request, Response } from "express";
import { handleError } from "../utils/express.utils";
import { AuthService } from "./auth.service";
import { authGuard, IRequest } from "./auth.middleware";

export class AuthController {
  router = Router();

  public loadRoutes() {
    /**
     * @swagger
     * /auth/me:
     *   get:
     *     summary: Get current authenticated user
     *     description: Returns the authenticated user's details
     *     tags:
     *       - Auth
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: User details retrieved successfully
     *       401:
     *         description: Unauthorized
     */
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

    /**
     * @swagger
     * /auth/signup:
     *   post:
     *     summary: User signup
     *     description: Create a new user account
     *     tags:
     *       - Auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               image:
     *                 type: string
     *                 example: "https://example.com/profile.jpg"
     *               firstName:
     *                 type: string
     *                 example: "John"
     *               lastName:
     *                 type: string
     *                 example: "Doe"
     *               email:
     *                 type: string
     *                 example: "user@example.com"
     *               password:
     *                 type: string
     *                 example: "password123"
     *               phone:
     *                 type: string
     *                 example: "+1234567890"
     *               address:
     *                 type: string
     *                 example: "123 Main Street, City, Country"
     *               gender:
     *                 type: string
     *                 enum: [Male, Female, Other]
     *                 example: "Male"
     *     responses:
     *       201:
     *         description: User created successfully
     *       400:
     *         description: Bad request
     */
    this.router.post("/signup", async (req: any, res: any) => {
      try {
        const input = req.body;
        const data = await new AuthService().signup(input);
        return res.send(data);
      } catch (error) {
        handleError(error, res);
      }
    });

    /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: User login
     *     description: Authenticates a user and returns a JWT token
     *     tags:
     *       - Auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: user@example.com
     *               password:
     *                 type: string
     *                 example: password123
     *     responses:
     *       200:
     *         description: Login successful
     *       401:
     *         description: Unauthorized
     */
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

    /**
     * @swagger
     * /auth/delete:
     *   delete:
     *     summary: Delete user account
     *     description: Deletes a user's account (requires authentication)
     *     tags:
     *       - Auth
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: string
     *                 example: 60d0fe4f5311236168a109ca
     *     responses:
     *       200:
     *         description: User deleted successfully
     *       401:
     *         description: Unauthorized
     */
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

    /**
     * @swagger
     * /auth/reset-password:
     *   post:
     *     summary: Reset user password
     *     description: Sends a password reset email to the user
     *     tags:
     *       - Auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: user@example.com
     *     responses:
     *       200:
     *         description: Password reset email sent
     */
    this.router.post("/reset-password", async (req, res) => {
      try {
        const { email } = req.body;
        const data = await new AuthService().resetPassword(email);
        res.json(data);
      } catch (error) {
        handleError(error, res);
      }
    });
    /**
     * @swagger
     * /auth/update-password:
     *   post:
     *     summary: update user password
     *     tags:
     *       - Auth
     *     responses:
     *       200:
     *         description: Password update
     */
    this.router.post("/update-password", async (req, res) => {
      try {
        const input = req.body;
        const data = await new AuthService().updatePassword(input);
        res.json(data);
      } catch (error) {
        handleError(error, res);
      }
    });

    /**
     * @swagger
     * /auth/change-password:
     *   post:
     *     summary: change user password
     *     tags:
     *       - Auth
     *     responses:
     *       200:
     *         description: Password update
     */
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
