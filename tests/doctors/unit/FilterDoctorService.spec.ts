import faker from 'faker';
import FakeCepProvider from '@modules/cep/providers/CepProvider/fakes/FakeCepProvider';
import FakeCepsRepository from '@modules/cep/repositories/fakes/FakeCepsRepository';
import RegisterCepService from '@modules/cep/services/RegisterCepService';
import FakeDoctorsRepostiory from '@modules/doctors/repositories/fakes/FakeDoctorsRepository';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import FakeSpecialtiesRepository from '@modules/specialties/repositories/fakes/FakeSpecialtiesRepository';
import CreateDoctorService from '@modules/doctors/services/CreateDoctorService';
import FilterDoctorService from '@modules/doctors/services/FilterDoctorService';
import FindByDoctorIdService from '@modules/doctors/services/FindDoctorByIdService';
import FindDoctorByCrmService from '@modules/doctors/services/FindDoctorByCrmService';
import FindDoctorByCellPhoneService from '@modules/doctors/services/FindDoctorByCellPhoneService';
import FindDoctorByLandLineService from '@modules/doctors/services/FindDoctorByLandlineService';

let fakeCepProvider: FakeCepProvider;

let fakeDoctorsRepository: FakeDoctorsRepostiory;
let fakeSpecialtiesRepository: FakeSpecialtiesRepository;
let fakeCepsRepository: FakeCepsRepository;

let registerCepService: RegisterCepService;
let createDoctorService: CreateDoctorService;
let findDoctorByIdService: FindByDoctorIdService;
let findDoctorByCrmService: FindDoctorByCrmService;
let findDoctorByCellPhone: FindDoctorByCellPhoneService;
let findDoctorByLandLineService: FindDoctorByLandLineService;
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
    findDoctorByCellPhone = new FindDoctorByCellPhoneService(
      fakeDoctorsRepository,
    );
    findDoctorByLandLineService = new FindDoctorByLandLineService(
      fakeDoctorsRepository,
    );
    filterDoctorService = new FilterDoctorService(
      findDoctorByIdService,
      findDoctorByCrmService,
      findDoctorByCellPhone,
      findDoctorByLandLineService,
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
    const filteredDoctor = (await filterDoctorService.execute(
      createdDoctor.id,
    )) as Doctor;
    expect(findById).toHaveBeenCalledTimes(1);
    expect(filteredDoctor.id).toEqual(createdDoctor.id);
  });
  it('should be able to filter doctor by crm', async () => {
    const findByCrm = jest.spyOn(fakeDoctorsRepository, 'findByCrm');
    const filteredDoctor = (await filterDoctorService.execute(
      createdDoctor.crm,
    )) as Doctor;
    expect(findByCrm).toHaveBeenCalledTimes(1);
    expect(filteredDoctor.id).toEqual(createdDoctor.id);
    expect(filteredDoctor.crm).toEqual(createdDoctor.crm);
  });
  it('should be able to filter doctor by cell phone', async () => {
    const findByCellPhone = jest.spyOn(
      fakeDoctorsRepository,
      'findByCellPhone',
    );
    const filteredDoctor = (await filterDoctorService.execute(
      createdDoctor.cellPhone,
    )) as Doctor;
    expect(findByCellPhone).toHaveBeenCalledTimes(1);
    expect(filteredDoctor.id).toEqual(createdDoctor.id);
    expect(filteredDoctor.cellPhone).toEqual(createdDoctor.cellPhone);
  });
  it('should be able to filter doctor by landline', async () => {
    const findByLandline = jest.spyOn(fakeDoctorsRepository, 'findByLandline');
    const filteredDoctor = (await filterDoctorService.execute(
      createdDoctor.landline,
    )) as Doctor[];
    expect(findByLandline).toHaveBeenCalledTimes(1);
    expect(filteredDoctor[0].id).toEqual(createdDoctor.id);
    expect(filteredDoctor[0].landline).toEqual(createdDoctor.landline);
  });
});
