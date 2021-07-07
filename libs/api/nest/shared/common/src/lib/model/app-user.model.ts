export abstract class AppUser {
  protected constructor(readonly email: string, readonly id: string) {}

  abstract get isAuthenticated(): boolean;
}

export class AuthenticatedUser extends AppUser {
  constructor(email: string, id: string) {
    super(email, id);
  }

  get isAuthenticated(): boolean {
    return true;
  }
}

export class AnonymousUser extends AppUser {
  constructor() {
    super('', null as string);
  }

  get isAuthenticated(): boolean {
    return false;
  }
}
