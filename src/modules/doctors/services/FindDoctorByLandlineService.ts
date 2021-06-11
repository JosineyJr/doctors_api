import { inject, injectable } from 'tsyringe';
import Doctor from '../infra/typeorm/entities/Doctor';
import IDoctorsRepository from '../repositories/IDoctorsRepository';

@injectable()
class FindDoctorByLandLineService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute(landline: string): Promise<Doctor[]> {
    const doctorsFound = await this.doctorsRepository.findByLandline(landline);

    return doctorsFound;
  }
}

export default FindDoctorByLandLineService;
