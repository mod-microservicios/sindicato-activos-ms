import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VehiculosService } from './vehiculos.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';

@Controller()
export class VehiculosController {
  constructor(private readonly vehiculosService: VehiculosService) {}

  @MessagePattern('createVehiculo')
  create(@Payload() createVehiculoDto: CreateVehiculoDto) {
    return this.vehiculosService.create(createVehiculoDto);
  }

  @MessagePattern('findAllVehiculos')
  findAll() {
    return this.vehiculosService.findAll();
  }

  @MessagePattern('findOneVehiculo')
  findOne(@Payload() id: number) {
    return this.vehiculosService.findOne(id);
  }

  @MessagePattern('updateVehiculo')
  update(@Payload() updateVehiculoDto: UpdateVehiculoDto) {
    return this.vehiculosService.update(updateVehiculoDto.id, updateVehiculoDto);
  }

  @MessagePattern('removeVehiculo')
  remove(@Payload() id: number) {
    return this.vehiculosService.remove(id);
  }
}
