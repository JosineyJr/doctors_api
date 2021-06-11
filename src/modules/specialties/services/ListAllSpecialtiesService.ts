import { inject, injectable } from 'tsyringe';
import ISpecialtiesRepository from '@modules/specialties/repositories/ISpecialtiesRepository';
import Specialty from '@modules/specialties/infra/typeorm/entities/Specialty';

@injectable()
class ListAllSpecialtiesService {
  constructor(
    @inject('SpecialtiesRepository')
    private specialtiesRepository: ISpecialtiesRepository,
  ) {}

  public async execute(): Promise<Specialty[]> {
    const allSpecialties = await this.specialtiesRepository.listAll();

    return allSpecialties;
  }
}

export default ListAllSpecialtiesService;
