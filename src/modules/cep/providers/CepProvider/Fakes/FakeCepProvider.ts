import IRegisterCepDTO from '@modules/cep/dtos/IRegisterCepDTO';
import ICepProvider from '../models/ICepProvider';

class FakeCepProvider implements ICepProvider {
  public async getAddress(cep: string): Promise<IRegisterCepDTO> {
    const cepData: IRegisterCepDTO = {} as IRegisterCepDTO;

    cepData.bairro = '';
    cepData.cep = cep;
    cepData.complemento = '';
    cepData.ddd = '';
    cepData.gia = '';
    cepData.ibge = '';
    cepData.localidade = '';
    cepData.logradouro = '';
    cepData.siafi = '';
    cepData.uf = '';

    return cepData;
  }
}

export default FakeCepProvider;
