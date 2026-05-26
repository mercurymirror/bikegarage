import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ComponentType } from '@prisma/client';
import { CreateComponentTypeDto } from './dto/create-componentType.dto';

@Injectable()
export class ComponentTypesService {
  constructor(private prisma: PrismaService) {}

  async create(
    createComponentTypeDto: CreateComponentTypeDto,
  ): Promise<ComponentType> {
    return await this.prisma.componentType.create({
      data: { ...createComponentTypeDto },
    });
  }

  async findAll(): Promise<ComponentType[]> {
    return await this.prisma.componentType.findMany();
  }
}
