import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('complaints')
export class Complaint {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn()
  createdAt: Date;
}