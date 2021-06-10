import faker from 'faker';
import FakeCepProvider from '@modules/cep/providers/CepProvider/Fakes/FakeCepProvider';
import FakeCepsRepository from '@modules/cep/repositories/Fakes/FakeCepsRepository';
import RegisterCepService from '@modules/cep/services/RegisterCepService';
import FakeDoctorsRepostiory from '@modules/doctors/repositories/fakes/FakeDoctorsRepository';
import AppError from '@shared/errors/AppError';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import FakeSpecialtiesRepository from '@modules/specialties/repositories/Fakes/FakeSpecialtiesRepository';
import CreateDoctorService from '../CreateDoctorService';
import FindDoctorByCrmService from '../FindDoctorByCrmService';

let fakeDoctorsRepository: FakeDoctorsRepostiory;
let fakeSpecialtiesRepository: FakeSpecialtiesRepository;
let fakeCepsRepository: FakeCepsRepository;

let fakeCepProvider: FakeCepProvider;

let createDoctorService: CreateDoctorService;
let registerCepService: RegisterCepService;
let findDoctorByCrmService: FindDoctorByCrmService;

let createdDoctor: Doctor;

describe('FindDoctorByCrm', () => {
  beforeEach(async () => {
    fakeDoctorsRepository = new FakeDoctorsRepostiory();
    fakeSpecialtiesRepository = new FakeSpecialtiesRepository();
    fakeCepsRepository = new FakeCepsRepository();

    fakeCepProvider = new FakeCepProvider();

    registerCepService = new RegisterCepService(
      fakeCepsRepository,
      fakeCepProvider,
    );
    createDoctorService = new CreateDoctorService(
      fakeDoctorsRepository,
      fakeSpecialtiesRepository,
      registerCepService,
    );
    findDoctorByCrmService = new FindDoctorByCrmService(fakeDoctorsRepository);
    createdDoctor = await createDoctorService.execute({
      cellPhone: faker.phone.phoneNumber(),
      cep: '35163143',
      crm: '1234567',
      name: faker.name.firstName(),
      specialties: ['Alergologia', 'Angiologia'],
      landline: faker.phone.phoneNumber(),
    });
  });
  it('should not be able to find the doctor by crm', async () => {
    await expect(findDoctorByCrmService.execute('crm')).rejects.toBeInstanceOf(
      AppError,
    );
  });
  it('should be able to find the doctor by crm', async () => {
    const findById = await findDoctorByCrmService.execute(createdDoctor.crm);
    expect(findById.cep.cep).toEqual('35163143');
    expect(findById.crm).toEqual('1234567');
  });
});
