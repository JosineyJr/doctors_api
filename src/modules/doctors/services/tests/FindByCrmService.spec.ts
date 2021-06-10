import faker from 'faker';
import FakeCepProvider from '@modules/cep/providers/CepProvider/Fakes/FakeCepProvider';
import FakeCepsRepository from '@modules/cep/repositories/Fakes/FakeCepsRepository';
import RegisterCepService from '@modules/cep/services/RegisterCepService';
import FakeDoctorsRepostiory from '@modules/doctors/repositories/fakes/FakeDoctorsRepository';
import AppError from '@shared/errors/AppError';
import FakeSpecialtiesRepository from '@modules/specialties/repositories/Fakes/FakeSpecialtiesRepository';
import CreateDoctorService from '../CreateDoctorService';
import ListAllDoctorsService from '../ListAllDoctorsService';
import FindByCrmService from '../FindDoctorByCrmService';

let fakeDoctorsRepository: FakeDoctorsRepostiory;
let fakeSpecialtiesRepository: FakeSpecialtiesRepository;
let fakeCepsRepository: FakeCepsRepository;

let fakeCepProvider: FakeCepProvider;

let createDoctorService: CreateDoctorService;
let registerCepService: RegisterCepService;
let listAllDoctorsService: ListAllDoctorsService;
let findByCrmService: FindByCrmService;

describe('FindByCrm', () => {
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
    listAllDoctorsService = new ListAllDoctorsService(fakeDoctorsRepository);
    findByCrmService = new FindByCrmService(fakeDoctorsRepository);
    await createDoctorService.execute({
      cellPhone: faker.phone.phoneNumber(),
      cep: '35163143',
      crm: '1234567',
      name: faker.name.firstName(),
      specialties: ['Alergologia', 'Angiologia'],
      landline: faker.phone.phoneNumber(),
    });
  });
  it('should not be able to find the doctor by id', async () => {
    await expect(findByCrmService.execute('crm')).rejects.toBeInstanceOf(
      AppError,
    );
  });
  it('should be able to find the doctor by id', async () => {
    const allDoctors = await listAllDoctorsService.execute();
    const findById = await findByCrmService.execute(allDoctors[0].crm);
    expect(findById?.cep.cep).toEqual('35163143');
    expect(findById?.crm).toEqual('1234567');
  });
});
