import { ErrorMessages } from '../../error-messages/messages';
import { UserEmail } from './user-email.value-object';
describe('email-value-object.ts', () => {
  it('should return a valid email', () => {
    const email = UserEmail.create({ value: 'valid_mail@domain.com' });

    expect(email.isSuccess).toBe(true);
    expect(email.getResult().value).toBe('valid_mail@domain.com');
  });

  it('should return fail if provide an invalid email', () => {
    const email = UserEmail.create({ value: 'invalid_email' });

    expect(email.isFailure).toBe(true);
    expect(email.error).toBe(ErrorMessages.INVALID_EMAIL);
  });

  it('should normalize email to lowercause', () => {
    const email = UserEmail.create({ value: 'vaLID_Mail@DOmaIN.com' });
    expect(email.getResult().value).toBe('valid_mail@domain.com');
  });
});
