import Cep from '@modules/CEP/infra/typeorm/entities/Cep';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('doctors')
class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  CRM: string;

  @Column()
  landline: string;

  @Column()
  cellPhone: string;

  @ManyToOne(() => Cep, cep => cep.doctors)
  cep: Cep;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Doctor;
