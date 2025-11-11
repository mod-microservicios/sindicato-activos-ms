import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/apps/configurations/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        id: undefined,
      },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
      include: {
        vehiculos: true,
      },
    });
  }

  async createOrUpdate(userData: {
    id: string;
    ci: string;
    email: string;
    name: string;
    lastName: string;
    secondLastName?: string;
    type: string;
  }) {
    return this.prisma.user.upsert({
      where: { id: userData.id },
      update: {
        ci: userData.ci,
        email: userData.email,
        name: userData.name,
        lastName: userData.lastName,
        secondLastName: userData.secondLastName,
        type: userData.type as any, // Convertir string a UserType enum
      },
      create: {
        id: userData.id,
        ci: userData.ci,
        email: userData.email,
        name: userData.name,
        lastName: userData.lastName,
        secondLastName: userData.secondLastName,
        type: userData.type as any, // Convertir string a UserType enum
      },
    });
  }
}
