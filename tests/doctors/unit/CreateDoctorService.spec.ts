import faker from 'faker';
import FakeCepProvider from '@modules/cep/providers/CepProvider/fakes/FakeCepProvider';
import FakeCepsRepository from '@modules/cep/repositories/fakes/FakeCepsRepository';
import RegisterCepService from '@modules/cep/services/RegisterCepService';
import FakeDoctorsRepostiory from '@modules/doctors/repositories/fakes/FakeDoctorsRepository';
import FakeSpecialtiesRepository from '@modules/specialties/repositories/fakes/FakeSpecialtiesRepository';
import AppError from '@shared/errors/AppError';
import CreateDoctorService from '@modules/doctors/services/CreateDoctorService';

let fakeCepProvider: FakeCepProvider;

let fakeDoctorsRepository: FakeDoctorsRepostiory;
let fakeSpecialtiesRepository: FakeSpecialtiesRepository;
let fakeCepsRepository: FakeCepsRepository;

let registerCepService: RegisterCepService;
let createDoctorService: CreateDoctorService;

describe('CreateDoctor', () => {
  beforeEach(() => {
    fakeCepProvider = new FakeCepProvider();

    fakeDoctorsRepository = new FakeDoctorsRepostiory();
    fakeSpecialtiesRepository = new FakeSpecialtiesRepository();
    fakeCepsRepository = new FakeCepsRepository();

    registerCepService = new RegisterCepService(
      fakeCepsRepository,
      fakeCepProvider,
    );
    createDoctorService = new CreateDoctorService(
      fakeDoctorsRepository,
      fakeSpecialtiesRepository,
      registerCepService,
    );
  });
  it('should not be able to create a new doctor who has less than  two specialties', async () => {
    await expect(
      createDoctorService.execute({
        cellPhone: '31999999999',
        cep: '35163143',
        crm: '1234567',
        name: faker.name.firstName(),
        specialties: ['Alergologia'],
        landline: '3138242424',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new doctor who has some unregistered specialty', async () => {
    await expect(
      createDoctorService.execute({
        cellPhone: '31999999999',
        cep: '35163143',
        crm: '1234567',
        name: faker.name.firstName(),
        specialties: ['Alergologia', 'Cirurgia'],
        landline: '3138242424',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not able to create a new doctor who has a cep with less than 8 digits', async () => {
    await expect(
      createDoctorService.execute({
        cellPhone: '31999999999',
        cep: '3516314',
        crm: '1234567',
        name: faker.name.firstName(),
        specialties: ['Alergologia', 'Angiologia'],
        landline: '3138242424',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not able to create a new doctor who has a cep with more than 8 digits', async () => {
    await expect(
      createDoctorService.execute({
        cellPhone: '31999999999',
        cep: '351631433',
        crm: '1234567',
        name: faker.name.firstName(),
        specialties: ['Alergologia', 'Angiologia'],
        landline: '3138242424',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new doctor with a crm that has already been registered', async () => {
    await createDoctorService.execute({
      cellPhone: '31999993999',
      cep: '35163143',
      crm: '1234567',
      name: faker.name.firstName(),
      specialties: ['Alergologia', 'Angiologia'],
      landline: '3138242424',
    });
    await expect(
      createDoctorService.execute({
        cellPhone: '31999999999',
        cep: '60331400',
        crm: '1234567',
        name: faker.name.firstName(),
        specialties: ['Alergologia', 'Buco maxilo'],
        landline: '3138242424',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new doctor with a cell phone that has already been registered', async () => {
    await createDoctorService.execute({
      cellPhone: '3199999999',
      cep: '35163143',
      crm: '1234567',
      name: faker.name.firstName(),
      specialties: ['Alergologia', 'Angiologia'],
      landline: '3138242424',
    });
    await expect(
      createDoctorService.execute({
        cellPhone: '3199999999',
        cep: '60331400',
        crm: '1234561',
        name: faker.name.firstName(),
        specialties: ['Alergologia', 'Buco maxilo'],
        landline: '3138242424',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new doctor with a invalid cell phone format', async () => {
    await expect(
      createDoctorService.execute({
        cellPhone: '3139999999',
        cep: '60331400',
        crm: '1234561',
        name: faker.name.firstName(),
        specialties: ['Alergologia', 'Buco maxilo'],
        landline: '3138242424',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to create a new doctor with a new cep', async () => {
    const createdDoctor = await createDoctorService.execute({
      cellPhone: '3199999999',
      cep: '35163143',
      crm: '1234567',
      name: faker.name.firstName(),
      specialties: ['Alergologia', 'Angiologia'],
      landline: '3138242424',
    });
    expect(createdDoctor).toHaveProperty('id');
    expect(createdDoctor.cep).toHaveProperty('id');
    expect(createdDoctor.specialties[0]).toHaveProperty('id');
    expect(createdDoctor.specialties[1]).toHaveProperty('id');
  });
  it('should be able to create a new doctor with a registered cep', async () => {
    const doctorCep = await createDoctorService.execute({
      cellPhone: '3199999998',
      cep: '35163143',
      crm: '1234567',
      name: faker.name.firstName(),
      specialties: ['Alergologia', 'Angiologia'],
      landline: '3138242424',
    });
    const createdDoctor = await createDoctorService.execute({
      cellPhone: '3199999999',
      cep: '35163143',
      crm: '1234561',
      name: faker.name.firstName(),
      specialties: ['Alergologia', 'Buco maxilo'],
      landline: '3138242424',
    });
    expect(createdDoctor).toHaveProperty('id');
    expect(createdDoctor.cep).toHaveProperty('id');
    expect(createdDoctor.cep).toEqual(doctorCep.cep);
    expect(createdDoctor.specialties[0]).toHaveProperty('id');
    expect(createdDoctor.specialties[1]).toHaveProperty('id');
  });
});
