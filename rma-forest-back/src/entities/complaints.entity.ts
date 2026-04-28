// src/entities/complaints.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('complaints')
export class Complaint {
  @PrimaryGeneratedColumn()
  id: number;

  // --- Campos existentes ---
  @Column({ length: 255 })
  subject: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: false })
  isAnonymous: boolean;

  @Column({ type: 'enum', enum: ['received', 'in_review', 'closed'], default: 'received' })
  status: string;

  // --- NUEVOS CAMPOS (agrega esto) ---
  @Column({ nullable: true })
  relationship: string;      // Relación con la empresa

  @Column({ nullable: true })
  location: string;          // Lugar de los hechos

  @Column({ nullable: true })
  incidentDate: Date;        // Fecha del incidente

  @Column({ nullable: true })
  accused: string;           // Persona denunciada

  @CreateDateColumn()
  createdAt: Date;
}