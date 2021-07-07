import { UniqueEntityID } from '@nwc/api/nest/shared/common';

import { UserId } from './user-id.domain-value-object';

describe('userId.value-object', () => {
  it('should create a valid userId', () => {
    const userId = UserId.create();
    expect(userId.isSuccess).toBe(true);
    expect(userId.getResult().id.toValue).toBeDefined();
  });

  it('should create a valid userId with value', () => {
    const userId = UserId.create(new UniqueEntityID('valid_id'));
    expect(userId.isSuccess).toBe(true);
    expect(userId.getResult().id.toValue()).toBe('valid_id');
  });
});
