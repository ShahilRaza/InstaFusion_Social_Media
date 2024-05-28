import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { HasMimeType, IsFile } from 'nestjs-form-data';

export class FileSendDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  senderId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  receiverId?: string;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' }, required: false })
  @IsFile({ each: true })
  @HasMimeType([
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/bmp',
    'image/heif',
    'image/PNG',
    'image/JPG',
    'image/JPEG',
    'image/GIF',
    'image/BMP',
    'image/HEIF'
  ])
  @IsOptional()
  files: any[];
}

let filedata= new FileSendDto()
console.log(filedata.files,"sdldw")
