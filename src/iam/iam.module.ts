import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    AuthenticationService,
  ],
  controllers: [AuthenticationController],
})
export class IAMModule {}
