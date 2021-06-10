import IRegisterCepDTO from '@modules/cep/dtos/IRegisterCepDTO';

export default interface ICepProvider {
  getAddress(cep: string): Promise<IRegisterCepDTO>;
}
