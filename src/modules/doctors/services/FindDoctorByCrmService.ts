import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Doctor from '../infra/typeorm/entities/Doctor';
import IDoctorsRepository from '../repositories/IDoctorsRepository';

@injectable()
class FindDoctorByCrmService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute(crm: string): Promise<Doctor> {
    const doctorFound = await this.doctorsRepository.findByCrm(crm);

    if (!doctorFound) throw new AppError('Crm has not been registered yet');

    return doctorFound;
  }
}

export default FindDoctorByCrmService;
