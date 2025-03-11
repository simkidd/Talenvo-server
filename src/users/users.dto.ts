export interface CreateInput {
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

export interface UpdateUserInput {
  id: string;
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
