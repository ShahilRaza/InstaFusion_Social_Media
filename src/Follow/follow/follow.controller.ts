import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { FollowService } from './follow.service';
import { ApiTags } from '@nestjs/swagger';
import { userfollowDto } from './dto/userfollow.dto';
import { FollowResponseDto } from './entities/FollowResponseRequest.dto';

@Controller('follow')
@ApiTags('Userfollow')
export class FollowController {
    constructor(private readonly userfollowService:FollowService){}

    @Post('/followsuser')
    async follow(@Body() data:userfollowDto) {
        return await this.userfollowService.userfollow(data)
    }

    @Patch('/followresponse')
    async RespondToFollowRequest(@Body() followResponseDto:FollowResponseDto) {
        console.log(followResponseDto)
   }
}
