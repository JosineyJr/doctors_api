import faker from 'faker';
import IRegisterCepDTO from '@modules/cep/dtos/IRegisterCepDTO';
import Cep from '@modules/cep/infra/typeorm/entities/Cep';
import ICepsRepository from '../ICepsRepository';

class FakeCepsRepository implements ICepsRepository {
  private ceps: Cep[] = [];

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
    const registeredCep = new Cep();

    Object.assign(registeredCep, {
      id: faker.datatype.uuid(),
      cep,
      city: localidade,
      street: logradouro,
      district: bairro,
      uf,
      ddd,
      ibge,
      gia,
      complement: complemento,
      siafi,
    });

    this.ceps.push(registeredCep);

    return registeredCep;
  }

  public async save(cep: Cep): Promise<Cep> {
    const cepIndexFound = this.ceps.findIndex(findCep => findCep.id === cep.id);

    this.ceps[cepIndexFound] = cep;

    return this.ceps[cepIndexFound];
  }

  public async listAll(): Promise<Cep[]> {
    return [...this.ceps];
  }

  public async findById(id: string): Promise<Cep | undefined> {
    const cepFound = this.ceps.find(findCep => findCep.id === id);

    return cepFound;
  }

  public async findByCep(cep: string): Promise<Cep | undefined> {
    const cepFound = this.ceps.find(findCep => findCep.cep === cep);

    return cepFound;
  }
}

export default FakeCepsRepository;
