import axios from 'axios';
import AppError from '@shared/errors/AppError';
import IRegisterCepDTO from '@modules/cep/dtos/IRegisterCepDTO';
import ICepProvider from '../models/ICepProvider';

class CepProvider implements ICepProvider {
  private api = axios.create({
    baseURL: 'https://viacep.com.br/ws/',
  });

  public async getAddress(cep: string): Promise<IRegisterCepDTO> {
    const { data } = await this.api.get(`${cep}/json`);

    if (data.erro) {
      throw new AppError('Cep does not exist', 401);
    }

    return data as IRegisterCepDTO;
  }
}

export default CepProvider;
