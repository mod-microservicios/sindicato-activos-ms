import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './apps/configurations/prisma/prisma.module';
import { VehiculosModule } from './apps/vehiculos/vehiculos.module';
import { UserModule } from './apps/user/user.module';
import { KafkaModule } from './apps/configurations/kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // hace que las variables estén disponibles en toda la app
    }),
    PrismaModule,
    VehiculosModule,
    UserModule,
    KafkaModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
