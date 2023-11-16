import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from '../profile/entites/user-profile.entity';
import { ProfileController } from './profile.controller';
import { selectinterests } from './entites/selectinterest.entities';
import { Hobbies } from './entites/hobbies.entities';
import { GoogleDriveService } from '../../googledrivestorage.service';
import { User } from '../../enitties/user.entities';
import { UserFollow } from '../../Follow/follow/entities/userfollow.entities';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserProfile,selectinterests, Hobbies,User, UserFollow]),
  ],
  providers: [ProfileService,GoogleDriveService],
  controllers: [ProfileController],
})
export class ProfileModule {}
