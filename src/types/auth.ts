export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    name: string;
    email: string;
    role: string;
  };
  message?: string;
}