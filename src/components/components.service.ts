import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Component } from '@prisma/client';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';

@Injectable()
export class ComponentsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createComponentDto: CreateComponentDto,
    bikeId: string,
  ): Promise<Component> {
    return await this.prisma.component.create({
      data: { ...createComponentDto, bikeId },
    });
  }

  async findAll(bikeId: string): Promise<Component[]> {
    return await this.prisma.component.findMany({
      where: { bikeId },
    });
  }

  async findOne(id: string): Promise<Component> {
    const component = await this.prisma.component.findUnique({ where: { id } });
    if (!component) throw new NotFoundException('Component not found');
    return component;
  }

  async update(
    updateComponentDto: UpdateComponentDto,
    id: string,
    userId: string,
  ): Promise<Component> {
    const component = await this.findOne(id);
    const bike = await this.prisma.bike.findUnique({
      where: { id: component.bikeId },
    });
    if (bike?.userId !== userId) throw new ForbiddenException('Access denied');
    return await this.prisma.component.update({
      where: { id },
      data: { ...updateComponentDto },
    });
  }

  async remove(id: string, userId: string): Promise<Component> {
    const component = await this.findOne(id);
    const bike = await this.prisma.bike.findUnique({
      where: { id: component.bikeId },
    });
    if (bike?.userId !== userId) throw new ForbiddenException('Access denied');
    return await this.prisma.component.delete({ where: { id } });
  }

  async getWearStatus(bikeId: string, userId: string) {
    const bike = await this.prisma.bike.findUnique({
      where: { id: bikeId },
    });
    if (!bike) throw new NotFoundException('Bike not found');

    if (bike.userId !== userId) {
      throw new ForbiddenException('Bike not found for this user');
    }
    const components = await this.prisma.component.findMany({
      where: { bikeId },
      include: { componentType: true },
    });
    if (!components.length) throw new NotFoundException('Components not found');

    return Promise.all(
      components.map(async (component) => {
        const rides = await this.prisma.ride.findMany({
          where: {
            bikeId,
            date: {
              gte: component.installedAt,
              lte: component.replacedAt || new Date(),
            },
          },
        });
        const kmSinceInstall = rides.reduce(
          (sum, ride) => sum + ride.distanceKm,
          0,
        );
        const wearPercent = Math.round(
          (kmSinceInstall / component.componentType.wearLimitKm) * 100,
        );
        const needsReplacement = wearPercent >= 100;

        return {
          id: component.id,
          brand: component.brand,
          model: component.model,
          componentType: component.componentType.name,
          kmSinceInstall,
          wearPercent,
          needsReplacement,
        };
      }),
    );
  }
}
