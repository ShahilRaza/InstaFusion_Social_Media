import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { HasMimeType, IsFile } from 'nestjs-form-data';

export class MessageSeenDto {
  @ApiProperty({ type: [String] })
  messageId: string[];
}
