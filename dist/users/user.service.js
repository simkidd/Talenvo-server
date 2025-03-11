"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_schema_1 = require("./user.schema");
class UserService {
    async getUsers() {
        try {
            return await user_schema_1.User.find();
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    async updateUser(input) {
        try {
            const user = await user_schema_1.User.findById(input.id);
            if (!user)
                throw new Error("Staff not found");
            Object.assign(user, input);
            await user.save();
            return user;
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    async deleteUser(id) {
        try {
            const user = await this.findUserById(id);
            await user.deleteOne();
            return user.id;
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    async getUserById(id) {
        return await this.findUserById(id);
    }
    async findUserById(id) {
        try {
            const user = await user_schema_1.User.findById(id);
            if (!user)
                throw new Error("User not found");
            return user;
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
}
exports.UserService = UserService;
