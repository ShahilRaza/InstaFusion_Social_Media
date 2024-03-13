import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { captionsDto } from '../PostDto/caption.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { postTypDto } from '../PostDto/postType.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('Post')
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
  @Post('createCaption')
  async createCaption(@Body() data: captionsDto) {
    return this.postService.createcaption(data);
  }
}
