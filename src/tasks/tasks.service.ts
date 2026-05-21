import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  findAll(userId: string): Promise<Task[]> {
    return this.prisma.task.findMany({ where: { user: { id: userId } } });
  }
  async findOne(id: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    userId: string,
  ): Promise<Task> {
    const task = await this.prisma.task.create({
      data: { ...createTaskDto, userId },
    });
    return task;
  }

  async deleteTask(id: string) {
    await this.findOne(id);
    await this.prisma.task.delete({ where: { id } });
  }

  async updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto) {
    return this.prisma.task.update({
      where: { id },
      data: { status: updateTaskStatusDto.status },
    });
  }
}
