import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  PayloadTooLargeException,
  Post,
  Put,
  Query,
  UnsupportedMediaTypeException,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { captionsDto } from '../PostDto/caption.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { postTypDto } from '../PostDto/postType.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { postmediaDto } from '../PostDto/postmedia.dto';
import { file } from 'googleapis/build/src/apis/file';
import { Console } from 'console';
import { updateCaptionDto } from '../PostDto/updateCaptions.dto';

@Controller('post')
@ApiTags('PostApi')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Post('createpost-type')
  async postType(@Body() data: postTypDto) {
    return await this.postService.createpostype(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Post('createcaption')
  async createCaption(@Body() data: captionsDto) {
    return this.postService.createcaption(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Post('createpostmedia')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'mediaFile', maxCount: 10 }]))
  async createpostmedia(
    @UploadedFiles() files: { mediaFile: Express.Multer.File[] },
    @Body() data: postmediaDto,
  ) {
    if (files && files.mediaFile) {
      for (const fileItems of files.mediaFile) {
        if (
          !fileItems.originalname.match(
            /\.(jpg|jpeg|PNG|pdf|gif|bmp|mp4|mov|avi|mkv|wmv)$/,
          )
        ) {
          throw new UnsupportedMediaTypeException('Unsupported file type');
        } else if (fileItems.size > Number(process.env.MAX_FILESIZE)) {
          throw new PayloadTooLargeException(
            'File size exceeds maximum allowed size',
          );
        }
      }
    } else {
      throw new HttpException('Media file not found', HttpStatus.BAD_REQUEST);
    }
    return await this.postService.createmedia({
      data: data,
      mediaFiles: files.mediaFile,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Get('getallpoststype:id')
  async getAllPostTypes(@Query('id') id: string) {
    return await this.postService.getallpostype(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Put('updatecaptionbypoststypeId')
  async updateCaptionPostTypes(@Body() data: updateCaptionDto) {
    return this.postService.updatecaptions(data);
  }

  @Delete('captions/postTypeId:id')
  async deleteCaption(@Query('id') id: string) {
    return this.postService.Delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Get('acceptprofileviewrequests:id')
  async acceptProfileViewRequests(@Query('id') id: string) {
    return this.postService.viewsProfileRequestAccept(id);
  }
}
