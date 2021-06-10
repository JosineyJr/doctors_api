import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Doctor from '../infra/typeorm/entities/Doctor';
import IDoctorsRepository from '../repositories/IDoctorsRepository';

@injectable()
class FindByDoctorIdService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute(id: string): Promise<Doctor> {
    const doctorFound = await this.doctorsRepository.findById(id);

    if (!doctorFound) throw new AppError('Doctor has not been registered yet');

    return doctorFound;
  }
}

export default FindByDoctorIdService;
