import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: false,
      enableDebugMessages: true,
      transformOptions: { enableImplicitConversion: true, exposeDefaultValues: true },
    }),
  );

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Game API service')
    .setDescription('Backend API service for games')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);

  const port = configService.getOrThrow('PORT');
  await app.listen(port);
}
bootstrap();
