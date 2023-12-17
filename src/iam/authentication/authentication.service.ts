import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { PG_UNIQUE_VIOLATION_ERROR_CODE } from '../../constants/db-error-codes.constant';
import { User } from '../../users/entities/user.entity';
import jwtConfig from '../config/jwt.config';
import {
  PASSWORD_DOES_NOT_MATCH,
  USER_DOES_NOT_EXISTS,
} from '../constants/error-messages.constant';
import { HashingService } from '../hashing/hashing.service';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    try {
      const user = new User();
      user.email = signUpDto.email;
      user.password = await this.hashingService.hash(signUpDto.password);
      await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === PG_UNIQUE_VIOLATION_ERROR_CODE) {
        throw new ConflictException();
      }

      throw error;
    }
  }

  // TODO: Remake using native express Response object and cookie with httpOnly/secure/sameSite
  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const user = await this.usersRepository.findOneBy({
      email: signInDto.email,
    });

    if (!user) {
      throw new UnauthorizedException(USER_DOES_NOT_EXISTS);
    }

    const isPasswordValid = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(PASSWORD_DOES_NOT_MATCH);
    }

    const { audience, issuer, secret, accessTokenTtl } = this.jwtConfiguration;
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience,
        issuer,
        secret,
        expiresIn: accessTokenTtl,
      },
    );

    return {
      accessToken,
    };
  }
}
