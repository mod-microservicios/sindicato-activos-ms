import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { UserService } from '../user.service';

@Controller()
export class UserEventsConsumer {
  private readonly logger = new Logger(UserEventsConsumer.name);

  constructor(private readonly userService: UserService) {}

  @EventPattern('user.created')
  async handleUserCreated(@Payload() data: any, @Ctx() context: KafkaContext) {
    try {
      this.logger.log(`Received user.created event: ${JSON.stringify(data)}`);
      
      const userData = data;
      
      // Crear o actualizar usuario en activos-ms
      await this.userService.createOrUpdate({
        id: userData.id,
        ci: userData.ci,
        email: userData.email,
        name: userData.name,
        lastName: userData.lastName,
        secondLastName: userData.secondLastName,
        type: userData.type,
      });

      this.logger.log(`User synchronized successfully: ${userData.id}`);
    } catch (error) {
      this.logger.error(`Error handling user.created event: ${error.message}`, error.stack);
    }
  }

  @EventPattern('user.updated')
  async handleUserUpdated(@Payload() data: any, @Ctx() context: KafkaContext) {
    try {
      this.logger.log(`Received user.updated event: ${JSON.stringify(data)}`);
      
      const userData = data;
      
      // Actualizar usuario en activos-ms
      await this.userService.createOrUpdate({
        id: userData.id,
        ci: userData.ci,
        email: userData.email,
        name: userData.name,
        lastName: userData.lastName,
        secondLastName: userData.secondLastName,
        type: userData.type,
      });

      this.logger.log(`User updated successfully: ${userData.id}`);
    } catch (error) {
      this.logger.error(`Error handling user.updated event: ${error.message}`, error.stack);
    }
  }
}

