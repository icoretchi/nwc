export interface TokenProviderPort {
  signToken(id: string, email: string): string;
}

export const TOKEN_PROVIDER_PORT = Symbol('TOKEN_PROVIDER_PORT');
