import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { HasMimeType, IsFile } from 'nestjs-form-data';

export class ChatRecevieRecevierDto {
  @ApiProperty({ required: false })
  @IsString()
  senderId?: string;

  @ApiProperty({ required: false })
  @IsString()
  receiverId?: string;
}
