import { Delete, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from 'src/dto/task.dto';
import { TaskEntity, TaskDescription } from 'src/entity/task.entity';
// import { TodoEntity } from 'src/entity/todo.entity';
// import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { TodoService } from 'src/todo/todo.service';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
// import { QueryService } from '@nestjs-query/core';

@Injectable()
export class TaskService extends TypeOrmQueryService <TaskEntity>{
    constructor(@InjectRepository(TaskEntity)  repo: Repository<TaskEntity>, private todoService: TodoService) { super(repo, { useSoftDelete: true });}

    

    async getTasks(): Promise<TaskEntity[]> {
        return await this.repo.find();
    }


    async createTask(createTaskDto: CreateTaskDto, ) {
        
        const {todoId, dueDate} = createTaskDto
        const todo = await this.todoService.findTodoById(todoId)
        if(!todo) throw new NotFoundException("todo not found")

        const task = this.repo.create({
            ...createTaskDto,
            // todo
            dueDate: dueDate || new Date().toISOString(),
        });    

        const savedTask = await this.repo.save(task); // Save the task


        const statusColor = savedTask.statusColor;

    // Return the saved task with statusColor included in the response
    return {
        ...savedTask,
        statusColor: statusColor
    };
        // // Calculate statusColor based on the savedTask's dueDate
        // savedTask.statusColor = savedTask.statusColor;
    
        // return savedTask; /
        
        // return await this.repo.save(task)
    }


    async getAllTasks(todoId: number, page: number, limit: number): Promise<{ tasks: TaskEntity[], totalCount: number }> {
        const skip = (page - 1) * limit;
        const [tasks, totalCount] = await this.repo.findAndCount({
            where: { todoId },
            skip,
            take: limit,
        });
    
        if (!tasks.length) {
            throw new NotFoundException('No tasks registered for this todo.');
        }
    
        return { tasks, totalCount };
    }





    async updateTask(id: number, description: TaskDescription,){
        // const updateData = { status, description };
        await this.repo.update({id}, {description})
        return this.repo.findOne({where:{id}})
    }

   

    
    async deleteTask( id: number){
        return await this.repo.softDelete(id)
    }
}
