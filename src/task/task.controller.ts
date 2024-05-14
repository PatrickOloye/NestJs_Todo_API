import { Body, Controller, Delete, Get, Param, Patch, Post, Query, } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from 'src/dto/task.dto';
import { TaskStatusValidationPipe } from 'src/pipes/TastSTatusVallidation.pipe';
import { TaskDescription, TaskEntity } from 'src/entity/task.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { TodoEntity } from 'src/entity/todo.entity';
// import { TaskEntity } from 'src/entity/task.entity';


@ApiTags('task')
@Controller('api/task')
export class TaskController {

    constructor(private taskService: TaskService) { }

    @ApiOperation({summary: "create task. Ensure the user is signed in"})
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {

        return this.taskService.createTask(createTaskDto)

    }

    @ApiOperation({summary: "get the taskss of a by todoId"})
    @Get(':todoId')
    async getAllTasks(
        @Param('todoId') todoId: number,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 4,
    ): Promise<{ tasks: TaskEntity[], totalCount: number }> {
        return this.taskService.getAllTasks(todoId, page, limit);
    }

    @ApiOperation({summary: "update a task"})
    @Patch(':id')
    updateTask(
        @Body('status', TaskStatusValidationPipe) status: TaskDescription,
        @Param('id') id: number,
        // @Body('description') description: string
    ) {
        return this.taskService.updateTask(id, status)
    }

    @ApiOperation({summary: "delete task by id"})
    @Delete(':id')
    deleteTask(@Param('id') id: number, description: string) {
        return this.taskService.deleteTask(id)
    }
}
