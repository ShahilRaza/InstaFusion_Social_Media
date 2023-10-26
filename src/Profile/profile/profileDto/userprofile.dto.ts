import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';

enum LocationVisibility {
  Public = "Public",
  Private = "Private"
}

export class userprofileDto {
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

  @ApiProperty({ required: false, type: Date })
  @IsDate()
  @IsOptional()
  dateOfBirth: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  location: string;

}