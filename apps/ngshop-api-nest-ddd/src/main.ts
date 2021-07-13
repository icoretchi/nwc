import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService } from '@nwc/api/nest/shared/config/app';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: AppConfigService = app.get('AppConfigService');

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const options = new DocumentBuilder()
    .setTitle('ngShop')
    .setDescription('ngShop REST API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.APP_PORT || 3333;
  const databasePort = process.env.DATABASE_PORT;
  const databaseUrl = process.env.DATABASE_URL;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
    Logger.log(`${config.name} Running in ${config.env} mode`);
    Logger.log(`Database port: ${databasePort} `);
    Logger.log(`Database url: ${databaseUrl} `);
  });
}

bootstrap();
