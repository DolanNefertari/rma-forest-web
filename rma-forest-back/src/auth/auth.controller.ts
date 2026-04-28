import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }, @Req() request: Request) {
    console.log('Headers completos:', JSON.stringify(request.headers));
    const ip = request.headers['x-forwarded-for'] as string;
    const isValid = await this.authService.validateUser(body.username, body.password, ip);

    if (isValid) {
      return { success: true, message: 'Login exitoso' };
    }
    return { success: false, message: 'Usuario o contraseña incorrectos' };
  }

  @Post('create-admin')
  async createAdmin() {
    await this.authService.createDefaultAdmin();
    return { message: 'Admin created: admin / admin123' };
  }
}