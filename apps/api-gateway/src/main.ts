import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      forbidUnknownValues: true,
      validationError: { target: false, value: false },
      exceptionFactory: (errors) => {
        return errors.map((err) => {
          return {
            property: err.property,
            constraints: err.constraints,
          };
        });
      },
    }),
  );

  await app.listen(port);
  Logger.log(
    `🌐 Gateway is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
