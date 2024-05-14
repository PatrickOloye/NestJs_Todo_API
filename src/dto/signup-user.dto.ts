import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SignUpDto{

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    password: string;
}