import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminUser } from '../entities/admin-user.entity';
import { LoginLog } from 'src/entities/login-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser, LoginLog])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [TypeOrmModule],
})
export class AuthModule {}