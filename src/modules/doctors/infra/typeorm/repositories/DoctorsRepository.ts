import Cep from '@modules/cep/infra/typeorm/entities/Cep';
import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import Specialty from '@modules/specialties/infra/typeorm/entities/Specialty';
import { getRepository, Repository, SelectQueryBuilder } from 'typeorm';
import Doctor from '../entities/Doctor';

class DoctorsRepository implements IDoctorsRepository {
  private ormRepository: Repository<Doctor>;

  constructor() {
    this.ormRepository = getRepository(Doctor);
  }

  private async findDoctorsWithCepAndSpecialties(
    paramName?: string,
    param?: Object,
  ): Promise<SelectQueryBuilder<Doctor>> {
    return this.ormRepository
      .createQueryBuilder('doctor')
      .leftJoinAndSelect('doctor.cep', 'cep')
      .leftJoinAndSelect('doctor.specialties', 'specialties')
      .where(paramName ? `doctor.${paramName} = :param` : '', { param })
      .select([
        'doctor.id',
        'doctor.name',
        'doctor.crm',
        'doctor.landline',
        'doctor.cellPhone',
        'cep.id',
        'cep.cep',
        'cep.street',
        'cep.complement',
        'cep.district',
        'cep.city',
        'cep.uf',
        'cep.ddd',
        'cep.ibge',
        'cep.gia',
        'cep.siafi',
        'specialties.id',
        'specialties.name',
      ]);
  }

  public async create({
    cellPhone,
    cep,
    crm,
    name,
    specialties,
    landline,
  }: Partial<Doctor>): Promise<Doctor> {
    const createdDoctor = this.ormRepository.create({
      cellPhone,
      cep,
      crm,
      landline,
      name,
      specialties,
    });

    await this.ormRepository.save(createdDoctor);

    return createdDoctor;
  }

  public async save(doctor: Doctor): Promise<Doctor> {
    return this.ormRepository.save(doctor);
  }

  public async delete(doctor: Doctor): Promise<void> {
    await this.ormRepository.softRemove(doctor);
  }

  public async recover(doctor: Doctor): Promise<Doctor> {
    return this.ormRepository.recover(doctor);
  }

  public async listAll(): Promise<Doctor[]> {
    const allDoctors = await this.findDoctorsWithCepAndSpecialties('', {});

    return allDoctors.getMany();
  }

  public async findDeleted(id: string): Promise<Doctor | undefined> {
    const doctorFound = await this.ormRepository
      .createQueryBuilder('doctor')
      .where('doctor.id = :id', { id })
      .leftJoinAndSelect('doctor.cep', 'cep')
      .leftJoinAndSelect('doctor.specialties', 'specialties')
      .withDeleted()
      .select([
        'doctor.id',
        'doctor.name',
        'doctor.crm',
        'doctor.landline',
        'doctor.cellPhone',
        'cep.id',
        'cep.cep',
        'cep.street',
        'cep.complement',
        'cep.district',
        'cep.city',
        'cep.uf',
        'cep.ddd',
        'cep.ibge',
        'cep.gia',
        'cep.siafi',
        'specialties.id',
        'specialties.name',
      ])
      .getOne();

    return doctorFound;
  }

  public async findAllDeleted(): Promise<Doctor[]> {
    const doctorsFound = await this.ormRepository
      .createQueryBuilder('doctor')
      .select('*')
      .withDeleted()
      .getMany();

    return doctorsFound;
  }

  public async findById(id: string): Promise<Doctor | undefined> {
    const doctorFound = await this.findDoctorsWithCepAndSpecialties('id', id);

    return doctorFound.getOne();
  }

  public async findByCrm(crm: string): Promise<Doctor | undefined> {
    const doctorFound = await this.findDoctorsWithCepAndSpecialties('crm', crm);

    return doctorFound.getOne();
  }

  public async findByCellPhone(cellPhone: string): Promise<Doctor | undefined> {
    const doctorFound = await this.findDoctorsWithCepAndSpecialties(
      'cellPhone',
      cellPhone,
    );

    return doctorFound.getOne();
  }

  public async findByCep(cep: Cep): Promise<Doctor[]> {
    const doctorsFound = await this.ormRepository.find({ where: { cep } });

    return doctorsFound;
  }

  public async findByLandline(landline: string): Promise<Doctor[]> {
    const doctorsFound = await this.findDoctorsWithCepAndSpecialties(
      'landline',
      landline,
    );

    return doctorsFound.getMany();
  }

  public async findBySpecialties(specialty: Specialty): Promise<Doctor[]> {
    const doctorsFound = await this.ormRepository.find({
      where: { specialty },
    });

    return doctorsFound;
  }
}

export default DoctorsRepository;
