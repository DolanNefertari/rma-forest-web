import { Controller, Post, Body, Get, Put, Param } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Post('create')
  async create(@Body() body: {
    subject: string;
    message: string;
    name?: string;
    email?: string;
    isAnonymous: boolean;
  }) {
    try {
      const complaint = await this.complaintsService.create({
        subject: body.subject,
        message: body.message,
        name: body.isAnonymous ? undefined : body.name,
        email: body.isAnonymous ? undefined : body.email,
        isAnonymous: body.isAnonymous,
      });
      return { success: true, message: 'Complaint submitted successfully', id: complaint.id };
    } catch (error) {
      return { success: false, message: 'Error submitting complaint' };
    }
  }

  @Get('all')
  async findAll() {
    return this.complaintsService.findAll();
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: number, @Body() body: { status: string }) {
    return this.complaintsService.updateStatus(id, body.status);
  }
}