export interface GithubUser {
  id: number;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
}

export interface GiteeUser {
  id: number;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
}

export interface JwtPayload {
  sub: number;
  username: string;
  email: string;
}
