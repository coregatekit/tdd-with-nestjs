import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerFactory } from './utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerFactory('RegistrationApps'),
  });
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
