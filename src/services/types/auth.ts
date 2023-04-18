import { TUser } from "./data";

export type TTokens = {
  accessToken: string;
  refreshToken: string;
}

export type TUserResponce = TTokens & {
  user: TUser
}

export type TDefaultResponce = {
  message: string;
}
