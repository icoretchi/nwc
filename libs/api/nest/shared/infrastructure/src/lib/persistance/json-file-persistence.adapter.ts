import * as fs from 'fs';

import { JsonFilesPersistence } from '@nwc/api/nest/shared/port';

export class JsonFilePersistenceAdapter implements JsonFilesPersistence {
  constructor(private filePath: string) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  getFileData<Object>(): Promise<Object> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  }

  save(data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
