export interface AccessTokenDto {
  access_token: string;
}

export function isAccessToken(arg: any): arg is AccessTokenDto {
  return arg && arg.access_token;
}
