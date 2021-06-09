import IRegisterCepDTO from '../dtos/IRegisterCepDTO';
import Cep from '../infra/typeorm/entities/Cep';

export default interface ICepsRepository {
  register(cepData: IRegisterCepDTO): Promise<Cep>;

  save(cepData: Cep): Promise<Cep>;

  findById(id: string): Promise<Cep | undefined>;

  findByCep(cep: string): Promise<Cep | undefined>;
}
