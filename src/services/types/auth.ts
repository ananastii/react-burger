import { TUser } from "./data";

export type TTokens = {
  accessToken: string;
  refreshToken: string;
}

export type TUserRequest = TUser & { password: string }

export type TUserResponce = TTokens & {
  user: TUser
}

export type TPasswordResetRequest = {
  password: string;
  token: string;
}

export type TDefaultResponce = {
  message: string;
}
