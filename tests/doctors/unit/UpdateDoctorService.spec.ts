import faker from 'faker';
import FakeCepProvider from '@modules/cep/providers/CepProvider/fakes/FakeCepProvider';
import FakeCepsRepository from '@modules/cep/repositories/fakes/FakeCepsRepository';
import RegisterCepService from '@modules/cep/services/RegisterCepService';
import FakeDoctorsRepostiory from '@modules/doctors/repositories/fakes/FakeDoctorsRepository';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import FakeSpecialtiesRepository from '@modules/specialties/repositories/fakes/FakeSpecialtiesRepository';
import AppError from '@shared/errors/AppError';
import CreateDoctorService from '@modules/doctors/services/CreateDoctorService';
import UpdateDoctorService from '@modules/doctors/services/UpdateDoctorService';

let fakeCepProvider: FakeCepProvider;

let fakeDoctorsRepository: FakeDoctorsRepostiory;
let fakeSpecialtiesRepository: FakeSpecialtiesRepository;
let fakeCepsRepository: FakeCepsRepository;

let registerCepService: RegisterCepService;
let createDoctorService: CreateDoctorService;
let updateDoctorService: UpdateDoctorService;

let createdDoctor: Doctor;

describe('UpdateDoctor', () => {
  beforeEach(async () => {
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
    updateDoctorService = new UpdateDoctorService(
      fakeDoctorsRepository,
      fakeSpecialtiesRepository,
      registerCepService,
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
  it('should not be able to update a doctor that does not exists', async () => {
    await expect(
      updateDoctorService.execute({
        id: 'uuid',
        specialties: ['Alergologia'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update a doctor who has less than  two specialties', async () => {
    await expect(
      updateDoctorService.execute({
        id: createdDoctor.id,
        specialties: ['Alergologia'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update a doctor who has some unregistered specialty', async () => {
    await expect(
      updateDoctorService.execute({
        id: createdDoctor.id,
        specialties: ['Alergologia', 'Cirurgia'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not able to update a doctor who has a cep with less than 8 digits', async () => {
    await expect(
      updateDoctorService.execute({
        id: createdDoctor.id,
        cep: '3516314',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not able to update a doctor who has a cep with more than 8 digits', async () => {
    await expect(
      updateDoctorService.execute({
        id: createdDoctor.id,
        cep: '351631433',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update a doctor with a crm that has already been registered', async () => {
    await expect(
      updateDoctorService.execute({
        id: createdDoctor.id,
        crm: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update a doctor with a cell phone that has already been registered', async () => {
    await expect(
      updateDoctorService.execute({
        id: createdDoctor.id,
        cellPhone: '31999999999',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update a doctor with a new cep', async () => {
    const updatedDoctor = await updateDoctorService.execute({
      id: createdDoctor.id,
      cep: '60331400',
    });
    expect(updatedDoctor).toHaveProperty('id');
    expect(updatedDoctor.cep).toHaveProperty('id');
    expect(updatedDoctor.cep.cep).toEqual('60331400');
  });
  it('should be able to update a doctor with a new name', async () => {
    const updatedDoctor = await updateDoctorService.execute({
      id: createdDoctor.id,
      name: 'Maria',
    });
    expect(updatedDoctor).toHaveProperty('id');
    expect(updatedDoctor.name).toEqual('Maria');
  });
  it('should be able to update a doctor with a new crm', async () => {
    const updatedDoctor = await updateDoctorService.execute({
      id: createdDoctor.id,
      crm: '0001234',
    });
    expect(updatedDoctor).toHaveProperty('id');
    expect(updatedDoctor.crm).toEqual('0001234');
  });
  it('should be able to update a doctor with a new cell phone', async () => {
    const updatedDoctor = await updateDoctorService.execute({
      id: createdDoctor.id,
      cellPhone: '31997014086',
    });
    expect(updatedDoctor).toHaveProperty('id');
    expect(updatedDoctor.cellPhone).toEqual('31997014086');
  });
  it('should be able to update a doctor with a new landline', async () => {
    const updatedDoctor = await updateDoctorService.execute({
      id: createdDoctor.id,
      landline: '313826242424',
    });
    expect(updatedDoctor).toHaveProperty('id');
    expect(updatedDoctor.landline).toEqual('313826242424');
  });
  it('should be able to update a doctor with new specialties', async () => {
    const updatedDoctor = await updateDoctorService.execute({
      id: createdDoctor.id,
      specialties: ['Alergologia', 'Cardiologia infantil'],
    });
    expect(updatedDoctor).toHaveProperty('id');
    expect(updatedDoctor.specialties[1].name).toEqual('Cardiologia infantil');
  });
});
