import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Complaint } from '../entities/complaints.entity';
import { EmailService } from '../email/email.service';
import { CaptchaService } from '../captcha/captcha.service';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectRepository(Complaint)
    private complaintsRepository: Repository<Complaint>,
    private emailService: EmailService,
    private captchaService: CaptchaService,
  ) {}

  async create(data: {
    subject: string;
    message: string;
    name?: string;
    email?: string;
    isAnonymous: boolean;
    recaptchaToken: string;
    relationship?: string;
    location?: string;
    incidentDate?: Date;
    accused?: string;
  }) {
    const isCaptchaValid = await this.captchaService.verifyToken(data.recaptchaToken);

    if (!isCaptchaValid) {
      return {
        success: false,
        message: 'Error al verificar el captcha. Intenta nuevamente.',
      };
    }

    const complaint = this.complaintsRepository.create(data);
    const saved = await this.complaintsRepository.save(complaint);

    await this.sendInternalNotification(saved);

    if (!data.isAnonymous && data.email) {
      await this.sendConfirmationToComplainant(saved);
    }

    return saved;
  }

  private async sendInternalNotification(complaint: Complaint) {
    const html = `
      <h2>🔔 Nueva denuncia recibida</h2>
      <p><strong>ID:</strong> ${complaint.id}</p>
      <p><strong>Asunto:</strong> ${complaint.subject}</p>
      <p><strong>Fecha:</strong> ${complaint.createdAt}</p>
      ${!complaint.isAnonymous ? `
        <p><strong>Denunciante:</strong> ${complaint.name} (${complaint.email})</p>
      ` : '<p><strong>Denuncia anónima</strong></p>'}
      <p><strong>Mensaje:</strong></p>
      <p style="background: #f4f4f4; padding: 1rem; border-radius: 8px;">${complaint.message}</p>
      <hr />
      <small>Gestiona esta denuncia en el panel de administración.</small>
    `;

    await this.emailService.sendEmail({
      to: 'info@rmaforest.cl',
      subject: `[DENUNCIA NUEVA] #${complaint.id} - ${complaint.subject}`,
      html,
    });
  }

  private async sendConfirmationToComplainant(complaint: Complaint) {
    if (!complaint.email) return;

    const html = `
      <h2>📬 Confirmación de recepción</h2>
      <p>Estimado/a ${complaint.name},</p>
      <p>Hemos recibido correctamente su denuncia con el asunto <strong>"${complaint.subject}"</strong>.</p>
      <p>Su número de seguimiento es: <strong>#${complaint.id}</strong></p>
      <p>El equipo de RMA Forest revisará su caso a la brevedad y se comunicará con usted si es necesario.</p>
      <p>Gracias por colaborar con nosotros.</p>
      <hr />
      <small>Este es un mensaje automático, por favor no responder a este correo.</small>
    `;

    await this.emailService.sendEmail({
      to: complaint.email,
      subject: `Confirmación de recepción - Denuncia #${complaint.id}`,
      html,
    });
  }

  async findAll() {
    return this.complaintsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async updateStatus(id: number, status: string) {
    await this.complaintsRepository.update(id, { status });
    return { success: true };
  }
}