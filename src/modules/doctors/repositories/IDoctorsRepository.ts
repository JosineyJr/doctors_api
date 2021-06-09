import Cep from '@modules/CEP/infra/typeorm/entities/Cep';
import Specialty from '@modules/specialties/infra/typeorm/entities/Specialty';
import ICreateDoctorDTO from '../dtos/ICreateDoctorDTO';
import Doctor from '../infra/typeorm/entities/Doctor';

export default interface IDoctorsRepository {
  create(doctorData: ICreateDoctorDTO): Promise<Doctor>;

  save(doctor: Doctor): Promise<Doctor>;

  findById(id: string): Promise<Doctor | undefined>;

  findByCrm(crm: string): Promise<Doctor | undefined>;

  findByCep(cep: Cep): Promise<Doctor[]>;

  findByCellPhone(cellPhone: string): Promise<Doctor | undefined>;

  findByLandline(landline: string): Promise<Doctor[]>;

  findBySpecialties(specialty: Specialty): Promise<Doctor[]>;
}
