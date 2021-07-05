import { DynamicModule, Inject, Module, OnModuleDestroy } from '@nestjs/common';

import { DB_CON_TOKEN } from './database.constants';
import { createDatabaseProviders } from './database.providers';

@Module({})
export class DatabaseModule implements OnModuleDestroy {
  static forRoot(entities = []): DynamicModule {
    const providers = createDatabaseProviders(entities);
    return {
      global: true,
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }

  constructor(@Inject(DB_CON_TOKEN) private readonly dbConnection) {}

  public onModuleDestroy(): void {
    this.dbConnection.close();
  }
}
