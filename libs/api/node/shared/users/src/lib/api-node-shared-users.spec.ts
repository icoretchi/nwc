import { apiNodeSharedUsers } from './api-node-shared-users';

describe('apiNodeSharedUsers', () => {
  it('should work', () => {
    expect(apiNodeSharedUsers()).toEqual('api-node-shared-users');
  });
});
