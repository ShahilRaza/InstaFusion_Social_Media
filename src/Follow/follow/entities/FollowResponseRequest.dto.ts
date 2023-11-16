import { ApiProperty } from "@nestjs/swagger";
import { ArrayUnique, IsArray, IsIn, IsNotEmpty, IsNumber } from "class-validator";

export class FollowResponseDto {
    @ApiProperty({ required: false })
    @IsNotEmpty()
    followerId: string;

    
    @ApiProperty({ required: false })
    @IsNotEmpty()
    followingId: string;


    @ApiProperty({ required: false })
    @IsIn(['accept', 'reject','pending'])
    status: string; 
  }