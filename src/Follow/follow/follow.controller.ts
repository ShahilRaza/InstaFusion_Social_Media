import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { userfollowDto } from './dto/userfollow.dto';
import { FollowResponseDto } from './entities/FollowResponseRequest.dto';
import { AuthGuard } from '@nestjs/passport';
import { UnfollowRequestDto } from './dto/unfollowrequest.dto';

@Controller('Follow')
@ApiTags('Userfollow')
export class FollowController {
  constructor(private readonly userfollowService: FollowService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Post('/followsuser')
  async follow(@Body() data: userfollowDto) {
    return await this.userfollowService.userfollow(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Patch('/followresponse')
  async RespondToFollowRequest(@Query() data: FollowResponseDto) {
    return await this.userfollowService.followResponse(data);
  }
}
