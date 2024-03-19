import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';



export class postmediaDto {

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    mediaFile:any;

    @ApiProperty({})
    @IsString()
    position?: string;

    @ApiProperty({})
    longitude?: string;

    @ApiProperty({})
    latitude?: string;
    
    @IsString()
    captionId:string
}

