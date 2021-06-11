import { container } from 'tsyringe';

import CepsRepository from '@modules/cep/infra/typeorm/repositories/CepsRepository';
import CepProvider from '@modules/cep/providers/CepProvider/implementations/CepProvider';
import ICepProvider from '@modules/cep/providers/CepProvider/models/ICepProvider';
import ICepsRepository from '@modules/cep/repositories/ICepsRepository';
import SpecialtiesRepository from '@modules/specialties/infra/typeorm/repositories/SpecialtiesRepository';
import ISpecialtiesRepository from '@modules/specialties/repositories/ISpecialtiesRepository';
import DoctorsRepository from '@modules/doctors/infra/typeorm/repositories/DoctorsRepository';
import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import RegisterCepService from '@modules/cep/services/RegisterCepService';
import FindByDoctorIdService from '@modules/doctors/services/FindDoctorByIdService';
import FindDoctorByCrmService from '@modules/doctors/services/FindDoctorByCrmService';
import FindDoctorByCellPhoneService from '@modules/doctors/services/FindDoctorByCellPhoneService';
import FindDoctorByLandLineService from '@modules/doctors/services/FindDoctorByLandlineService';

container.registerSingleton<ICepsRepository>('CepsRepository', CepsRepository);

container.registerSingleton<ISpecialtiesRepository>(
  'SpecialtiesRepository',
  SpecialtiesRepository,
);

container.registerSingleton<IDoctorsRepository>(
  'DoctorsRepository',
  DoctorsRepository,
);

container.registerSingleton<FindByDoctorIdService>(
  'FindByDoctorIdService',
  FindByDoctorIdService,
);

container.registerSingleton<FindDoctorByCrmService>(
  'FindDoctorByCrmService',
  FindDoctorByCrmService,
);

container.registerSingleton<FindDoctorByCellPhoneService>(
  'FindDoctorByCellPhoneService',
  FindDoctorByCellPhoneService,
);

container.registerSingleton<FindDoctorByCellPhoneService>(
  'FindDoctorByCellPhoneService',
  FindDoctorByCellPhoneService,
);

container.registerSingleton<FindDoctorByLandLineService>(
  'FindDoctorByLandLineService',
  FindDoctorByLandLineService,
);

container.registerSingleton<RegisterCepService>(
  'RegisterCepService',
  RegisterCepService,
);

container.registerSingleton<ICepProvider>('CepProvider', CepProvider);
