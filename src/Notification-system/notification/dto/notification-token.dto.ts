import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsUUID, ValidateNested } from "class-validator";

class NotificationData{
    @ApiProperty({ required: false })
    @IsNotEmpty()
    title : string

    
    @ApiProperty({ required: false })
    body : 'text'
}


class Payload{
    @ApiProperty({ required: false })
    data : {}


    @ApiProperty({ required: false })
    @Type(() => NotificationData)
    notification : NotificationData
}


export class NotificationTokenDto {
    @ApiProperty({ required: false })
    @IsNotEmpty()
    fcmtoken: string;



    @ApiProperty({ required: false }) 
    @IsNotEmpty()
    @Type(() => Payload)
    payload : Payload
}