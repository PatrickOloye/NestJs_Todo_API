import { CreateTodoDto } from '../dto/create-todo.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoEntity } from 'src/entity/todo.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entity/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';



@ApiTags('todo')
@ApiBearerAuth()
@Controller('api/todo')
@UseGuards(AuthGuard())
export class TodoController {

    constructor(private todoService: TodoService){ }


    @ApiOperation({summary: 'get all todos of current user. Ensure that user is signed in'})
    @Get()
    getAllTodos(  @User() user: UserEntity){
      
        return this.todoService.getAllTodos(user);
        
    }


    @ApiOperation({summary: "get todo by id. Ensure that user is signed in"})
    @Get(':id')
    async findTodo(@Param('id') id: number){
        return await this.todoService.findTodo(id)
    }


    @ApiOperation({summary: 'create todo. Ensure that user is signed in'})
    @Post()
    createTodo(@Body() dto: CreateTodoDto,  @User() user: UserEntity){
        // const{title} = body;
    return this.todoService.createTodo(dto, user)
    }


    @ApiOperation({summary: 'update todo. Ensure that user is signed in'})
    @Put(':id')
    updateTodo(@Param('id') id: number, @Body() dto: CreateTodoDto){
       return this.todoService.updateTodo(id, dto)
    }


    @ApiOperation({summary: 'delete todo by id. Ensure that user is signed in'})
    @Delete(':id')
    deleteTodo(@Param('id') id: number){
        return this.todoService.deleteTodo(id)
    }
}
