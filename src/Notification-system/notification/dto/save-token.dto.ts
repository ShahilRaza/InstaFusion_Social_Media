import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SaveTokenDto{
    @ApiProperty({ required: false })
    @IsNotEmpty()
    token : string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    senderId : string;
}