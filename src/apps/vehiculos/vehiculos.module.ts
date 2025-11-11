import { Module } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { VehiculosController } from './vehiculos.controller';
import { PrismaModule } from 'src/apps/configurations/prisma/prisma.module';

import { UserModule } from '../user/user.module';
import { KafkaModule } from '../configurations/kafka/kafka.module';

@Module({
  imports: [PrismaModule, KafkaModule, UserModule],
  controllers: [VehiculosController],
  providers: [VehiculosService],
})
export class VehiculosModule {}
