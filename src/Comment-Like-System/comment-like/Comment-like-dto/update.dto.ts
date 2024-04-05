import { IsDate } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';


export class updateDto{

    @ApiProperty({})
    @IsString()
    commentId:string


    @ApiProperty({})
    @IsString()
    comment:string
}