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



export class GetReplyDto {


    @ApiProperty()
    userId:string
      
   
    @ApiProperty()
    CaptionId:string
  
    @ApiProperty()
    parentCommentId: string;
  
    
  }
  