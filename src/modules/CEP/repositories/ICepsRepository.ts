import Cep from '../infra/typeorm/entities/Cep';

export default interface ICepsRepository {
  findById(id: string): Promise<Cep>;

  findByCep(cep: string): Promise<Cep>;
}
