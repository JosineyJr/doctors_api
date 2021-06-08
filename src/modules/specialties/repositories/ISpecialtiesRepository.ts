import Specialty from '../infra/typeorm/entities/Specialty';

export default interface ISpecialtiesRepository {
  findById(id: string): Promise<Specialty>;

  findByName(name: string): Promise<Specialty>;
}
