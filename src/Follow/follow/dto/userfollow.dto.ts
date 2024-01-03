import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, ArrayUnique, IsArray, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class userfollowDto {
    @ApiProperty({ required: false })
    @IsNotEmpty()
    followerId: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    followingIds: string;

 
}