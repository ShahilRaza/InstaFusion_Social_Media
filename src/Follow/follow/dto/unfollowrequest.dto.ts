import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, ArrayUnique, IsArray, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class UnfollowRequestDto {
    @ApiProperty({ required: false })
    @IsNotEmpty()
    followerId: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    followingIds: string;
}