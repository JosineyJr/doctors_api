import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';
import Doctor from '../infra/typeorm/entities/Doctor';
import FindDoctorByCrmService from './FindDoctorByCrmService';
import FindByDoctorIdService from './FindDoctorByIdService';

@injectable()
class FilterDoctorService {
  constructor(
    @inject('FindByDoctorIdService')
    private findDoctorByIdService: FindByDoctorIdService,
    @inject('FindDoctorByCrmService')
    private findDoctorByCrmService: FindDoctorByCrmService,
  ) {}

  public async execute(param: string): Promise<Doctor> {
    if (validate(param)) return this.findDoctorByIdService.execute(param);

    return this.findDoctorByCrmService.execute(param);
  }
}

export default FilterDoctorService;
