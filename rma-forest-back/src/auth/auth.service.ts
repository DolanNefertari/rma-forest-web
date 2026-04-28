import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from '../entities/admin-user.entity';
import * as bcrypt from 'bcrypt';
import { LoginLog } from 'src/entities/login-log.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminUser)
    private adminRepo: Repository<AdminUser>,
    @InjectRepository(LoginLog)
    private loginLogRepo: Repository<LoginLog>,
  ) {}

  async validateUser(username: string, password: string, ip: string): Promise<boolean> {
    const user = await this.adminRepo.findOne({ where: { username } });
    if (!user) return false;
    const isValid = bcrypt.compareSync(password, user.password);
    if (isValid) {
      await this.loginLogRepo.save({ username, ip });
    }
    return isValid;
  }

  async createDefaultAdmin() {
    const exists = await this.adminRepo.findOne({ where: { username: 'admin' } });
    if (!exists) {
      const hashed = bcrypt.hashSync('admin123', 10);
      await this.adminRepo.save({ username: 'admin', password: hashed });
    }
  }
}