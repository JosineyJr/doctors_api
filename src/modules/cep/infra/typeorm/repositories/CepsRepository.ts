import IRegisterCepDTO from '@modules/cep/dtos/IRegisterCepDTO';
import ICepsRepository from '@modules/cep/repositories/ICepsRepository';
import { getRepository, Repository } from 'typeorm';
import Cep from '../entities/Cep';

class CepsRepository implements ICepsRepository {
  private ormRepository: Repository<Cep>;

  constructor() {
    this.ormRepository = getRepository(Cep);
  }

  public async register({
    bairro,
    cep,
    complemento,
    ddd,
    gia,
    ibge,
    localidade,
    logradouro,
    siafi,
    uf,
  }: IRegisterCepDTO): Promise<Cep> {
    const registeredCep = this.ormRepository.create({
      cep,
      city: localidade,
      complement: complemento,
      ddd,
      district: bairro,
      street: logradouro,
      uf,
      gia,
      ibge,
      siafi,
    });

    await this.ormRepository.save(registeredCep);

    return registeredCep;
  }

  public async save(cep: Cep): Promise<Cep> {
    return this.ormRepository.save(cep);
  }

  public async findById(id: string): Promise<Cep | undefined> {
    const cepFound = await this.ormRepository.findOne(id);

    return cepFound;
  }

  public async findByCep(cep: string): Promise<Cep | undefined> {
    const cepFound = await this.ormRepository.findOne({ where: { cep } });

    return cepFound;
  }

  public async list(): Promise<Cep[]> {
    return this.ormRepository.find({});
  }
}

export default CepsRepository;
