import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskDescription } from "src/entity/task.entity";



export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatus = [TaskDescription.OPEN, TaskDescription.IN_PROGRESS, TaskDescription.COMPLETED];

    transform(value: any, metadata: ArgumentMetadata): any{
        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is not a valid status`);
        }
        return value;
    }

    private isStatusValid(status: any): any{
        const index: number = this.allowedStatus.indexOf(status)

        return index != -1
    }

}