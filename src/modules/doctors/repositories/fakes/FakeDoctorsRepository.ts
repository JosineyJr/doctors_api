import faker from 'faker';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import Cep from '@modules/cep/infra/typeorm/entities/Cep';
import Specialty from '@modules/specialties/infra/typeorm/entities/Specialty';
import IDoctorsRepository from '../IDoctorsRepository';

class FakeDoctorsRepostiory implements IDoctorsRepository {
  private doctors: Doctor[] = [];

  public async create({
    cellPhone,
    cep,
    crm,
    name,
    specialties,
    landline,
  }: Partial<Doctor>): Promise<Doctor> {
    const createdDoctor = new Doctor();

    Object.assign(createdDoctor, {
      id: faker.datatype.uuid(),
      cellPhone,
      cep,
      crm,
      landline,
      name,
      specialties,
    });

    this.doctors.push(createdDoctor);

    return createdDoctor;
  }

  public async save(doctor: Doctor): Promise<Doctor> {
    const doctorIndexFound = this.doctors.findIndex(
      findDoctor => findDoctor.id === doctor.id,
    );

    this.doctors[doctorIndexFound] = doctor;

    return this.doctors[doctorIndexFound];
  }

  public async listAll(): Promise<Doctor[]> {
    return [...this.doctors];
  }

  public async findById(id: string): Promise<Doctor | undefined> {
    const doctorFound = this.doctors.find(findDoctor => findDoctor.id === id);

    return doctorFound;
  }

  public async findByCrm(crm: string): Promise<Doctor | undefined> {
    const doctorFound = this.doctors.find(findDoctor => findDoctor.crm === crm);

    return doctorFound;
  }

  public async findByCellPhone(cellPhone: string): Promise<Doctor | undefined> {
    const doctorFound = this.doctors.find(
      findDoctor => findDoctor.cellPhone === cellPhone,
    );

    return doctorFound;
  }

  public async findByCep(cep: Cep): Promise<Doctor[]> {
    const doctorsFound = this.doctors.filter(
      filterDoctors => filterDoctors.cep.cep === cep.cep,
    );

    return doctorsFound;
  }

  public async findByLandline(landline: string): Promise<Doctor[]> {
    const doctorsFound = this.doctors.filter(
      filterDoctors => filterDoctors.landline === landline,
    );

    return doctorsFound;
  }

  public async findBySpecialties(specialty: Specialty): Promise<Doctor[]> {
    const doctorsFound = this.doctors.filter(filterDoctors =>
      filterDoctors.specialties.find(
        findSpecialty => findSpecialty.name === specialty.name,
      ),
    );

    return doctorsFound;
  }
}

export default FakeDoctorsRepostiory;
