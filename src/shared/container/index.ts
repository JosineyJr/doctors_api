import CepsRepository from '@modules/CEP/infra/typeorm/repositories/CepsRepository';
import CepProvider from '@modules/CEP/providers/CepProvider/implementations/CepProvider';
import ICepProvider from '@modules/CEP/providers/CepProvider/models/ICepProvider';
import ICepsRepository from '@modules/CEP/repositories/ICepsRepository';
import SpecialtiesRepository from '@modules/specialties/infra/typeorm/repositories/SpecialtiesRepository';
import ISpecialtiesRepository from '@modules/specialties/repositories/ISpecialtiesRepository';
import DoctorsRepository from '@modules/doctors/infra/typeorm/repositories/DoctorsRepository';
import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICepsRepository>('CepsRepository', CepsRepository);

container.registerSingleton<ISpecialtiesRepository>(
  'SpecialtiesRepository',
  SpecialtiesRepository,
);

container.registerSingleton<IDoctorsRepository>(
  'DoctorsRepository',
  DoctorsRepository,
);

container.registerSingleton<ICepProvider>('CepProvider', CepProvider);
