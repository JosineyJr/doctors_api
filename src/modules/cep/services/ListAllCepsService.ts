import { inject, injectable } from 'tsyringe';
import ICepsRepository from '@modules/cep/repositories/ICepsRepository';
import Cep from '@modules/cep/infra/typeorm/entities/Cep';

@injectable()
class ListAllCepsService {
  constructor(
    @inject('CepsRepository')
    private cepsRepository: ICepsRepository,
  ) {}

  public async execute(): Promise<Cep[]> {
    const allCeps = await this.cepsRepository.listAll();

    return allCeps;
  }
}

export default ListAllCepsService;
