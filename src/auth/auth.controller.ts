import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/AuthCredentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: AuthCredentialsDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() registerDto: AuthCredentialsDto) {
    return this.authService.login(registerDto);
  }
}
