import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';

export default interface ICreateSpecialtyDTO {
  name: string;

  doctors?: Doctor[];
}
