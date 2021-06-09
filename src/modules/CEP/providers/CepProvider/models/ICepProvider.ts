import IApiCorreiosResponseDTO from '@modules/CEP/dtos/IApiCorreiosResponseDTO';

export default interface ICepProvider {
  getAddress(cep: string): Promise<IApiCorreiosResponseDTO>;
}
