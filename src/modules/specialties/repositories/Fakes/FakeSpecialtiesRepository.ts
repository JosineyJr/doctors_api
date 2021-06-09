import faker from 'faker';
import ICreateSpecialtyDTO from '@modules/specialties/dtos/ICreateSpecialtyDTO';
import Specialty from '@modules/specialties/infra/typeorm/entities/Specialty';
import ISpecialtiesRepository from '../ISpecialtiesRepository';

class FakeSpecialtiesRepository implements ISpecialtiesRepository {
  private specialties: Specialty[] = [];

  public async create({
    name,
    doctors,
  }: ICreateSpecialtyDTO): Promise<Specialty> {
    const specialtyCreated = new Specialty();

    Object.assign(specialtyCreated, {
      id: faker.datatype.uuid(),
      name,
      doctors,
    });

    this.specialties.push(specialtyCreated);

    return specialtyCreated;
  }

  public async save(specialty: Specialty): Promise<Specialty> {
    const specialtyIndexFound = this.specialties.findIndex(
      findSpecialty => findSpecialty.id === specialty.id,
    );

    this.specialties[specialtyIndexFound] = specialty;

    return this.specialties[specialtyIndexFound];
  }

  public async findById(id: string): Promise<Specialty | undefined> {
    const specialtyFound = this.specialties.find(
      findSpecialty => findSpecialty.id === id,
    );

    return specialtyFound;
  }

  public async findByName(name: string): Promise<Specialty | undefined> {
    const specialtyFound = this.specialties.find(
      findSpecialty => findSpecialty.name === name,
    );

    return specialtyFound;
  }
}

export default FakeSpecialtiesRepository;
