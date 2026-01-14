import type { User } from "../user";

export interface RegisterHttpParams {
  name: string;
  email: string;
  avatarUrl?: string;
  phone: string;
  password: string;
}

export interface RegisterHttpResponse {
  token: string;
  refreshToken: string;
  user: User;
}
