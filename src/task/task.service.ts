import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  async findAll() {
    return this.prisma.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id); // Ensure it exists

    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); 

    return this.prisma.task.delete({
      where: { id },
    });
  }

  async deleteTasks(taskIds: number[]) {
    const tasks = await this.prisma.task.findMany({
      where: {
        id: {
          in: taskIds,
        },
      },
    });

    if (tasks.length !== taskIds.length) {
      throw new NotFoundException('Some tasks not found');
    }

    const deletedTasks = await this.prisma.task.deleteMany({
      where: {
        id: {
          in: taskIds,
        },
      },
    });

    return deletedTasks;
  }
}
