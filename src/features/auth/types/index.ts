export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RawUser {
  id: string;
  _id?: string;
  email: string;
  name?: string;
  role: {
    id: string;
    _id?: string;
    name: string;
    permissions: Array<string | { name: string }>;
  };
}
