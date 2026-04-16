import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from '../entities/admin-user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminUser)
    private adminRepo: Repository<AdminUser>,
  ) {}

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.adminRepo.findOne({ where: { username } });
    if (!user) return false;
    return bcrypt.compareSync(password, user.password);
  }

  async createDefaultAdmin() {
    const exists = await this.adminRepo.findOne({ where: { username: 'admin' } });
    if (!exists) {
      const hashed = bcrypt.hashSync('admin123', 10);
      await this.adminRepo.save({ username: 'admin', password: hashed });
    }
  }
}