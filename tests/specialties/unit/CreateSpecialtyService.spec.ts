import FakeSpecialtiesRepository from '@modules/specialties/repositories/fakes/FakeSpecialtiesRepository';
import CreateSpecialtyService from '@modules/specialties/services/CreateSpecialtyService';
import AppError from '../../../src/shared/errors/AppError';

let fakeSpecialtiesRepository: FakeSpecialtiesRepository;

let createSpecialtyService: CreateSpecialtyService;

describe('CreateSpecialty', () => {
  beforeEach(() => {
    fakeSpecialtiesRepository = new FakeSpecialtiesRepository();

    createSpecialtyService = new CreateSpecialtyService(
      fakeSpecialtiesRepository,
    );
  });
  it('should not be able to create a repeated specialty', async () => {
    await createSpecialtyService.execute('Cirurgia');
    await expect(
      createSpecialtyService.execute('Cirurgia'),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to create a new specialty', async () => {
    const createdSpecialty = await createSpecialtyService.execute('Cirurgia');

    expect(createdSpecialty).toHaveProperty('id');
    expect(createdSpecialty.name).toEqual('Cirurgia');
  });
});
