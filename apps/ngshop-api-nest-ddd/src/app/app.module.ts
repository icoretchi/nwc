import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { UserUiRestModule } from '@nwc/api/nest/ngshop/user/ui-rest';
import { SelfValidationErrorFilter } from '@nwc/api/nest/shared/common';
import {
  ExcludePropertiesClassSerializerInterceptor,
  JwtAuthGuard,
  RequireAuthGuard,
  SelfValidationError,
} from '@nwc/api/nest/shared/common';
import { AppConfigModule } from '@nwc/api/nest/shared/config/app';
import { AuthConfigModule } from '@nwc/api/nest/shared/config/auth';
import {
  MongooseConfigModule,
  MongooseConfigService,
} from '@nwc/api/nest/shared/config/database/mongoose';
import { TypeOrmConfigModule } from '@nwc/api/nest/shared/config/database/typeorm';

@Module({
  imports: [
    AppConfigModule,
    AuthConfigModule,
    TypeOrmConfigModule,
    MongooseConfigModule,
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    UserUiRestModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        exceptionFactory: (errors) => {
          throw SelfValidationError.fromValidationError(errors);
        },
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ExcludePropertiesClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RequireAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: SelfValidationErrorFilter,
    },
  ],
})
export class AppModule {}
