import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DeleteTasksDto } from './dto/DeleteTasksDto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post("add")
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }

  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  async deleteTasks(@Body() deleteTasksDto: DeleteTasksDto) {
    const { taskIds } = deleteTasksDto;
    try {
      const deletedTasks = await this.taskService.deleteTasks(taskIds);
      return {
        status: 'success',
        data: deletedTasks,
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message || 'Failed to delete tasks',
      };
    }
  }
}
