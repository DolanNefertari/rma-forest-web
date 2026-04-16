import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-complaints',
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
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent {
  loading = false;
  form = {
    isAnonymous: false,
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(private api: ApiService) {} // ← inyecta ApiService

  onSubmit() {
    // Validaciones
    if (!this.form.subject || !this.form.message) {
      alert('Subject and message are required');
      return;
    }

    if (!this.form.isAnonymous && !this.form.email) {
      alert('Email is required for non-anonymous complaints');
      return;
    }

    this.loading = true;

    this.api.post('complaints/create', {
      subject: this.form.subject,
      message: this.form.message,
      name: this.form.isAnonymous ? null : this.form.name,
      email: this.form.isAnonymous ? null : this.form.email,
      isAnonymous: this.form.isAnonymous
    }).subscribe({
      next: (res: any) => {
        alert(res.message);
        if (res.success) {
          // Reset form
          this.form = {
            isAnonymous: false,
            name: '',
            email: '',
            subject: '',
            message: ''
          };
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Error submitting complaint. Please try again.');
        this.loading = false;
      }
    });
  }
}