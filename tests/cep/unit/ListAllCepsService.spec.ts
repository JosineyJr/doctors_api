import FakeCepsRepository from '@modules/cep/repositories/fakes/FakeCepsRepository';
import FakeCepProvider from '@modules/cep/providers/CepProvider/fakes/FakeCepProvider';
import RegisterCepService from '../../../src/modules/cep/services/RegisterCepService';
import ListAllCepsService from '../../../src/modules/cep/services/ListAllCepsService';

let fakeCepsRepository: FakeCepsRepository;

let fakeCepProvider: FakeCepProvider;

let registerCepService: RegisterCepService;
let listAllCepsService: ListAllCepsService;

describe('ListAllCeps', () => {
  beforeEach(() => {
    fakeCepsRepository = new FakeCepsRepository();

    fakeCepProvider = new FakeCepProvider();

    registerCepService = new RegisterCepService(
      fakeCepsRepository,
      fakeCepProvider,
    );
    listAllCepsService = new ListAllCepsService(fakeCepsRepository);
  });
  it('should be able to list all doctors', async () => {
    await registerCepService.execute('35163143');
    await registerCepService.execute('35160138');

    const allCeps = await listAllCepsService.execute();
    expect(Array.isArray(allCeps)).toBeTruthy();
    expect(allCeps).toHaveLength(2);
  });
});
