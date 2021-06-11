import faker from 'faker';
import ICreateSpecialtyDTO from '@modules/specialties/dtos/ICreateSpecialtyDTO';
import Specialty from '@modules/specialties/infra/typeorm/entities/Specialty';
import ISpecialtiesRepository from '../ISpecialtiesRepository';

class FakeSpecialtiesRepository implements ISpecialtiesRepository {
  private specialties: Specialty[] = [];

  constructor() {
    const alergologia = new Specialty();

    Object.assign(alergologia, {
      id: faker.datatype.uuid(),
      name: 'Alergologia',
    });

    const angiologia = new Specialty();

    Object.assign(angiologia, {
      id: faker.datatype.uuid(),
      name: 'Angiologia',
    });

    const bucoMaxilo = new Specialty();

    Object.assign(bucoMaxilo, {
      id: faker.datatype.uuid(),
      name: 'Buco maxilo',
    });

    const cardiologiaInfantil = new Specialty();

    Object.assign(cardiologiaInfantil, {
      id: faker.datatype.uuid(),
      name: 'Cardiologia infantil',
    });

    this.specialties.push(alergologia);
    this.specialties.push(angiologia);
    this.specialties.push(bucoMaxilo);
    this.specialties.push(cardiologiaInfantil);
  }

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

  public async findSpecialties(name: string[]): Promise<Specialty[]> {
    const specialtiesFound = this.specialties.filter(findSpecialties =>
      name.find(findName => findName === findSpecialties.name),
    );

    // console.log(specialtiesFound);

    return specialtiesFound;
  }

  public async list(): Promise<Specialty[]> {
    return [...this.specialties];
  }
}

export default FakeSpecialtiesRepository;
