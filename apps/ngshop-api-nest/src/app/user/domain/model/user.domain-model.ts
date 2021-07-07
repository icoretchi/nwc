import * as bcrypt from 'bcryptjs';

export class User {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly passwordHash: string
  ) {}

  public async hashPassword(): Promise<User> {
    return new User(
      this.id,
      this.name,
      this.email,
      await bcrypt.hash(this.passwordHash, 10)
    );
  }

  public canLogin(password: string): Promise<boolean> {
    return this.arePasswordsEqual(password);
  }

  private async arePasswordsEqual(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }
}
