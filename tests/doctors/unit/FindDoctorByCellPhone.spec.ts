import faker from 'faker';
import FakeCepProvider from '@modules/cep/providers/CepProvider/fakes/FakeCepProvider';
import FakeCepsRepository from '@modules/cep/repositories/fakes/FakeCepsRepository';
import RegisterCepService from '@modules/cep/services/RegisterCepService';
import FakeDoctorsRepostiory from '@modules/doctors/repositories/fakes/FakeDoctorsRepository';
import AppError from '@shared/errors/AppError';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import FakeSpecialtiesRepository from '@modules/specialties/repositories/fakes/FakeSpecialtiesRepository';
import CreateDoctorService from '@modules/doctors/services/CreateDoctorService';
import FindDoctorByCellPhoneService from '@modules/doctors/services/FindDoctorByCellPhoneService';

let fakeDoctorsRepository: FakeDoctorsRepostiory;
let fakeSpecialtiesRepository: FakeSpecialtiesRepository;
let fakeCepsRepository: FakeCepsRepository;

let fakeCepProvider: FakeCepProvider;

let createDoctorService: CreateDoctorService;
let registerCepService: RegisterCepService;
let findDoctorByCellPhoneService: FindDoctorByCellPhoneService;

let createdDoctor: Doctor;

describe('FindDoctorByCellPhone', () => {
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
    findDoctorByCellPhoneService = new FindDoctorByCellPhoneService(
      fakeDoctorsRepository,
    );
    createdDoctor = await createDoctorService.execute({
      cellPhone: '31999999999',
      cep: '35163143',
      crm: '1234567',
      name: faker.name.firstName(),
      specialties: ['Alergologia', 'Angiologia'],
      landline: faker.phone.phoneNumber(),
    });
  });
  it('should not be able to find the doctor by cell phone', async () => {
    await expect(
      findDoctorByCellPhoneService.execute('crm'),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to find the doctor by cell phone', async () => {
    const findById = await findDoctorByCellPhoneService.execute(
      createdDoctor.cellPhone,
    );
    expect(findById.cep.cep).toEqual('35163143');
    expect(findById.cellPhone).toEqual('31999999999');
  });
});
