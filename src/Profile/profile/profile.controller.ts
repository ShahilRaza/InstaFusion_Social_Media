import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { userprofileDto } from './profileDto/userprofile.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserprofiledDto } from './profileDto/userprofileupdate.dto';
import { SearchUserprofiledto } from './profileDto/searchuserprofile.dto';

import jwtDecode from 'jwt-decode';

@ApiTags('userprofie')
@Controller('profile')
export class ProfileController {
  constructor(private readonly UserprofileService: ProfileService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Post('createuserprofile')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'profile', maxCount: 1 }]))
  async createuserprofile(
    @UploadedFiles() files: { profile },
    @Body() data: userprofileDto,
    @Request() req,
  ) {
    if (!!files) {
      if (!!files.profile) {
        if (
          !files.profile[0].originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)
        ) {
          throw new BadRequestException('Invalid Image type');
        } else if (files.profile.size > Number(process.env.FILE_SIZE)) {
          throw new BadRequestException(
            'File Size Should not be Greater than 2 MB',
          );
        }
      }
    }
    return await this.UserprofileService.createProfileService({
      data,
      files,
      userId: req.user.userId,
    });
  }

  // get userprofile by id
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth('access-token')
  @Get(':id/getuserprofile')
  async findOne(@Param('id') id: string) {
    return await this.UserprofileService.getUserProfile(id);
  }

  @Get('getfollowingprofiles/:id')
  async getfollowingprofiles(@Param('id') id: string, @Query('viewerId') viewerId: string) {
    return await this.UserprofileService.getFollowingProfile({id,viewerId})
  }

  @Get('getalluserprofile')
  async getalluserprofile(@Headers('authorization') authorizationHeader) {
    let getprivate = false;
    try {
      const token = authorizationHeader.split('Bearer')[1];
      const decoded = jwtDecode(token);
      if (token && decoded['userId']) {
        getprivate = true;
      }
    } catch (error) {
      console.log(`Error in decoding ${JSON.stringify(error)}`);
    }
    return await this.UserprofileService.getAllUserProfiles(getprivate);
  }

  /// update userprofile
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Put('/userprofileupdate/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'profile', maxCount: 1 }]))
  async UpdateUserprofile(
    @UploadedFiles() files: { profile },
    @Param('id') id: string,
    @Body() data: UserprofiledDto,
  ) {
    if (!!files) {
      if (!!files.profile) {
        if (
          !files.profile[0].originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)
        ) {
          throw new BadRequestException('Invalid Image type');
        } else if (files.profile.size > Number(process.env.FILE_SIZE)) {
          throw new BadRequestException(
            'File Size Should not be Greater than 2 MB',
          );
        }
      }
    }
    return await this.UserprofileService.UpdateUserProfileService({
      id,
      data,
      files,
    });
  }

  /// delete profil by id
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Delete('deleteprofilbyid/:id')
  async DeleteUserProfileById(@Param('id') id: string) {
    return await this.UserprofileService.DeleteUserProfile(id);
  }

  /// userprofile search by userame and location
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Post('/searchbyusernameandlocation')
  async SearchByUsernameAndLocation(@Query() data: SearchUserprofiledto) {
    return await this.UserprofileService.SearchUserprofiles(data);
  }
}
