import faker from 'faker';
import FakeCepProvider from '@modules/cep/providers/CepProvider/fakes/FakeCepProvider';
import FakeCepsRepository from '@modules/cep/repositories/fakes/FakeCepsRepository';
import RegisterCepService from '@modules/cep/services/RegisterCepService';
import FakeDoctorsRepostiory from '@modules/doctors/repositories/fakes/FakeDoctorsRepository';
import FakeSpecialtiesRepository from '@modules/specialties/repositories/fakes/FakeSpecialtiesRepository';
import CreateDoctorService from '@modules/doctors/services/CreateDoctorService';
import ListAllDoctorsService from '@modules/doctors/services/ListAllDoctorsService';

let fakeDoctorsRepository: FakeDoctorsRepostiory;
let fakeSpecialtiesRepository: FakeSpecialtiesRepository;
let fakeCepsRepository: FakeCepsRepository;

let fakeCepProvider: FakeCepProvider;

let createDoctorService: CreateDoctorService;
let registerCepService: RegisterCepService;
let listAllDoctorsService: ListAllDoctorsService;

describe('ListAllDoctors', () => {
  beforeEach(() => {
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
  });
  it('should be able to list all doctors', async () => {
    await createDoctorService.execute({
      cellPhone: '3199999998',
      cep: '35163143',
      crm: '1234567',
      name: faker.name.firstName(),
      specialties: ['Alergologia', 'Angiologia'],
      landline: '3138242424',
    });
    await createDoctorService.execute({
      cellPhone: '3199999999',
      cep: '35163143',
      crm: '1234561',
      name: faker.name.firstName(),
      specialties: ['Alergologia', 'Buco maxilo'],
      landline: '3138242424',
    });
    const allDoctors = await listAllDoctorsService.execute();
    expect(allDoctors.length).toBe(2);
    expect(allDoctors[0].crm).toEqual('1234567');
  });
});
