import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaptionEntities } from '../PostEntities/caption.entities';
import { Repository } from 'typeorm';
import { User } from '../../enitties/user.entities';
import { PostType } from '../PostEntities/PostType.entities';
import { Console, log } from 'console';
import { GoogleDriveService } from '../../googledrivestorage.service';
import { PostMediaEntities } from '../PostEntities/postmedia.entities';
import { UserFollow } from '../../Follow/follow/entities/userfollow.entities';
import { ideahub_v1beta } from 'googleapis';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(CaptionEntities)
    private readonly CaptionRepository: Repository<CaptionEntities>,
    @InjectRepository(PostType)
    private readonly PostTypeRepository: Repository<PostType>,
    @InjectRepository(PostMediaEntities)
    private readonly PostMediaRepository: Repository<PostMediaEntities>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly googleDriveService: GoogleDriveService,
    @InjectRepository(UserFollow)
    private readonly userfollowrespository: Repository<UserFollow>,
  ) {}

  async createpostype(data: any) {
    const { postTypeName } = data;
    const result = await this.PostTypeRepository.save({
      postTypeName: postTypeName,
    });
    if (!result) {
      throw new Error('Error while creating postType');
    }
    return result;
  }

  async createcaption(data: any) {
    const { caption, userId, postTypeId } = data;
    const result = await this.CaptionRepository.save({
      caption: caption,
      createdByUserId: userId,
      postTypeId: postTypeId,
    });
    if (!result) {
      throw new Error('Error while creating caption');
    }
    return result;
  }

  async createmedia(mediadata: any) {
    const { data, mediaFiles } = mediadata;
    const media = [];
    try {
      for (const filesItms of mediaFiles) {
        let fileurls = await this.googleDriveService.uploadFile(filesItms);
        const savaadata = await this.PostMediaRepository.save({
          mediaFile: fileurls,
          postId: data.captionId,
          position: data.position,
          longitude: data.longitude,
          latitude: data.latitude,
        });
        media.push(savaadata);
      }
      return media;
    } catch (error) {
      console.log(error);
    }
  }

  async getallpostype(id: any) {
    const postdata = await this.PostTypeRepository.findOne({
      where: {
        id: id,
      },
      relations: ['captions', 'captions.PostMedia'],
    });
    if (!postdata) {
      throw new NotFoundException(`${id}  is not found`);
    }
    return postdata;
  }

  async updatecaptions(data: any) {
    var { postTypeId, caption } = data;
    const result = await this.PostTypeRepository.findOne({
      where: {
        id: postTypeId,
      },
      relations: ['captions'],
    });
    if (!result) {
      throw new NotFoundException('Post Type does');
    }
    if (result.captions.length > 0) {
      for (const mediaFilesItems of result.captions) {
        const UpadatCaption = await this.CaptionRepository.update(
          mediaFilesItems.id,
          { caption },
        );
        if (UpadatCaption.affected == 1) {
          return `successfully updated capti`;
        } else {
          return `unable to update caption`;
        }
      }
    }
  }

  async Delete(id: any) {
    const captionsData = await this.PostTypeRepository.findOne({
      where: {
        id: id,
      },
      relations: ['captions'],
    });
    if (captionsData.captions.length > 0) {
      for (const caption of captionsData.captions) {
        const result = await this.CaptionRepository.delete({
          id: caption.id,
        });
        if (result.affected === 1) {
          return 'Deleted Successfully';
        } else {
          return 'Unable To Delete';
        }
      }
    }
  }

  async viewsProfileRequestAccept(id: string) {
    let userdetails = await this.userfollowrespository.findOne({
      where: {
        followingId: id,
      },
      relations: ['following'],
    });
    const { followerId, status } = userdetails;
    if (status == 'accept') {
      let userdetails = await this.userRepository.findOne({
        where: {
          id: followerId,
        },
        relations: ['profile', 'captions.PostMedia'],
      });
      if (!userdetails) {
        throw new NotFoundException('User not found');
      }
      let mediafiles: any = [];
      const { profile, captions } = userdetails;
      const mediaFiles = captions.flatMap((caption) =>
        caption.PostMedia.map((media) => media.mediaFile),
      );
      const { username, bio, profilePicture } = <any>profile;
      return {
        username: username,
        bio: bio,
        profilePicture: profilePicture,
        mediaFiles: mediaFiles,
      };
    } else if (['pending', 'reject'].includes(status)) {
      throw new BadGatewayException(
        "You don't have permission to view this profile. Please accept requests from users.",
      );
    }
  }

  async countsFollowerPost(data: any) {
    const userdata = await this.userRepository.findOne({
      where: { id: data },
      relations: ['followers', 'captions.PostMedia'],
    });
    if (!userdata) {
      throw new Error('User data not found');
    }
    let follower = 0;
    let following = 0;
    userdata.followers.forEach((item) => {
      if (item.status === 'accept') {
        follower++;
      } else if (['pending', 'reject'].includes(item.status)) {
        following++;
      }
    });
    const mediaCount = userdata.captions
      .flat(1)
      .reduce(
        (count, captionEntity) => count + captionEntity.PostMedia.length,
        0,
      );

    return { follower, following, mediaCount };
  }

  async viewsRequestAccept(data: any) {
    let followerData = await this.userfollowrespository.find({
      where: {
        followingId: data,
      },
      relations: ['follower.captions.PostMedia'],
    });
    const followerCounts = await Promise.all(
      followerData.map(async (item) => {
        if (item.status === 'accept') {
          const followerId = item.followerId;
          const followerCount = await this.countsFollowerPost(followerId);
          return followerCount;
        } else if (['pending', 'reject'].includes(item.status)) {
          throw new BadGatewayException(
            "You don't have permission to view this profile. Please accept requests from users.",
          );
        }
      }),
    );
    return followerCounts;
  }
}
