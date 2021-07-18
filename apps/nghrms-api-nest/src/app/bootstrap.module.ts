import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { SelfValidationErrorFilter } from '@nwc/api/nest/nghrms/shared/common';
import {
  ExcludePropertiesClassSerializerInterceptor,
  JwtAuthGuard,
  RequireAuthGuard,
  SelfValidationError,
} from '@nwc/api/nest/nghrms/shared/common';
import { UserModule } from '@nwc/api/nest/nghrms/users';
import { AppConfigModule } from '@nwc/api/nest/shared/config/app';
import { AuthConfigModule } from '@nwc/api/nest/shared/config/auth';
import {
  MongooseConfigModule,
  MongooseConfigService,
} from '@nwc/api/nest/shared/config/database/mongoose';

@Module({
  imports: [
    AppConfigModule,
    AuthConfigModule,
    MongooseConfigModule,
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    UserModule,
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
export class BootstrapModule {}
