import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CommentLikeService } from './comment-like.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentLikeDto } from './Comment-like-dto/comment-like-dto';
import { AuthGuard } from '@nestjs/passport';
import { updateDto } from './Comment-like-dto/update.dto';
import { query } from 'express';
import { CommentReplyDto } from './Comment-like-dto/comment-reply.dto';
import { GetReplyDto } from './Comment-like-dto/getreply.dto';
import { commentLikeDto } from './Comment-like-dto/comment-like.dto';
import { unlikeLikeDto } from './Comment-like-dto/comment-unlike.dto';

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
  @Get('getcomment:id')
  async getComment(@Query(('id')) id: string) {
    return await this.commentService.getComment(id);
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
    return await this.commentService.update(data)
  }


  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Post('/reply')
  async  CommentReply(@Body() data:CommentReplyDto) {
    return await this.commentService.commentReply(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Get('getreply')
  async getreply(@Query() data:GetReplyDto  ){
   return await this.commentService.getRepy(data) 
  }

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
@Post('/createlike')
async createLike(@Body() data:commentLikeDto){
 return await this.commentService.createLike(data)
}


@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
@Put('/unlike')
async unLike(@Body() data :unlikeLikeDto ) {
  return this.commentService.unlike(data)
}


  


  

  
}
