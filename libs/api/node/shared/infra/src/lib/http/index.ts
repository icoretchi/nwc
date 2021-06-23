import { authService } from '@nwc/api/node/shared/users';

import { Middleware } from './utils/Middleware';

const middleware = new Middleware(authService);

export { middleware };
