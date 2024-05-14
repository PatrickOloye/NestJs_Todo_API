import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTodoDto {
    @ApiProperty({
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    
    @ApiProperty({
        type: String,
    })
    @IsString()
    dueDate: string; 

    }