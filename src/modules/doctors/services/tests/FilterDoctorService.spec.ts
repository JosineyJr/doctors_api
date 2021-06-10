import faker from 'faker';
import FakeCepProvider from '@modules/cep/providers/CepProvider/Fakes/FakeCepProvider';
import FakeCepsRepository from '@modules/cep/repositories/Fakes/FakeCepsRepository';
import RegisterCepService from '@modules/cep/services/RegisterCepService';
import FakeDoctorsRepostiory from '@modules/doctors/repositories/fakes/FakeDoctorsRepository';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import FakeSpecialtiesRepository from '@modules/specialties/repositories/Fakes/FakeSpecialtiesRepository';
import CreateDoctorService from '../CreateDoctorService';
import FilterDoctorService from '../FilterDoctorService';
import FindByDoctorIdService from '../FindDoctorByIdService';
import FindDoctorByCrmService from '../FindDoctorByCrmService';

let fakeCepProvider: FakeCepProvider;

let fakeDoctorsRepository: FakeDoctorsRepostiory;
let fakeSpecialtiesRepository: FakeSpecialtiesRepository;
let fakeCepsRepository: FakeCepsRepository;

let registerCepService: RegisterCepService;
let createDoctorService: CreateDoctorService;
let findDoctorByIdService: FindByDoctorIdService;
let findDoctorByCrmService: FindDoctorByCrmService;
let filterDoctorService: FilterDoctorService;

let createdDoctor: Doctor;

describe('FilterDoctor', () => {
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
    findDoctorByCrmService = new FindDoctorByCrmService(fakeDoctorsRepository);
    findDoctorByIdService = new FindByDoctorIdService(fakeDoctorsRepository);
    filterDoctorService = new FilterDoctorService(
      findDoctorByIdService,
      findDoctorByCrmService,
    );
    createdDoctor = await createDoctorService.execute({
      cellPhone: '31999999999',
      cep: '35163143',
      crm: '1234567',
      name: faker.name.firstName(),
      specialties: ['Alergologia', 'Angiologia'],
      landline: '3138242424',
    });
  });
  it('should be able to filter doctor by id', async () => {
    const findById = jest.spyOn(fakeDoctorsRepository, 'findById');
    const filteredDoctor = await filterDoctorService.execute(createdDoctor.id);
    expect(findById).toHaveBeenCalledTimes(1);
    expect(filteredDoctor.id).toEqual(createdDoctor.id);
  });
  it('should be able to filter doctor by crm', async () => {
    const findByCrm = jest.spyOn(fakeDoctorsRepository, 'findByCrm');
    const filteredDoctor = await filterDoctorService.execute(createdDoctor.crm);
    expect(findByCrm).toHaveBeenCalledTimes(1);
    expect(filteredDoctor.id).toEqual(createdDoctor.id);
    expect(filteredDoctor.crm).toEqual(createdDoctor.crm);
  });
});
