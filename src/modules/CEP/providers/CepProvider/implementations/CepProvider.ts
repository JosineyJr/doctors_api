import axios from 'axios';
import IRegisterCepDTO from '@modules/CEP/dtos/IRegisterCepDTO';
import ICepProvider from '../models/ICepProvider';

class CepProvider implements ICepProvider {
  private api = axios.create({
    baseURL: 'https://viacep.com.br/ws/',
  });

  public async getAddress(cep: string): Promise<IRegisterCepDTO> {
    const result = await this.api.get(`${cep}/json`);

    return result.data as IRegisterCepDTO;
  }
}

export default CepProvider;
