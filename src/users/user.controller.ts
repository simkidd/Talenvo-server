import { Router } from "express";
import { UserService } from "./user.service";
import { handleError } from "../utils/express.utils";
import { authGuard } from "../auth/auth.middleware";

export class UserController {
  router = Router();

  loadRoutes() {
    const staffService = new UserService();

    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Get all users
     *     description: Fetch a list of all registered users.
     *     tags:
     *       - Users
     *     responses:
     *       200:
     *         description: A list of users.
     *       500:
     *         description: Internal server error
     */
    this.router.get("/", async (_, res) => {
      try {
        const staffs = await staffService.getUsers();
        res.json(staffs);
      } catch (error) {
        handleError(error, res);
      }
    });

    /**
     * @swagger
     * /users/update:
     *   put:
     *     summary: Update user details
     *     description: Allows an authenticated user to update their details.
     *     tags:
     *       - Users
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
     *                 example: "12345"
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
     *         description: User updated successfully
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     */
    this.router.put("/update", authGuard, async (req, res) => {
      try {
        const staff = await staffService.updateUser(req.body);
        res.json(staff);
      } catch (error) {
        handleError(error, res);
      }
    });

    /**
     * @swagger
     * /users/delete/{id}:
     *   delete:
     *     summary: Delete a user
     *     description: Deletes a user by their ID.
     *     tags:
     *       - Users
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the user to be deleted
     *     responses:
     *       200:
     *         description: User deleted successfully
     *       404:
     *         description: User not found
     *       500:
     *         description: Internal server error
     */
    this.router.delete("/delete/:id", async (req, res) => {
      try {
        const staff = await staffService.deleteUser(req.params.id);
        res.json(staff);
      } catch (error) {
        handleError(error, res);
      }
    });

    /**
     * @swagger
     * /users/user/{id}:
     *   get:
     *     summary: Get user by ID
     *     description: Fetch user details by their ID.
     *     tags:
     *       - Users
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the user
     *     responses:
     *       200:
     *         description: User details retrieved successfully
     *       404:
     *         description: User not found
     *       500:
     *         description: Internal server error
     */
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
