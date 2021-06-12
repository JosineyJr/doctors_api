import faker from 'faker';
import FakeCepProvider from '@modules/cep/providers/CepProvider/fakes/FakeCepProvider';
import FakeCepsRepository from '@modules/cep/repositories/fakes/FakeCepsRepository';
import RegisterCepService from '@modules/cep/services/RegisterCepService';
import FakeDoctorsRepostiory from '@modules/doctors/repositories/fakes/FakeDoctorsRepository';
import FakeSpecialtiesRepository from '@modules/specialties/repositories/fakes/FakeSpecialtiesRepository';
import CreateDoctorService from '@modules/doctors/services/CreateDoctorService';
import DeleteDoctorService from '@modules/doctors/services/DeleteDoctorService';
import AppError from '@shared/errors/AppError';
import FindDoctorByIdService from '@modules/doctors/services/FindDoctorByIdService';
import RecoverDoctorService from '@modules/doctors/services/RecoverDoctorService';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';

let fakeCepProvider: FakeCepProvider;

let fakeDoctorsRepository: FakeDoctorsRepostiory;
let fakeSpecialtiesRepository: FakeSpecialtiesRepository;
let fakeCepsRepository: FakeCepsRepository;

let registerCepService: RegisterCepService;
let createDoctorService: CreateDoctorService;
let findDoctorByIdService: FindDoctorByIdService;
let deleteDoctorService: DeleteDoctorService;
let recoverDoctorService: RecoverDoctorService;

let createdDoctor: Doctor;

describe('RecoverDoctor', () => {
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
    findDoctorByIdService = new FindDoctorByIdService(fakeDoctorsRepository);
    deleteDoctorService = new DeleteDoctorService(fakeDoctorsRepository);
    recoverDoctorService = new RecoverDoctorService(fakeDoctorsRepository);

    createdDoctor = await createDoctorService.execute({
      cellPhone: '3199999999',
      cep: '35163143',
      crm: '1234561',
      name: faker.name.firstName(),
      specialties: ['Alergologia', 'Buco maxilo'],
      landline: '313824242424',
    });
  });
  it('should not be able to recover a doctor', async () => {
    await expect(
      recoverDoctorService.execute(createdDoctor.id),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to recover a doctor', async () => {
    await deleteDoctorService.execute(createdDoctor.id);

    const doctorRecovered = await recoverDoctorService.execute(
      createdDoctor.id,
    );

    expect(doctorRecovered.id).toEqual(createdDoctor.id);
  });
});
