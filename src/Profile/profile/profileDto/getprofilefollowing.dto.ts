import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class getfollowingprofilesDto {
  @ApiProperty({ required: false })
  @IsOptional()
  id: string;

  @ApiProperty({ required: false })
  @IsOptional()
  viewsId: string;
}