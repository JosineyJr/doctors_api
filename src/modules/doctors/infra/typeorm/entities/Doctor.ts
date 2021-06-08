import Cep from '@modules/CEP/infra/typeorm/entities/Cep';
import Specialty from '@modules/specialties/infra/typeorm/entities/Specialty';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('doctorsTB')
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

  @ManyToMany(() => Specialty, specialty => specialty.doctors, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({
    name: 'doctors_has_specialties',
    joinColumn: { name: 'doctor_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'specialty_id', referencedColumnName: 'id' },
  })
  specialties: Specialty[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Doctor;
