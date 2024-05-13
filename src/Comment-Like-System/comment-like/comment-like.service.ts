import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommentEntities } from './Comment-like-Entities/comment-like.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaptionEntities } from '../../Post-system/PostEntities/caption.entities';
import { NotificationService } from '../../Notification-system/notification/notification.service';
import { User } from '../../enitties/user.entities';
import { Console } from 'console';
import { throwError } from 'rxjs';
import { LikeEntities } from './Comment-like-Entities/like-entities';
import { dataflow } from 'googleapis/build/src/apis/dataflow';



@Injectable()
export class CommentLikeService {
  constructor(
    @InjectRepository(CommentEntities)
    private readonly commentlikeRepository: Repository<CommentEntities>,
    @InjectRepository(CaptionEntities)
    private readonly CaptionRepository: Repository<CaptionEntities>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository( LikeEntities) private readonly LikeRepository: Repository< LikeEntities>,
    private readonly sendNotificationsService: NotificationService,
  ) {}

  async createcomment(data: any) {
    const { userId, captionId, comment} = data;
    const userdata = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      select: ['firstName', 'lastName'],
    });
    if (!userdata) throw new NotFoundException('User not found');
    const { firstName, lastName } = userdata;
    const send =
      await this.sendNotificationsService.commentLikeSendNotifications({
        firstName,
        lastName,
      });
    if (!send) {
      throw new Error('Error in sending notification');
    } else {
      const result = await this.commentlikeRepository.save({
        userId: userId,
        captionId: captionId,
        comment: comment,
      });
      return 'Your comment has been successfully added';
    }
  }




  async delete(id: any) {
    const result = await this.commentlikeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Could not find Comment.');
    } else {
      return result;
    }
  }

  async update(data: any) {
    const { id, comment } = data;
    const commentExits = await this.commentlikeRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!commentExits) {
      throw new NotFoundException();
    } else {
      const result = await this.commentlikeRepository.update(commentExits.id, {
        comment,
      });
      return result;
    }
  }

  async getComment(data: any) {
    const comment = await this.commentlikeRepository.find({
        where: {
            id: data
        },
        select: ['id', 'captionId', 'userId', 'comment', 'createDateTime']
    });

    if (comment.length > 0) {
        let commentData = comment.map((item) => {
            const commentDate = new Date(item.createDateTime); 
            const currentDate = new Date()
            const timeDifference = currentDate.getTime() - commentDate.getTime();
            const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
            return {
                daysAgo: daysDifference,
                comment: item.comment
            };
        });
        return {
            commentData,
            comment
        };
    } else {
        return {
            commentData: [], 
            comment: [] 
        };
    }
}

async commentReply(data:any){
const { CaptionId,commentReply,parentCommentId,userId}=data;
const parentcomment = await this.commentlikeRepository.findOne({
  where: { captionId: CaptionId, id: parentCommentId},
});
if (!parentcomment) {
  return new HttpException('Parent comment not found', HttpStatus.NOT_FOUND);
}else{
  const userdata=await this.userRepository.findOne({where:{id:userId}});
  const { firstName, lastName } = userdata;
  const result =await this.commentlikeRepository.save({
    userId: userId,
    captionId: parentcomment.captionId,
    createDateTime: parentcomment.createDateTime,
    comment: commentReply,
    parentCommentId:parentCommentId,
  })
  if (!result) {
    throw new HttpException("Fail reply",HttpStatus.BAD_REQUEST)
  }else{
    await this.sendNotificationsService.commentReplySendNotifications({firstName,lastName,commentReply})
    return 'Successfully replied';
  }
}
}



async getRepy(data:any){
  const { userId,CaptionId,parentCommentId} = data
  let reply = await this.commentlikeRepository.createQueryBuilder('CommentEntities')
  .leftJoinAndSelect('CommentEntities.user', 'user')
  .where('CommentEntities.captionId = :captionId', { captionId: CaptionId })
  .andWhere('CommentEntities.parentCommentId = :parentCommentId', { parentCommentId: parentCommentId })
  .andWhere('CommentEntities.userId = :userId', { userId: userId })
  .select([
    'CommentEntities.comment',
    'CommentEntities.createDateTime',
    'user.firstName',
    'user.lastName'
  ])
  .getMany();
let count=reply.length
if (!reply) {
  throw new HttpException('No Replies Found', HttpStatus.NO_CONTENT)
}else{
  return {count,reply}
}
}



async  createLike(data:any){
const {userId,CaptionId}=data
const userData=await this.commentlikeRepository.findOne({
  where:{userId:userId,captionId:CaptionId},relations:['user']
})
if (userData) {
  const {firstName,lastName}  =userData.user;
  const result=await this.LikeRepository.save({
    userId:userId,
    captionId:CaptionId,
    Like:true
  })
  await this.sendNotificationsService.LikeSendNotifications({firstName,lastName,})
  return result
}else{
  throw new NotFoundException('user not found');
}
}


async unlike(data:any){
  const {userId,CaptionId}=data
  let result =await this.LikeRepository.update({userId:userId,captionId:CaptionId},{Like:false})
  if (result) {
    return 'unliked';
  }else{
    return  "can't un like"
  }  
}





 


}
