import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommentLikeService } from './comment-like.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentLikeDto } from './Comment-like-dto/comment-like-dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Comment-like')
@Controller('comment-like')
export class CommentLikeController {
  constructor(private readonly commentService: CommentLikeService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Post('/create')
  async create(@Body() data: CommentLikeDto) {
    return await this.commentService.createcomment(data);
  }
}
