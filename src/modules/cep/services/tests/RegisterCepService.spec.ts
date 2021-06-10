import RegisterCepService from '@modules/cep/services/RegisterCepService';
import FakeCepsRepository from '@modules/cep/repositories/Fakes/FakeCepsRepository';
import FakeCepProvider from '@modules/cep/providers/CepProvider/Fakes/FakeCepProvider';
import AppError from '@shared/errors/AppError';

let fakeCepsRepository: FakeCepsRepository;

let fakeCepProvider: FakeCepProvider;

let registerCepService: RegisterCepService;

describe('RegisterCep', () => {
  beforeEach(() => {
    fakeCepsRepository = new FakeCepsRepository();

    fakeCepProvider = new FakeCepProvider();

    registerCepService = new RegisterCepService(
      fakeCepsRepository,
      fakeCepProvider,
    );
  });
  it('should not be able to register a new cep with less than 8 digits', async () => {
    await expect(registerCepService.execute('3516312')).rejects.toBeInstanceOf(
      AppError,
    );
  });
  it('should not be able to register a new cep with more than 8 digits', async () => {
    await expect(
      registerCepService.execute('351631232'),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to register a cep has already been registered', async () => {
    const getAddress = jest.spyOn(fakeCepProvider, 'getAddress');
    await registerCepService.execute('35163143');
    const cepAlreadyRegistered = await registerCepService.execute('35163143');
    expect(cepAlreadyRegistered).toHaveProperty('id');
    expect(cepAlreadyRegistered.cep).toEqual('35163143');
    expect(getAddress).toHaveBeenCalledTimes(1);
  });
  it('should be able to register a new cep', async () => {
    const getAddress = jest.spyOn(fakeCepProvider, 'getAddress');
    await registerCepService.execute('35163143');
    const cepRegistered = await registerCepService.execute('60331400');
    expect(cepRegistered).toHaveProperty('id');
    expect(getAddress).toHaveBeenCalledTimes(2);
  });
});
