import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApiService } from '../../../services/api/api.service';

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

  constructor(private api: ApiService) {}

  open() {
    this.visible = true;
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.visible = false;
    document.body.style.overflow = '';
    this.closed.emit();
  }

  onSubmit() {
    if (!this.form.privacy) {
      alert('Debes aceptar la política de privacidad');
      return;
    }

    this.loading = true;

    this.api.post('contact/send', {
      nombre: this.form.nombre,
      email: this.form.email,
      mensaje: this.form.mensaje,
      privacy: this.form.privacy
    }).subscribe({
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
  }
}