import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Doctor from '../infra/typeorm/entities/Doctor';
import IDoctorsRepository from '../repositories/IDoctorsRepository';

@injectable()
class RecoverDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute(id: string): Promise<Doctor> {
    const checkDoctorDeleted = await this.doctorsRepository.findDeleted(id);

    if (!checkDoctorDeleted)
      throw new AppError('Doctor has not been deleted yet');

    const doctorFound = await this.doctorsRepository.recover(
      checkDoctorDeleted,
    );

    return doctorFound;
  }
}

export default RecoverDoctorService;
