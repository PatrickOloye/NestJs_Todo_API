import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { TaskEntity } from "./task.entity";

@Entity('todos')
export class TodoEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(()=> UserEntity, (user)=> user.todos)
    user: UserEntity


    @Column()
    userId: number;

    @OneToMany(()=> TaskEntity, (task)=> task.todo)
    tasks: TaskEntity[];
   
}