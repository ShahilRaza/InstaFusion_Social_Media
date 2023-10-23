import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';


export class SearchUserprofiledto{
  
  @ApiProperty({ required: false })
  @IsOptional()
  username: string;

  @ApiProperty({ required: false })
  @IsOptional()
  location: string;

}