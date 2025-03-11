export interface SignupInput {
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  gender: string;
  role: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  _id: string;
  email: string;
  role: string;
}

export interface ResetPasswordInput {
  email: string;
}
export interface CreateNewPasswordInput {
  emailToken: string;
  password: string;
}
export interface UpdatePasswordInput {
  email: string;
  currentPassword: string;
  newPassword: string;
}
