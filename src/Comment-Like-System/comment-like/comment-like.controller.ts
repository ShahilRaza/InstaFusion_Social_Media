import { Body, Controller, Delete, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CommentLikeService } from './comment-like.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentLikeDto } from './Comment-like-dto/comment-like-dto';
import { AuthGuard } from '@nestjs/passport';
import { updateDto } from './Comment-like-dto/update.dto';

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
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Delete('delete:id')
  async delete(@Query(('id')) id: string) {
   return  await this.commentService.delete(id);
  }


  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Put('update')
  async updateComment(@Body() data:updateDto){
    console.log(data)
   //return  await this.commentService.delete(id);
  }


  







  
}
