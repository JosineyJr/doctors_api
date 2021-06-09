import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cepsTB')
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

  @Column()
  ibge: string;

  @Column()
  gia: string;

  @Column()
  siafi: string;

  @OneToMany(() => Doctor, doctor => doctor.cep)
  doctors: Doctor[];
}

export default Cep;
