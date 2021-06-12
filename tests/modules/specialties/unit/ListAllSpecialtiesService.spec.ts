import FakeSpecialtiesRepository from '@modules/specialties/repositories/fakes/FakeSpecialtiesRepository';
import CreateSpecialtyService from '@modules/specialties/services/CreateSpecialtyService';
import ListAllSpecialtiesService from '@modules/specialties/services/ListAllSpecialtiesService';
import * as faker from 'faker';

let fakeSpecialtiesRepository: FakeSpecialtiesRepository;

let createSpecialtyService: CreateSpecialtyService;
let listAllSpecialtiesService: ListAllSpecialtiesService;

describe('ListAllSpecialties', () => {
  beforeEach(() => {
    fakeSpecialtiesRepository = new FakeSpecialtiesRepository();

    createSpecialtyService = new CreateSpecialtyService(
      fakeSpecialtiesRepository,
    );
    listAllSpecialtiesService = new ListAllSpecialtiesService(
      fakeSpecialtiesRepository,
    );
  });
  it('should be able to list all specialties', async () => {
    await createSpecialtyService.execute(faker.company.companyName());
    await createSpecialtyService.execute(faker.company.companyName());

    const allSpecialties = await listAllSpecialtiesService.execute();

    expect(Array.isArray(allSpecialties)).toBeTruthy();
    expect(allSpecialties).toHaveLength(6);
  });
});
