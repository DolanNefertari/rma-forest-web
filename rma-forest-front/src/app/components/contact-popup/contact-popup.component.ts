import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApiService } from '../../../services/api/api.service';
import { CaptchaService } from '../../services/captcha.service';

@Component({
  selector: 'app-contact-popup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './contact-popup.component.html',
  styleUrls: ['./contact-popup.component.scss']
})
export class ContactPopupComponent {
  @Output() closed = new EventEmitter<void>();

  visible = false;
  loading = false;
  form = {
    nombre: '',
    email: '',
    mensaje: '',
    privacy: false
  };

  constructor(
    private api: ApiService,
    private captchaService: CaptchaService
  ) {}

  open() {
    this.visible = true;
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.visible = false;
    document.body.style.overflow = '';
    this.closed.emit();
  }

  async onSubmit() {
    
    if (!this.form.privacy) {
      alert('Debes aceptar la política de privacidad');
      return;
    }

    this.loading = true;
    try {
      const token = await this.captchaService.executeCaptcha('form_contact');
      const payload = { ...this.form, recaptchaToken: token };

    this.api.post('contact/send', payload).subscribe({
      next: (res: any) => {
        alert(res.message);
        if (res.success) {
          this.form = { nombre: '', email: '', mensaje: '', privacy: false };
          this.close();
        }
        this.loading = false;
      },
      error: () => {
        alert('Error de conexión con el servidor');
        this.loading = false;
      }
    });
    
  } catch (error) {
    alert('Error al verificar el captcha. Intenta nuevamente.');
    this.loading = false;
  }
  }
}