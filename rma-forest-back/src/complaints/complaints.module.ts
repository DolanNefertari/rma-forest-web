import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplaintsController } from './complaints.controller';
import { ComplaintsService } from './complaints.service';
import { Complaint } from '../entities/complaints.entity';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([Complaint]), EmailModule],
  controllers: [ComplaintsController],
  providers: [ComplaintsService],
  exports: [TypeOrmModule],
})
export class ComplaintsModule {}