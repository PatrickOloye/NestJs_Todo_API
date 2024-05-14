import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entity/todo.entity';
// import { AuthModule } from './auth/auth.module';
// import { AuthService } from './auth/auth.service';
// import { UserEntity } from './entity/user.entity';
// import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './entity/user.entity';
import { TaskModule } from './task/task.module';
import { TaskEntity } from './entity/task.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'IAmStronger@0903',
    database: "todo",
    entities: [UserEntity, TodoEntity, TaskEntity],
    synchronize: true,

  }), TodoModule, AuthModule, TaskModule,],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule { }
