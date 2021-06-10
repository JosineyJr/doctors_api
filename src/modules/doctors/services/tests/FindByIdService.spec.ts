import faker from 'faker';
import FakeCepProvider from '@modules/cep/providers/CepProvider/Fakes/FakeCepProvider';
import FakeCepsRepository from '@modules/cep/repositories/Fakes/FakeCepsRepository';
import RegisterCepService from '@modules/cep/services/RegisterCepService';
import FakeDoctorsRepostiory from '@modules/doctors/repositories/fakes/FakeDoctorsRepository';
import AppError from '@shared/errors/AppError';
import FakeSpecialtiesRepository from '@modules/specialties/repositories/Fakes/FakeSpecialtiesRepository';
import CreateDoctorService from '../CreateDoctorService';
import FindByIdService from '../FindDoctorByIdService';
import ListAllDoctorsService from '../ListAllDoctorsService';

let fakeDoctorsRepository: FakeDoctorsRepostiory;
let fakeSpecialtiesRepository: FakeSpecialtiesRepository;
let fakeCepsRepository: FakeCepsRepository;

let fakeCepProvider: FakeCepProvider;

let createDoctorService: CreateDoctorService;
let registerCepService: RegisterCepService;
let listAllDoctorsService: ListAllDoctorsService;
let findByIdService: FindByIdService;

describe('FindById', () => {
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
    findByIdService = new FindByIdService(fakeDoctorsRepository);
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
    await expect(findByIdService.execute('id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
  it('should be able to find the doctor by id', async () => {
    const allDoctors = await listAllDoctorsService.execute();
    const findById = await findByIdService.execute(allDoctors[0].id);
    expect(findById?.cep.cep).toEqual('35163143');
    expect(findById?.crm).toEqual('1234567');
  });
});
