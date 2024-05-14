import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTaskDto {

    @ApiProperty({
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    
    @ApiProperty({
        type: Number
    })
    @IsNumber()
    todoId: number;


    @ApiProperty({ readOnly: true })
    statusColor: string;

    @ApiProperty()
    dueDate: string;

}