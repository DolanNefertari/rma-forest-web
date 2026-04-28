import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: parseInt(this.configService.get('SMTP_PORT') || '587'),
      secure: false,
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },
    });
  }

  async sendEmail(options: {
    to: string;
    subject: string;
    html: string;
    from?: string;
    replyTo?: string;
  }) {
    try {
      const htmlWithLogo = `
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://rmaforest.cl/assets/logos/logo-horizontal.png" alt="RMA Forest" style="max-width: 200px;">
      </div>
      ${options.html}
    `;
      const mailOptions = {
        from: options.from || `"RMA Forest" <${this.configService.get('SMTP_USER')}>`,
        to: options.to,
        subject: options.subject,
        html: htmlWithLogo,
        replyTo: options.replyTo,
      };

      await this.transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }
  }
}