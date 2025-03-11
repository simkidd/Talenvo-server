import { User, UsersDocument } from "./user.schema";
import { UpdateUserInput } from "./users.dto";

export class UserService {
  async getUsers(): Promise<UsersDocument[]> {
    try {
      return await User.find();
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async updateUser(input: UpdateUserInput): Promise<UsersDocument> {
    try {
      const user = await User.findById(input.id);
      if (!user) throw new Error("Staff not found");
      Object.assign(user, input);
      await user.save();
      return user;
    } catch (error) {
      throw new Error(String(error));
    }
  }
  public async deleteUser(id: string) {
    try {
      const user = await this.findUserById(id);
      await user.deleteOne();
      return user.id;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async getUserById(id: string) {
    return await this.findUserById(id);
  }

  private async findUserById(id: string): Promise<UsersDocument> {
    try {
      const user = await User.findById(id);
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
