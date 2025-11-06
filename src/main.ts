import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const host = process.env.MS_ACTIVOS_HOST || '0.0.0.0';
  const port = parseInt(process.env.MS_ACTIVOS_PORT || '3002', 10);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.TCP,
    options: {
      host: host,
      port: port,
    },
  });
  await app.listen();

  console.log(`ACTIVOS microservice is running on: ${host}:${port}`);
}
bootstrap();
