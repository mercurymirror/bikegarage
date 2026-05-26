import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { Ride } from '@prisma/client';
import { UpdateRideDto } from './dto/update-ride.dto';

@Injectable()
export class RidesService {
  constructor(private prisma: PrismaService) {}

  async create(createBikeDto: CreateRideDto, bikeId: string): Promise<Ride> {
    return await this.prisma.ride.create({
      data: { ...createBikeDto, bikeId },
    });
  }

  async findAll(bikeId: string): Promise<Ride[]> {
    return await this.prisma.ride.findMany({ where: { bikeId } });
  }

  async findOne(id: string): Promise<Ride> {
    const ride = await this.prisma.ride.findUnique({ where: { id } });
    if (!ride) throw new NotFoundException('Ride not found');
    return ride;
  }

  async update(id: string, data: UpdateRideDto): Promise<Ride> {
    return await this.prisma.ride.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Ride> {
    return await this.prisma.ride.delete({ where: { id } });
  }
}
