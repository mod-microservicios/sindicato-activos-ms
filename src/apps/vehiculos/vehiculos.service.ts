import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { PrismaService } from 'src/apps/configurations/prisma/prisma.service';

@Injectable()
export class VehiculosService {
  constructor(
    private prisma: PrismaService
  ) {}
  async create(createVehiculoDto: CreateVehiculoDto) {
    console.log(createVehiculoDto);
     // Verificar si el usuario existe
  const userExists = await this.prisma.user.findUnique({
    where: { id: createVehiculoDto.idUser }
  });

  if (!userExists) {
    console.log('Usuario no encontrado con ID:', createVehiculoDto.idUser);
    throw new NotFoundException(`Usuario con ID ${createVehiculoDto.idUser} no encontrado`);
  }
    return this.prisma.vehiculo.create({
      data: createVehiculoDto,
    });
  }

  findAll() {
    return this.prisma.vehiculo.findMany({
      include: {
        user: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.vehiculo.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  update(id: string, updateVehiculoDto: UpdateVehiculoDto) {
    const { id: _, ...data } = updateVehiculoDto;
    return this.prisma.vehiculo.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.vehiculo.delete({
      where: { id },
    });
  }
}
