import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TodoModule } from 'src/todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/entity/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
    TodoModule
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
