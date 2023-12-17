import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authenticationService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authenticationService.signIn(signInDto);
  }
}
