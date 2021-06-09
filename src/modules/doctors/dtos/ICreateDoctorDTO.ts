import Cep from '@modules/CEP/infra/typeorm/entities/Cep';
import Specialty from '@modules/specialties/infra/typeorm/entities/Specialty';

export default interface ICreateDoctorDTO {
  name: string;

  crm: string;

  landline?: string;

  cellPhone: string;

  cep: Cep;

  specialties: Specialty[];
}
