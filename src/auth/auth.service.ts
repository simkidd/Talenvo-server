import { compareSync, hashSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { config } from "../utils/config.utils";
import {
  CreateNewPasswordInput,
  LoginInput,
  LoginResponse,
  SignupInput,
  UpdatePasswordInput,
} from "./auth.dto";
import { Auth, AuthDocument } from "./auth.schema";
import { User, UsersDocument } from "../users/user.schema";
import { cloudinaryUpload } from "../utils/cloudinaryUpload";

export class AuthService {
  // signup
  public async signup(input: SignupInput): Promise<UsersDocument> {
    const { email, password, image, ...rest } = input;
    try {
      // check for duplicate email
      let auth = await Auth.findOne({ email });
      if (auth) throw new Error("Account already exist, log in instead");
      // create an instance of the auth
      auth = new Auth({ email });
      auth.password = this.hashPassword(password);

      // check if a user profile with the same email exist
      let user = await User.findOne({ email });

      if (!user) {

        let imageUrl = "";
      
      if (image) {
        
          imageUrl = await cloudinaryUpload(image);
        
      }
      

      user = new User(rest);
      if (imageUrl) user.image = imageUrl
        
        user.email = email;
        await user.save();
      }
      //  save th auth.profile to be user
      auth.profile = user;
      // save auth
      auth.save();

      // return auth id
      return user;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  // login
  public async login(input: LoginInput): Promise<LoginResponse> {
    const { email, password } = input;
    try {
      // find the user by email or throw error
      const auth = await Auth.findOne({ email });
      if (!auth) throw new Error("Account not registered");
      // validate the password
      this.comparePassword(password, auth.password);

      // get the user
      const user = await User.findById(auth.profile);
      if (!user) throw new Error("User not found");
      // create a token
      const token = sign({ id: user.id }, config.SECRET);
      const _id = user._id;
      const role = user.role;
      // return payload
      return {
        token,
        _id,
        email,
        role,
      };
    } catch (error) {
      throw new Error(String(error));
    }
  }
  async getAuths(): Promise<AuthDocument[]> {
    try {
      const auths = await Auth.find();

      return auths;
    } catch (error) {
      throw error;
    }
  }

  // delete auth
  async deleteAuth(id: string) {
    try {
      const auth = await Auth.findById(id);
      if (!auth) throw new Error("Auth user not found!");
      let user = await User.findById(auth.profile);
      if (user) {
        await user.deleteOne();
      }

      await auth.deleteOne();
      return auth.id;
    } catch (error) {
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
  async getMe(id: string): Promise<UsersDocument> {
    try {
      const user = await User.findById(id).populate("branch");
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new Error(String(error));
    }
  }
  // verify email

  // update password
  async updatePassword(input: UpdatePasswordInput): Promise<string> {
    const { email, currentPassword, newPassword } = input;
    const auth = await Auth.findOne({ email });
    if (!auth) throw new Error("User not found");
    try {
      // validate the current password
      this.comparePassword(currentPassword, auth.password);
      // hash the new password
      auth.password = this.hashPassword(newPassword);
      // save the updated auth record
      await auth.save();
      return "Password updated successfully";
    } catch (error) {
      throw error;
    }
  }
  // reset password

  async resetPassword(email: string): Promise<string> {
    if (!email) throw new Error("Email is required");

    const auth = await Auth.findOne({ email }).select("-password");
    if (!auth) throw new Error("Email not registered");

    auth.emailToken = this.generateOTP();
    try {
      // Here, you would send the OTP via email
      await auth.save();
      return auth.emailToken;
    } catch (error) {
      throw error;
    }
  }

  // change password
  async changePassword(input: CreateNewPasswordInput): Promise<string> {
    const auth = await Auth.findOne({ emailToken: input.emailToken });
    if (!auth) throw new Error("Invalid token");
    try {
      auth.password = this.hashPassword(input.password);
      auth.emailToken = ""; // Clear the token after use
      await auth.save();
      return auth.email;
    } catch (error) {
      throw error;
    }
  }
  // hash password
  private hashPassword(password: string): string {
    const hashedPassword = hashSync(password, 10);
    return hashedPassword;
  }

  // compare password
  private comparePassword(
    plainPassword: string,
    hashedPassword: string
  ): boolean {
    const isMatch = compareSync(plainPassword, hashedPassword);
    if (!isMatch) throw new Error("Email or password incorrect");
    return isMatch;
  }

  private generateOTP(): string {
    return (Math.floor(Math.random() * 90000) + 10000).toString();
  }
}
