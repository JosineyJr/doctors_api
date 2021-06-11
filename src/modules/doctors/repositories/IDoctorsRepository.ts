import Cep from '@modules/cep/infra/typeorm/entities/Cep';
import Specialty from '@modules/specialties/infra/typeorm/entities/Specialty';
import Doctor from '../infra/typeorm/entities/Doctor';

export default interface IDoctorsRepository {
  create(doctorData: Partial<Doctor>): Promise<Doctor>;

  save(doctor: Doctor): Promise<Doctor>;

  delete(doctor: Doctor): Promise<void>;

  listAll(): Promise<Doctor[]>;

  findById(id: string): Promise<Doctor | undefined>;

  findByCrm(crm: string): Promise<Doctor | undefined>;

  findByCep(cep: Cep): Promise<Doctor[]>;

  findByCellPhone(cellPhone: string): Promise<Doctor | undefined>;

  findByLandline(landline: string): Promise<Doctor[]>;

  findBySpecialties(specialty: Specialty): Promise<Doctor[]>;
}
