import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/enitties/user.entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from 'src/enitties/Refresh-token.entity';
import passport from 'passport';
import { date, string } from 'joi';
import { EmailConfirmationService } from './emailConfirmation.service';
import { stringify } from 'querystring';
import { electricConstantDependencies, sign } from 'mathjs';
import { UserProfile } from '../Profile/profile/entites/user-profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    @InjectRepository(UserProfile)
    private readonly userprofileRespository: Repository<UserProfile>,
    private readonly jwtService: JwtService,
    private emailConfirmationservice: EmailConfirmationService,
  ) {}

  async SignUp(signUpdto) {
    const { firstname, lastname, email, password } = signUpdto;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException(
        'User already exists. Please try a different email.',
      );
    }
    const randomToken = String(Math.floor(100000 + Math.random() * 900000));
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.save({
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: hashedPassword,
      token: randomToken,
    });

    return {
      user: user,
      token: randomToken,
    };
  }

  async VerifiedUser(data: any) {
    const userData = await this.userRepository.findOne({
      where: {
        email: data?.email,
        token: data?.token,
      },
    });
    if (userData) {
      if (!userData.email || !userData.token) {
        throw new NotFoundException('Invalid Token');
      } else {
        if (new Date().getTime() - userData.updated_at.getTime() < 300000000) {
          const user = await this.userRepository.findOne({
            where: {
              email: userData.email,
            },
          });
          if (user) {
            const payload = {
              userId: user.id,
            };
            const accessToken = await this.jwtService.sign(payload, {
              secret: `${process.env.JWT_SECRET}`,
            });
            const refresh = await this.generateRefreshtoken(payload);
            await this.userRepository.save({
              ...user,
              isVerified: true,
              refreshToken: refresh,
            });
            return {
              status: 'success',
              message: 'Email verified successfully',
              accessToken: accessToken,
              refreshToken: refresh,
            };
          } else {
            throw new HttpException(
              'Something went wrong please try again later.',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
        } else {
          throw new BadRequestException();
        }
      }
    } else {
      throw new BadRequestException();
    }
  }

  async userlogin(data: any) {
    const { email, password } = data;
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new NotFoundException('Invalid credentials');
    } else {
      const payload = {
        userId: user.id,
      };
      return {
        userId: user.id,
        accessToken: this.jwtService.sign(payload, {
          secret: `${process.env.JWT_SECRET}`,
        }),
        refreshToken: await this.generateRefreshtoken(payload),
      };
    }
  }

  async generateRefreshtoken(payload) {
    const expirydate = new Date();
    expirydate.setDate(
      expirydate.getDate() + parseInt(process.env.REFRESH_TOKEN_EXPIRY),
    );
    let salt = await bcrypt.genSalt();
    let refreshToken = await bcrypt.hash(JSON.stringify(payload), salt);
    this.updateRefreshToken(refreshToken, expirydate, payload);
    return refreshToken;
  }

  async updateRefreshToken(refreshToken, expirydate, payload) {
    const dataToUpsert = {
      userId: payload.userId,
      refreshToken: refreshToken,
      refreshTokenExpires: expirydate,
    };
    const uniqueIdentifierFields = ['userId'];
    await this.refreshTokenRepository.upsert(
      dataToUpsert,
      uniqueIdentifierFields,
    );
  }

  async refresh(data) {
    const user = await this.refreshTokenRepository.findOne({
      where: {
        refreshToken: data.refreshToken,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Refresh token is invalid');
    } else {
      const expirydate = new Date(user.refreshTokenExpires);
      if (expirydate < new Date()) {
        throw new UnauthorizedException({
          code: 4,
          error: 'Refresh Token Expired',
        });
      } else {
        const payload = {
          userId: user.userId,
        };
        const newAccessToken = this.generateRefreshtoken(payload);
        return newAccessToken;
      }
    }
  }

  async google(data) {
    return data;
  }

  async passwordupdate(rsdata: any) {
    const { oldPassword, newPassword } = rsdata.data;
    const userdetails = await this.userRepository.findOne({
      where: {
        id: rsdata.userId,
      },
    });

    if (userdetails) {
      const matchpassword = await bcrypt.compare(
        oldPassword,
        userdetails.password,
      );
      if (matchpassword) {
        const newhashpassword = await bcrypt.hash(newPassword, 10);
        const updatepassword = this.userRepository.update(
          { id: rsdata.userId },
          { password: newhashpassword },
        );
        if (updatepassword) {
          return { success: true, message: 'Password updated successfully' };
        } else {
          throw new InternalServerErrorException('Something went wrong');
        }
      } else {
        throw new BadRequestException('Old Password does not matched');
      }
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async forgetPassword(data: any) {
    const randomToken = Math.floor(100000 + Math.random() * 900000).toString();
    const user = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });
    if (!!user) {
      user.token = randomToken;
      await this.userRepository.save(user);
      console.log(randomToken, 'wnd  qdwo  ');
      return await this.emailConfirmationservice.sendVerificationLink({
        data,
        randomToken,
      });
    }
  }

  async forgotTokenverifiedbyemil(data: any) {
    const currentTime = new Date();
    const verifiedtoken = await this.userRepository.findOne({
      where: {
        token: data.token,
      },
    });
    if (!!verifiedtoken) {
      const tokenExpirationTime = new Date(
        verifiedtoken.created_at.getTime() + 60 * 60 * 1000,
      ); /// expire token in 1hr
      if (currentTime >= tokenExpirationTime) {
        const resethashpassword = await bcrypt.hash(data.resetpassword, 10);
        const res = await this.userRepository.update(verifiedtoken.id, {
          password: resethashpassword,
        });
        if (!!res) {
          return { success: true, message: 'Password updated successfully' };
        } else {
          throw new InternalServerErrorException('something went wrong');
        }
      } else {
        throw new UnauthorizedException('Your link is expired');
      }
    } else {
      throw new UnauthorizedException('Invalid Token');
    }
  }

  async otpverifiedbynumber(data: any) {
    console.log(data);
  }
}
