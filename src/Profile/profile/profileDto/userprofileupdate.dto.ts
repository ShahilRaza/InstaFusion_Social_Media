import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export class UserprofiledDto {
  @ApiProperty({ required: false })
  @IsOptional()
  fullname: string;

  @ApiProperty({ required: false })
  @IsOptional()
  username: string;


  @ApiProperty({ type: 'string', format: 'binary', required: false })
  profile: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @MaxLength(150)
  bio: string;


  @ApiProperty({ required: false })
  @IsOptional()
  location: string;


  @ApiProperty({enum: ['public', 'private ']})
  locationvisibility: string;

  
}