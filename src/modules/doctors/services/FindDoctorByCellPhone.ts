import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Doctor from '../infra/typeorm/entities/Doctor';
import IDoctorsRepository from '../repositories/IDoctorsRepository';

@injectable()
class FindDoctorByCellPhoneService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute(cellPhone: string): Promise<Doctor> {
    const doctorFound = await this.doctorsRepository.findByCellPhone(cellPhone);

    if (!doctorFound)
      throw new AppError('Cell phone has not been registered yet');

    return doctorFound;
  }
}

export default FindDoctorByCellPhoneService;
