import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { Bike } from '@prisma/client';
import { UpdateBikeDto } from './dto/update-bike.dto';

@Injectable()
export class BikesService {
  constructor(private prisma: PrismaService) {}

  async create(createBikeDto: CreateBikeDto, userId: string): Promise<Bike> {
    return await this.prisma.bike.create({
      data: { ...createBikeDto, userId },
    });
  }

  async findAll(userId: string): Promise<Bike[]> {
    return await this.prisma.bike.findMany({ where: { userId } });
  }

  async findOne(id: string): Promise<Bike> {
    const bike = await this.prisma.bike.findUnique({ where: { id } });
    if (!bike) throw new NotFoundException('Bike not found');
    return bike;
  }

  async update(id: string, data: UpdateBikeDto): Promise<Bike> {
    return await this.prisma.bike.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Bike> {
    return await this.prisma.bike.delete({ where: { id } });
  }
}
