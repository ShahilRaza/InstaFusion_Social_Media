import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { In } from 'typeorm';

export class postTypDto {
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  @IsIn(['image', 'video'])
  postTypeName: string;
}
