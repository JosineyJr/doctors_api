import ICreateSpecialtyDTO from '../dtos/ICreateSpecialtyDTO';
import Specialty from '../infra/typeorm/entities/Specialty';

export default interface ISpecialtiesRepository {
  create(specialtyData: ICreateSpecialtyDTO): Promise<Specialty>;

  save(specialty: Specialty): Promise<Specialty>;

  findById(id: string): Promise<Specialty | undefined>;

  findByName(name: string): Promise<Specialty | undefined>;

  findSpecialties(names: string[]): Promise<Specialty[]>;

  listAll(): Promise<Specialty[]>;
}
