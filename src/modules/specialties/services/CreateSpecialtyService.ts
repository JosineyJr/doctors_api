import { inject, injectable } from 'tsyringe';
import ISpecialtiesRepository from '@modules/specialties/repositories/ISpecialtiesRepository';
import Specialty from '@modules/specialties/infra/typeorm/entities/Specialty';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateSpecialtyService {
  constructor(
    @inject('SpecialtiesRepository')
    private specialtiesRepository: ISpecialtiesRepository,
  ) {}

  public async execute(name: string): Promise<Specialty> {
    const checkSpecialtyExists = await this.specialtiesRepository.findByName(
      name,
    );

    if (checkSpecialtyExists)
      throw new AppError('Specialty has already been registered');

    const createdSpecialty = await this.specialtiesRepository.create({ name });

    return createdSpecialty;
  }
}

export default CreateSpecialtyService;
