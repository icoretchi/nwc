import { v4 as uuidV4 } from 'uuid';

import { Identifier } from './identifier.base';

export class UniqueEntityID extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id ? id : uuidV4());
  }
}
