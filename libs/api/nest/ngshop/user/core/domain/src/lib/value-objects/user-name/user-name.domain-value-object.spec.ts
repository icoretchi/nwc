import { ErrorMessages } from '../../error-messages/messages';
import { UserName } from './user-name.domain-value-object';
describe('user-name-value-object.ts', () => {
  it('should return a valid name', () => {
    const name = UserName.create({ name: 'valid_name' });

    expect(name.isSuccess).toBe(true);
    expect(name.getResult().value).toBe('valid_name');
  });

  it('should return fail if provide an invalid name', () => {
    const email = UserName.create({ name: '' });

    expect(email.isFailure).toBe(true);
    expect(email.error).toBe(ErrorMessages.INVALID_NAME);
  });
});
