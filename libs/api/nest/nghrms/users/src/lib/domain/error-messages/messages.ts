import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../value-objects';

export const ErrorMessages = {
  INVALID_NAME: 'Invalid name',
  INVALID_USERNAME: 'Invalid username',
  INVALID_EMAIL: 'Invalid email',
  INVALID_PASSWORD_LENGTH: `Password must have min ${PASSWORD_MIN_LENGTH} char and max ${PASSWORD_MAX_LENGTH} char`,
  OUT_OF_RANGE: 'out of range',
};

export const PropsNames = {
  USERNAME: 'Username',
};
