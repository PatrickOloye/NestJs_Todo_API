import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TodoEntity } from "./todo.entity";


//For creating the description of task
export enum TaskDescription {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN PROGRESS',
    COMPLETED = 'COMPLETED'
}


@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    dueDate: string;

    @Column({default: TaskDescription.OPEN})
    description: TaskDescription

    @ManyToOne(()=> TodoEntity, (todo)=> todo.tasks)
    todo: TodoEntity


    @Column()
    todoId: number;


    @DeleteDateColumn()
    deletedAt: Date;


    get statusColor(): string {
        const now = new Date();
        const dueDate = new Date(this.dueDate);
        const timeDiff = dueDate.getTime() - now.getTime();
        const hoursDiff = Math.ceil(timeDiff / (1000 * 3600)); // Convert milliseconds to hours

        if (hoursDiff >= 72) {
            return 'green'; // More than 72 hours remaining (3 days)
        } else if (hoursDiff < 24) {
            return 'yellow'; // Less than 24 hours remaining
        } else if (hoursDiff <= 3) {
            return 'red'; // Within 3 hours of due date
        } else {
            return 'gray'; // Otherwise, status is undefined
        }
    }
}


