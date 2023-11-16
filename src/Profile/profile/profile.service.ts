import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { UserProfile } from './entites/user-profile.entity';
import { GoogleDriveService } from '../../googledrivestorage.service';
import { file } from 'googleapis/build/src/apis/file';
import { User } from '../../enitties/user.entities';
import { constants } from 'perf_hooks';
import { UserFollow } from '../../Follow/follow/entities/userfollow.entities';
import { forEach } from 'mathjs';
import { any, array } from 'joi';
import { ids, ids_v1 } from 'googleapis/build/src/apis/ids';
import { ideahub } from 'googleapis/build/src/apis/ideahub';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userprofileRepository: Repository<UserProfile>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserFollow)
    private readonly userfollowrespository: Repository<UserFollow>,
    private readonly googleDriveService: GoogleDriveService,
  ) {}

  async createProfileService(rsdata) {
    const { fullname, username, bio, location } = rsdata.data;
    const usernameExisting = await this.userprofileRepository.findOne({
      where: {
        username: ILike(`%${username}%`),
      },
      relations: ['user'],
    });
    const usernameExistingForUser = await this.userprofileRepository.findOne({
      where: {
        username: username,
        userId: rsdata.userId,
      },
    });
    try {
      if (!usernameExistingForUser) {
        const fileUrl = await this.googleDriveService.uploadfile(rsdata.files);
        return await this.userprofileRepository.save({
          fullname: fullname,
          username: username,
          profilePicture: fileUrl,
          bio: bio,
          location: location,
          userId: rsdata.userId,
        });
      } else if (!usernameExisting) {
        const randomUsername = await this.GenerateRandomUsername(username);
        throw new ConflictException(
          `Username '${username}' already exists. Please choose a different username or use the suggested username: '${randomUsername}'`,
        );
      } else {
        throw new ConflictException(
          `Username '${username}' already exists for this user.`,
        );
      }
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `Username '${username}' already exists for this user.`,
        );
      } else {
        throw error;
      }
    }
  }

  async GenerateRandomUsername(currentusername: string) {
    let randomusername = currentusername;
    const randomString = Math.random().toString(36).substring(2, 4);
    randomusername = `${currentusername}_${randomString}`;
    if (!randomusername) {
      const newRandomString = Math.random().toString(36).substring(2, 4);
      randomusername = `${currentusername}_${newRandomString}`;
    }
    return randomusername;
  }

  async getUserProfile(id: string) {
    const userprofile = await this.userprofileRepository.findOne({
      where: {
        userId: id,
      },
      relations: { user: { followers: true } },
    });
    const { followers } = userprofile.user;
    let follower = [];
    let followerCount = 0;
    let following = 0;
    followers.forEach((followstatus) => {
      if (followstatus.status == 'accept') {
        followerCount++;
        follower.push(followstatus.followingId);
      } else if (
        followstatus.status === 'pending' ||
        followstatus.status === 'reject'
      ) {
        following++;
      }
    });
    const idsToFetch = [...follower, id];
    const profileDataPromises = idsToFetch.map(async (userId) => {
      const profileData = await this.userprofileRepository.findOne({
        where: {
          userId,
        },
      });
      return profileData;
    });
    const profiles = await Promise.all(profileDataPromises);
    for (let i = 0; i < profiles.length; i++) {
      for (let j = profiles.length - 1; j > i; j--) {
        if (profiles[j].userId < profiles[j - 1].userId) {
          [profiles[j], profiles[j - 1]] = [profiles[j - 1], profiles[j]];
        }
      }
    }
    return {
      profiles,
      followerCount,
      following,
    };
  }

  async getAllUserProfiles(getprivate) {
    let locationVisibility =
      getprivate === true ? In(['public', 'private']) : 'private';
    const viewsProfile = await this.userprofileRepository.find({
      where: {
        locationvisibility: locationVisibility,
      },
    });
    if (!viewsProfile || viewsProfile.length === 0) {
      throw new NotFoundException("Couldn't find any profiles");
    } else {
      return viewsProfile[0];
    }
  }

  /// update userprofile service
  async UpdateUserProfileService(updateuserprofiledto) {
    const {
      fullname,
      username,
      bio,
      location,
      dateOfBirth,
      locationvisibility,
    } = updateuserprofiledto.data;
    let vediurl;
    if (updateuserprofiledto.files) {
      vediurl = await this.googleDriveService.uploadfile(
        updateuserprofiledto.files,
      );
    }
    const updatedata = {
      fullname: fullname,
      username: username,
      profilePicture: vediurl,
      bio: bio,
      location: location,
      dateOfBirth: dateOfBirth,
      locationvisibility: locationvisibility,
    };
    const result = await this.userprofileRepository.update(
      updateuserprofiledto.id,
      updatedata,
    );
    return {
      message: result ? 'Updated Successfully' : 'Update failed',
    };
  }

  async DeleteUserProfile(id) {
    return await this.userprofileRepository.delete(id);
  }

  async SearchUserprofiles(searchuserprofile) {
    const { username, location } = searchuserprofile;
    const result = await this.userprofileRepository.findOne({
      where: [
        { username: ILike(`%${username}%`) },
        { location: ILike(`%${location}%`) },
      ],
    });
    if (!result) {
      throw new NotFoundException('Profile not found');
    } else {
      return result;
    }
  }
}
