import faker from 'faker';
import FakeCepProvider from '@modules/cep/providers/CepProvider/Fakes/FakeCepProvider';
import FakeCepsRepository from '@modules/cep/repositories/Fakes/FakeCepsRepository';
import RegisterCepService from '@modules/cep/services/RegisterCepService';
import FakeDoctorsRepostiory from '@modules/doctors/repositories/fakes/FakeDoctorsRepository';
import FakeSpecialtiesRepository from '@modules/specialties/repositories/Fakes/FakeSpecialtiesRepository';
import AppError from '@shared/errors/AppError';
import CreateDoctorService from '../CreateDoctorService';

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
        cellPhone: faker.phone.phoneNumber(),
        cep: '35163143',
        crm: '1234567',
        name: faker.name.firstName(),
        specialties: ['Alergologia'],
        landline: faker.phone.phoneNumber(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new doctor who has some unregistered specialty', async () => {
    await expect(
      createDoctorService.execute({
        cellPhone: faker.phone.phoneNumber(),
        cep: '35163143',
        crm: '1234567',
        name: faker.name.firstName(),
        specialties: ['Alergologia', 'Cirurgia'],
        landline: faker.phone.phoneNumber(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not able to create a new doctor who has a cep with less than 8 digits', async () => {
    await expect(
      createDoctorService.execute({
        cellPhone: faker.phone.phoneNumber(),
        cep: '3516314',
        crm: '1234567',
        name: faker.name.firstName(),
        specialties: ['Alergologia', 'Angiologia'],
        landline: faker.phone.phoneNumber(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not able to create a new doctor who has a cep with more than 8 digits', async () => {
    await expect(
      createDoctorService.execute({
        cellPhone: faker.phone.phoneNumber(),
        cep: '351631433',
        crm: '1234567',
        name: faker.name.firstName(),
        specialties: ['Alergologia', 'Angiologia'],
        landline: faker.phone.phoneNumber(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new doctor with a crm that has already been registered', async () => {
    await createDoctorService.execute({
      cellPhone: faker.phone.phoneNumber(),
      cep: '35163143',
      crm: '1234567',
      name: faker.name.firstName(),
      specialties: ['Alergologia', 'Angiologia'],
      landline: faker.phone.phoneNumber(),
    });
    await expect(
      createDoctorService.execute({
        cellPhone: faker.phone.phoneNumber(),
        cep: '60331400',
        crm: '1234567',
        name: faker.name.firstName(),
        specialties: ['Alergologia', 'Buco maxilo'],
        landline: faker.phone.phoneNumber(),
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
      landline: faker.phone.phoneNumber(),
    });
    await expect(
      createDoctorService.execute({
        cellPhone: '3199999999',
        cep: '60331400',
        crm: '1234561',
        name: faker.name.firstName(),
        specialties: ['Alergologia', 'Buco maxilo'],
        landline: faker.phone.phoneNumber(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to create a new doctor with a new cep', async () => {
    const doctorCreated = await createDoctorService.execute({
      cellPhone: faker.phone.phoneNumber(),
      cep: '35163143',
      crm: '1234567',
      name: faker.name.firstName(),
      specialties: ['Alergologia', 'Angiologia'],
      landline: faker.phone.phoneNumber(),
    });
    expect(doctorCreated).toHaveProperty('id');
    expect(doctorCreated.cep).toHaveProperty('id');
    expect(doctorCreated.specialties[0]).toHaveProperty('id');
    expect(doctorCreated.specialties[1]).toHaveProperty('id');
  });
  it('should be able to create a new doctor with a registered cep', async () => {
    const doctorCep = await createDoctorService.execute({
      cellPhone: faker.phone.phoneNumber(),
      cep: '35163143',
      crm: '1234567',
      name: faker.name.firstName(),
      specialties: ['Alergologia', 'Angiologia'],
      landline: faker.phone.phoneNumber(),
    });
    const doctorCreated = await createDoctorService.execute({
      cellPhone: faker.phone.phoneNumber(),
      cep: '35163143',
      crm: '1234561',
      name: faker.name.firstName(),
      specialties: ['Alergologia', 'Buco maxilo'],
      landline: faker.phone.phoneNumber(),
    });
    expect(doctorCreated).toHaveProperty('id');
    expect(doctorCreated.cep).toHaveProperty('id');
    expect(doctorCreated.cep).toEqual(doctorCep.cep);
    expect(doctorCreated.specialties[0]).toHaveProperty('id');
    expect(doctorCreated.specialties[1]).toHaveProperty('id');
  });
});
