import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../configurations/prisma/prisma.module';

import { UserEventsConsumer } from './events/user-events.consumer';
import { KafkaModule } from '../configurations/kafka/kafka.module';

@Module({
  imports: [PrismaModule, KafkaModule],
  controllers: [UserController, UserEventsConsumer],
  providers: [UserService],
})
export class UserModule {}
