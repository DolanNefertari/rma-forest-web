import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Injectable()
export class ContactService {
  constructor(private emailService: EmailService) {}

  async sendEmail(data: {
    nombre: string;
    email: string;
    mensaje: string;
  }) {
    const html = `
      <h2>📬 Nuevo mensaje desde el sitio web</h2>
      <p><strong>👤 Nombre:</strong> ${data.nombre}</p>
      <p><strong>📧 Email:</strong> ${data.email}</p>
      <p><strong>💬 Mensaje:</strong></p>
      <p style="background: #f4f4f4; padding: 1rem; border-radius: 8px;">${data.mensaje.replace(/\n/g, '<br>')}</p>
      <hr />
      <small>Mensaje enviado desde el formulario de contacto de RMA Forest.</small>
    `;

    const result = await this.emailService.sendEmail({
      to: 'info@rmaforest.cl',
      subject: `[RMA Forest] Nuevo contacto: ${data.nombre}`,
      html,
      replyTo: data.email,
    });

    if (result.success) {
      return {
        success: true,
        message: 'Mensaje enviado correctamente. Te contactaremos pronto.',
      };
    } else {
      return {
        success: false,
        message: 'Error al enviar el mensaje. Intenta nuevamente más tarde.',
      };
    }
  }
}