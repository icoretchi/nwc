import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService } from '@nwc/api/nest/shared/config/app';

import { AppModule } from './app/app.module';

const GLOBAL_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot(), {
    logger:
      process.env.NODE_ENV == 'development'
        ? ['debug', 'error', 'log', 'verbose', 'warn']
        : ['error', 'warn'],
  });
  app.useGlobalPipes(new ValidationPipe());
  const config: AppConfigService = app.get('AppConfigService');

  app.setGlobalPrefix(GLOBAL_PREFIX);

  const options = new DocumentBuilder()
    .setTitle('ngShop')
    .setDescription('ngShop REST API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${GLOBAL_PREFIX}-docs`, app, document);

  const port = process.env.APP_PORT || 3333;
  const databasePort = process.env.DATABASE_PORT;
  const databaseUrl = process.env.DATABASE_URL;

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + GLOBAL_PREFIX);
    Logger.log(`${config.name} Running in ${config.env}`);
    Logger.log(`Database port: ${databasePort} `);
    Logger.log(`Database url: ${databaseUrl} `);
  });
}

bootstrap();
