import Cep from '@modules/CEP/infra/typeorm/entities/Cep';
import ICreateDoctorDTO from '@modules/doctors/dtos/ICreateDoctorDTO';
import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import Specialty from '@modules/specialties/infra/typeorm/entities/Specialty';
import { getRepository, Repository } from 'typeorm';
import Doctor from '../entities/Doctor';

class DoctorsRepository implements IDoctorsRepository {
  private ormRepository: Repository<Doctor> = getRepository(Doctor);

  public async create({
    cellPhone,
    cep,
    crm,
    name,
    specialties,
    landline,
  }: ICreateDoctorDTO): Promise<Doctor> {
    const createdDoctor = this.ormRepository.create({
      cellPhone,
      cep,
      crm,
      landline,
      name,
      specialties,
    });

    this.ormRepository.save(createdDoctor);

    return createdDoctor;
  }

  public async save(doctor: Doctor): Promise<Doctor> {
    return this.ormRepository.save(doctor);
  }

  public async findById(id: string): Promise<Doctor | undefined> {
    const doctorFound = await this.ormRepository.findOne(id);

    return doctorFound;
  }

  public async findByCrm(crm: string): Promise<Doctor | undefined> {
    const doctorFound = await this.ormRepository.findOne({ where: { crm } });

    return doctorFound;
  }

  public async findByCellPhone(cellPhone: string): Promise<Doctor | undefined> {
    const doctorFound = await this.ormRepository.findOne({
      where: { cellPhone },
    });

    return doctorFound;
  }

  public async findByCep(cep: Cep): Promise<Doctor[]> {
    const doctorsFound = await this.ormRepository.find({ where: { cep } });

    return doctorsFound;
  }

  public async findByLandline(landline: string): Promise<Doctor[]> {
    const doctorsFound = await this.ormRepository.find({ where: { landline } });

    return doctorsFound;
  }

  public async findBySpecialties(specialty: Specialty): Promise<Doctor[]> {
    const doctorsFound = await this.ormRepository.find({
      where: { specialty },
    });

    return doctorsFound;
  }
}

export default DoctorsRepository;
