import { BadRequestException, Body, Injectable, InternalServerErrorException, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from '../entity/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UserEntity } from 'src/entity/user.entity';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';

@Injectable()
export class TodoService extends TypeOrmQueryService <TodoEntity>{
   
    constructor(@InjectRepository(TodoEntity) repo: Repository<TodoEntity>){super(repo, { useSoftDelete: true });}


    async getAllTodos(user: UserEntity){
        const query = await this.repo.createQueryBuilder('todo')
        query.where('todo.userId = :userId', {userId: user.id})

        // return await this.repo.find()
        try{
               return await query.getMany()
        }catch(err){
        throw new NotFoundException('no todo found.')
        }
    }

    async createTodo(dto: CreateTodoDto, user: UserEntity){

        
        // return await this.repo.find()
            const todo = new TodoEntity();
            const {title} = dto
            todo.title = title
            todo.userId = user.id
            
            this.repo.create(todo)
        try {
            return await this.repo.save(todo )
        } catch (error) {
            throw new InternalServerErrorException('something went wrong, no create')
        }

            
           
        
              
    }

    async updateTodo(id: number, dto: CreateTodoDto){
        try {
                                                                                                                               
            const todo = await this.repo.findOne({ where: { id } });
            if(!todo){
                throw new NotFoundException("todo not found")
            }
            // console.log(todo.title)
            todo.title = dto.title;
            return await this.repo.save(todo)
        } catch (error) {
            throw new InternalServerErrorException('something went wrong, no update')
        }
    }



    async findTodo(id: number){
        try {
                        const todo = await this.repo.findOne({where: {id}})
            if(!todo){
                return new NotFoundException('todo not found')
            }
            return todo
        } catch (error) {
            throw new InternalServerErrorException("something went wrong, no delete")
        }
    }






    async findTodoById(id: number){

        if(!id) return null
        return this.repo.findOne({where: {id}})
    }


    
    async deleteTodo(id: number){
        try{

            return await this.repo.softDelete({id})
        }catch(err){
                throw new InternalServerErrorException("something went wrong, no delete")
        }
    }


}
