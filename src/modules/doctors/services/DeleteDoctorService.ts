import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IDoctorsRepository from '../repositories/IDoctorsRepository';

@injectable()
class DeleteDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const doctorFound = await this.doctorsRepository.findById(id);

    if (!doctorFound) throw new AppError('Doctor has not been registered yet');

    await this.doctorsRepository.delete(doctorFound);
  }
}

export default DeleteDoctorService;
