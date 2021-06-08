import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cep')
class Cep {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cep: string;

  @Column()
  street: string;

  @Column()
  complement: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @Column()
  ddd: string;

  @OneToMany(() => Doctor, doctor => doctor.cep)
  doctors: Doctor[];
}

export default Cep;
