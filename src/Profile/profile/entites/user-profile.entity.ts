import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, Unique, OneToOne, BeforeInsert } from 'typeorm';
import { selectinterests } from './selectinterest.entities';
import { User } from 'src/enitties/user.entities';


@Entity({ name: 'Userprofile' })
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid',{nullable:true})
  userId:string;

  @Column({ name: 'first_name' })
  fullname: string;

  @Column({ name: 'last_name', nullable: true })
  username: string;

  @Column({ name: 'profile_name', nullable: true })
  profilePicture: string;

  @Column({ type: 'text', nullable: true })
  bio: string; 

  @OneToMany(() => selectinterests, ( selectinterestdata) =>  selectinterestdata.selectData)
  selectinterestdata: selectinterests[];

  @Column({ type: 'text', nullable: true })
  location: string[];

  @Column({ type: 'enum', enum:["private","public"],default:"private"})
  locationvisibility: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;
  
  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;

}