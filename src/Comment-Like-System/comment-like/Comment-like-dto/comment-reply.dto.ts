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

export class CommentReplyDto {


  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId:string
    
 
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  CaptionId:string

  @ApiProperty({ type: 'text' })
  @IsNotEmpty()
  @IsString()
  commentReply: string;


  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  parentCommentId: string;
 
}
