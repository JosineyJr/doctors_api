import Doctor from '../infra/typeorm/entities/Doctor';

export default interface IDoctorsRepository {
  findById(id: string): Promise<Doctor>;

  findByCrm(crm: string): Promise<Doctor>;

  findByCep(cep: string): Promise<Doctor[]>;

  findByCellPhone(cellPhone: string): Promise<Doctor>;

  findByLandline(landline: string): Promise<Doctor[]>;
}
