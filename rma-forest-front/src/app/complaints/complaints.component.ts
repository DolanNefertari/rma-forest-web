import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../services/api/api.service';
import { CaptchaService } from '../services/captcha.service';

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
    MatSelectModule, // ← agregar
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
    subjectOther: '',
    relationship: '',
    relationshipOther:'',
    location: '',
    incidentDate: '',
    message: '',
    accused: ''
  };

  // Opciones para el select de asunto
  subjectOptions = [
    'Delito comercial',
    'Acoso Laboral',
    'Acoso Sexual',
    'Delito ambiental',
    'Violencia en el trabajo',
    'Otros'
  ];

  // Opciones para relación con la empresa
  relationshipOptions = [
    'Postulante',
    'Cliente',
    'Colaborador',
    'Proveedor',
    'Contratista',
    'Otro'
  ];

  constructor(private api: ApiService, private captchaService: CaptchaService) {}

  // En el componente
onSubjectChange() {
  if (this.form.subject !== 'Otros') {
    this.form.subjectOther = ''; // Limpia el campo si no está seleccionado "Otros"
  }
}

onRelationshipChange() {
  if (this.form.relationship !== 'Otro') {
    this.form.relationshipOther = ''; // Limpia el campo si no está seleccionado "Otro"
  }
}

  async onSubmit() {
    // Determinar el valor final según selección
    const finalSubject = this.form.subject === 'Otros' ? this.form.subjectOther : this.form.subject;
    const finalRelationship = this.form.relationship === 'Otro' ? this.form.relationshipOther : this.form.relationship;

    // Validación específica para "Otros"
    if (this.form.subject === 'Otros' && !this.form.subjectOther) {
      alert('Debes especificar el asunto');
      return;
    }

    if (this.form.relationship === 'Otro' && !this.form.relationshipOther) {
      alert('Debes especificar tu relación con la empresa');
      return;
    }
    // Validar asunto
    if (!this.form.subject) {
      alert('Debes seleccionar un asunto');
      return;
    }
    if (this.form.subject === 'Otros' && !this.form.subjectOther) {
      alert('Debes especificar el asunto');
      return;
    }
  
    // Validar relación
    if (!this.form.relationship) {
      alert('Debes seleccionar tu relación con la empresa');
      return;
    }
    if (this.form.relationship === 'Otro' && !this.form.relationshipOther) {
      alert('Debes especificar tu relación con la empresa');
      return;
    }
  
    // Validar descripción
    if (!this.form.message) {
      alert('Debes describir los hechos con detalle');
      return;
    }
  
    // Validar email si no es anónimo
    if (!this.form.isAnonymous && !this.form.email) {
      alert('Email es requerido para denuncias no anónimas');
      return;
    }
    let captchaToken = '';
  try {
    captchaToken = await this.captchaService.executeCaptcha('submit_complaint');
  } catch (error) {
    alert('Error al verificar el captcha. Intenta nuevamente.');
    return;
  }
  
    this.loading = true;
  
    this.api.post('complaints/create', {
      subject: finalSubject,
      message: this.form.message,
      relationship: finalRelationship,
      location: this.form.location,
      incidentDate: this.form.incidentDate,
      accused: this.form.accused,
      name: this.form.isAnonymous ? null : this.form.name,
      email: this.form.isAnonymous ? null : this.form.email,
      isAnonymous: this.form.isAnonymous,
      recaptchaToken:captchaToken
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
            subjectOther: '',
            relationship: '',
            relationshipOther: '',
            location: '',
            incidentDate: '',
            message: '',
            accused: ''
          };
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Error al enviar la denuncia. Intenta nuevamente.');
        this.loading = false;
      }
    });
  }
}