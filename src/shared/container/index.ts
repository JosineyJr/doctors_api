import CepsRepository from '@modules/CEP/infra/typeorm/repositories/CepsRepository';
import CepProvider from '@modules/CEP/providers/CepProvider/implementations/CepProvider';
import ICepProvider from '@modules/CEP/providers/CepProvider/models/ICepProvider';
import ICepsRepository from '@modules/CEP/repositories/ICepsRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICepsRepository>('CepsRepository', CepsRepository);

container.registerSingleton<ICepProvider>('CepProvider', CepProvider);
