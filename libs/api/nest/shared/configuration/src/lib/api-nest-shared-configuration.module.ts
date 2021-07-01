import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppConfigService } from './config/app/app-config.service';
import appConfig from './config/app/app.config';
import { MongooseConfigService } from './config/database/mongoose/mongoose-config.service';
import mongooseConfig from './config/database/mongoose/mongoose.config';
import { SequelizeOrmPostgresConfigService } from './config/database/sequelize/postgres/sequelize-orm-postgres-config.service';
import sequelizeOrmPostgresConfig from './config/database/sequelize/postgres/sequelize-orm-postgres.config';
import { TypeOrmPostgresConfigService } from './config/database/type-orm/postgres/type-orm-postgres-config.service';
import typeOrmPostgresConfig from './config/database/type-orm/postgres/type-orm-postgres.config';
import { validationSchema } from './validation-scheme';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        typeOrmPostgresConfig,
        sequelizeOrmPostgresConfig,
        mongooseConfig,
      ],
      validationSchema: validationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
  ],
  controllers: [],
  providers: [
    ConfigService,
    AppConfigService,
    TypeOrmPostgresConfigService,
    SequelizeOrmPostgresConfigService,
    MongooseConfigService,
  ],
  exports: [
    ConfigService,
    AppConfigService,
    TypeOrmPostgresConfigService,
    SequelizeOrmPostgresConfigService,
    MongooseConfigService,
  ],
})
export class ConfigurationModule {}
