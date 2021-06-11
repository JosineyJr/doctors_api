import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';
import validations from '@config/valitadions';
import Doctor from '../infra/typeorm/entities/Doctor';
import FindDoctorByCrmService from './FindDoctorByCrmService';
import FindByDoctorIdService from './FindDoctorByIdService';
import FindDoctorByCellPhoneService from './FindDoctorByCellPhoneService';
import FindDoctorByLandLineService from './FindDoctorByLandlineService';

@injectable()
class FilterDoctorService {
  constructor(
    @inject('FindByDoctorIdService')
    private findDoctorByIdService: FindByDoctorIdService,
    @inject('FindDoctorByCrmService')
    private findDoctorByCrmService: FindDoctorByCrmService,
    @inject('FindDoctorByCellPhoneService')
    private findDoctorByCellPhoneService: FindDoctorByCellPhoneService,
    @inject('FindDoctorByLandLineService')
    private findDoctorByLandLineService: FindDoctorByLandLineService,
  ) {}

  public async execute(param: string): Promise<Doctor | Doctor[]> {
    if (validate(param)) return this.findDoctorByIdService.execute(param);

    if (validations.crm.test(param))
      return this.findDoctorByCrmService.execute(param);

    if (Number(param.charAt(2)) >= 6)
      return this.findDoctorByCellPhoneService.execute(param);

    return this.findDoctorByLandLineService.execute(param);
  }
}

export default FilterDoctorService;
