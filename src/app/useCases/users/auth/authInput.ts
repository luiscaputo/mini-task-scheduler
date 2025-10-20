export interface AuthInput {
  email: string;
  password: string;
}

export interface AuthOutput extends Omit<AuthInput, "password"> {
  id: string;
  token: string;
}
