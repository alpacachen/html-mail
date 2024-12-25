export interface OAuthUser {
  id: number;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
}

export type GithubUser = OAuthUser;
export type GiteeUser = OAuthUser;

export interface JwtPayload {
  sub: number;
  username: string;
  email: string;
}
