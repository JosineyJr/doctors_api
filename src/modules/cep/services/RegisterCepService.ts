import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import valitions from '@config/valitadions';
import Cep from '../infra/typeorm/entities/Cep';
import ICepProvider from '../providers/CepProvider/models/ICepProvider';
import ICepsRepository from '../repositories/ICepsRepository';

@injectable()
class RegisterCepService {
  constructor(
    @inject('CepsRepository')
    private cepsRepository: ICepsRepository,
    @inject('CepProvider')
    private cepProvider: ICepProvider,
  ) {}

  public async execute(cep: string): Promise<Cep> {
    if (!valitions.cep.test(cep)) throw new AppError('Invalid cep format', 401);

    const allCep = await this.cepsRepository.list();

    const cepFound = allCep.find(findCep => findCep.cep === cep);

    if (!cepFound) {
      const cepData = await this.cepProvider.getAddress(cep);

      cepData.cep = cepData.cep.replace('-', '');

      const cepRegistered = await this.cepsRepository.register(cepData);

      return cepRegistered;
    }

    return cepFound;
  }
}

export default RegisterCepService;
