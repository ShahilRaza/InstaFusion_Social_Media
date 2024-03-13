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

export class captionsDto {
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  caption: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  postTypeId: string;
}
