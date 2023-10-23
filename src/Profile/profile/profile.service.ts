import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { UserProfile } from './entites/user-profile.entity';
import { GoogleDriveService } from '../../googledrivestorage.service';
import { file } from 'googleapis/build/src/apis/file';
import { User } from '../../enitties/user.entities';

@Injectable()
export class ProfileService {
    constructor(@InjectRepository(UserProfile ) private readonly userprofileRepository:Repository<UserProfile >,
    @InjectRepository(User ) private readonly userRepository:Repository<User>,
     private readonly googleDriveService: GoogleDriveService,
    ){}


    async creatprofileservice(rsdata){
    const { fullname,username,bio,location}= rsdata.data
    const fileurl = await this.googleDriveService.uploadfile(rsdata.files);
    const usernameExting=await this.userprofileRepository.findOne({
        where:{
            username:username
        }
    })
   
    if(!usernameExting){
      return  await this.userprofileRepository.save({
        fullname:fullname,
        username:username ,
        profilePicture:fileurl ,
        bio:bio ,
        location:location,
        userId:rsdata.userId  
      })
      
    }else{
        const randomusername = await this.GenerateRandomUsername(username)
       throw new ConflictException(`Username '${username}' already exists. Please choose a different username or use the suggested username: '${randomusername}'`);
    }
    }

    async GenerateRandomUsername(currentusername:string){
      let randomusername = currentusername;
      const randomString = Math.random().toString(36).substring(2,4);
      randomusername = `${currentusername}_${randomString}`
      if (!randomusername) {
        const newRandomString = Math.random().toString(36).substring(2,4);
        randomusername = `${currentusername}_${newRandomString}`;
      }
      return randomusername;
    }


    /// get userprofile service
    async getUserProfilename(id): Promise<any>{
      const userprofile= await this.userprofileRepository.findOne({
        where:{
          id:id
        }
      })
      if (!userprofile) {
        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
      }else{
        return   userprofile ;
      }
    }
    
    async getAllUserProfiles(getprivate) {
      let locationVisibility = getprivate === true ? In(['public', 'private']) : 'private';
      const viewsProfile = await this.userprofileRepository.find({
        where:{
          locationvisibility: locationVisibility, 
        }
      });
      if (!viewsProfile || viewsProfile.length === 0) {
        throw new NotFoundException("Couldn't find any profiles");
      } else {
        return viewsProfile[0];
      }
    }

    /// update userprofile service
    async UpdateUserProfileService(updateuserprofiledto){
      const {fullname,username, bio,location,dateOfBirth,locationvisibility} =updateuserprofiledto.data
      let vediurl;
      if (updateuserprofiledto.files ) {
        vediurl =await this.googleDriveService.uploadfile(updateuserprofiledto.files)
      }
      const updatedata={
        fullname : fullname,
        username:username,
        profilePicture:vediurl,
        bio:bio,
        location:location,
        dateOfBirth:dateOfBirth,
        locationvisibility:locationvisibility
      }
      const result =await this.userprofileRepository.update(updateuserprofiledto.id, updatedata)
      return {
        message: result ? 'Updated Successfully' : 'Update failed'
      };
    }

    async DeleteUserProfile(id){
      return await this.userprofileRepository.delete(id)
    }


    async SearchUserprofiles(searchuserprofile) {
      const { username, location } =searchuserprofile;
      const result = await this.userprofileRepository.findOne({
        where: [
          { username: ILike(`%${username}%`) },
          { location: ILike(`%${location}%`) }
        ]
      });
      if (!result) {
        throw new NotFoundException("Profile not found");
      } else {
        return result;
      }
    }
}
