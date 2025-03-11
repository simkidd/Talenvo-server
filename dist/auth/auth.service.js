"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_utils_1 = require("../utils/config.utils");
const auth_schema_1 = require("./auth.schema");
const user_schema_1 = require("../users/user.schema");
class AuthService {
    // signup
    async signup(input) {
        const { email, password, ...rest } = input;
        try {
            // check for duplicate email
            let auth = await auth_schema_1.Auth.findOne({ email });
            if (auth)
                throw new Error("Account already exist, log in instead");
            // create an instance of the auth
            auth = new auth_schema_1.Auth({ email });
            auth.password = this.hashPassword(password);
            // check if a user profile with the same email exist
            let user = await user_schema_1.User.findOne({ email });
            if (!user) {
                user = new user_schema_1.User(rest);
                user.email = email;
                await user.save();
            }
            //  save th auth.profile to be user
            auth.profile = user;
            // save auth
            auth.save();
            // return auth id
            return user;
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    // login
    async login(input) {
        const { email, password } = input;
        try {
            // find the user by email or throw error
            const auth = await auth_schema_1.Auth.findOne({ email });
            if (!auth)
                throw new Error("Account not registered");
            // validate the password
            this.comparePassword(password, auth.password);
            // get the user
            const user = await user_schema_1.User.findById(auth.profile);
            if (!user)
                throw new Error("User not found");
            // create a token
            const token = (0, jsonwebtoken_1.sign)({ id: user.id }, config_utils_1.config.SECRET);
            const _id = user._id;
            const role = user.role;
            // return payload
            return {
                token,
                _id,
                email,
                role,
            };
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    async getAuths() {
        try {
            const auths = await auth_schema_1.Auth.find();
            return auths;
        }
        catch (error) {
            throw error;
        }
    }
    // delete auth
    async deleteAuth(id) {
        try {
            const auth = await auth_schema_1.Auth.findById(id);
            if (!auth)
                throw new Error("Auth user not found!");
            let user = await user_schema_1.User.findById(auth.profile);
            if (user) {
                await user.deleteOne();
            }
            await auth.deleteOne();
            return auth.id;
        }
        catch (error) {
            throw error;
        }
    }
    // async deleteAuth(id: string) {
    //   try {
    //     const auth = await Auth.findById(id);
    //     if (!auth) throw new Error("Auth user not found!");
    //     auth.deleteOne();
    //     return auth.id;
    //   } catch (error) {
    //     throw error;
    //   }
    // }
    // get me
    async getMe(id) {
        try {
            const user = await user_schema_1.User.findById(id).populate("branch");
            if (!user)
                throw new Error("User not found");
            return user;
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    // verify email
    // update password
    async updatePassword(input) {
        const { email, currentPassword, newPassword } = input;
        const auth = await auth_schema_1.Auth.findOne({ email });
        if (!auth)
            throw new Error("User not found");
        try {
            // validate the current password
            this.comparePassword(currentPassword, auth.password);
            // hash the new password
            auth.password = this.hashPassword(newPassword);
            // save the updated auth record
            await auth.save();
            return "Password updated successfully";
        }
        catch (error) {
            throw error;
        }
    }
    // reset password
    async resetPassword(email) {
        if (!email)
            throw new Error("Email is required");
        const auth = await auth_schema_1.Auth.findOne({ email }).select("-password");
        if (!auth)
            throw new Error("Email not registered");
        auth.emailToken = this.generateOTP();
        try {
            // Here, you would send the OTP via email
            await auth.save();
            return auth.emailToken;
        }
        catch (error) {
            throw error;
        }
    }
    // change password
    async changePassword(input) {
        const auth = await auth_schema_1.Auth.findOne({ emailToken: input.emailToken });
        if (!auth)
            throw new Error("Invalid token");
        try {
            auth.password = this.hashPassword(input.password);
            auth.emailToken = ""; // Clear the token after use
            await auth.save();
            return auth.email;
        }
        catch (error) {
            throw error;
        }
    }
    // hash password
    hashPassword(password) {
        const hashedPassword = (0, bcryptjs_1.hashSync)(password, 10);
        return hashedPassword;
    }
    // compare password
    comparePassword(plainPassword, hashedPassword) {
        const isMatch = (0, bcryptjs_1.compareSync)(plainPassword, hashedPassword);
        if (!isMatch)
            throw new Error("Email or password incorrect");
        return isMatch;
    }
    generateOTP() {
        return (Math.floor(Math.random() * 90000) + 10000).toString();
    }
}
exports.AuthService = AuthService;
