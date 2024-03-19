import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';


export class updateCaptionDto {
  @ApiProperty({})
  @IsString()
  postTypeId: string;

  @ApiProperty({})
  @IsString()
  caption: string;
}
