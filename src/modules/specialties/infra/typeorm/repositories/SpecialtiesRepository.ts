import ICreateSpecialtyDTO from '@modules/specialties/dtos/ICreateSpecialtyDTO';
import ISpecialtiesRepository from '@modules/specialties/repositories/ISpecialtiesRepository';
import { getRepository, In, Repository } from 'typeorm';
import Specialty from '../entities/Specialty';

class SpecialtiesRepository implements ISpecialtiesRepository {
  private ormRepository: Repository<Specialty>;

  constructor() {
    this.ormRepository = getRepository(Specialty);
  }

  public async create({
    name,
    doctors,
  }: ICreateSpecialtyDTO): Promise<Specialty> {
    const createdSpecialty = this.ormRepository.create({ name, doctors });

    await this.ormRepository.save(createdSpecialty);

    return createdSpecialty;
  }

  public async save(specialty: Specialty): Promise<Specialty> {
    return this.ormRepository.save(specialty);
  }

  public async findById(id: string): Promise<Specialty | undefined> {
    const specialtyFound = await this.ormRepository.findOne(id);

    return specialtyFound;
  }

  public async findByName(name: string): Promise<Specialty | undefined> {
    const specialtyFound = await this.ormRepository.findOne({
      where: { name },
    });

    return specialtyFound;
  }

  public async findSpecialties(names: string[]): Promise<Specialty[]> {
    const specialtiesFound = await this.ormRepository.find({
      where: { name: In(names) },
    });

    return specialtiesFound;
  }

  public async list(): Promise<Specialty[]> {
    const allSpecialties = await this.ormRepository.find({});

    return allSpecialties;
  }
}

export default SpecialtiesRepository;
