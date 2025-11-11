import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const host = process.env.MS_ACTIVOS_HOST || '0.0.0.0';
  const port = parseInt(process.env.MS_ACTIVOS_PORT || '3002', 10);
  const kafkaBroker = process.env.KAFKA_BROKER || 'localhost:9092';

  // Crear aplicación híbrida: TCP para microservicios y Kafka para eventos
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: host,
      port: port,
    },
  });

  // Luego… ¿cómo añadir Kafka? Opción A: iniciar otro microservicio separado
  const kafkaMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'sindicato-activos-ms',
        brokers: [ kafkaBroker ],
      },
      consumer: {
        groupId: 'activos-ms-consumer',
      },
    },
  });

  await Promise.all([
    app.listen(),                        // Inicia TCP servicio
    kafkaMicroservice.listen(),         // Inicia Kafka servicio
  ]);

  console.log(`Microservicio TCP escuchando en ${host}:${port}`);
  console.log(`Microservicio Kafka conectado a brokers ${kafkaBroker}`);
}
bootstrap();
