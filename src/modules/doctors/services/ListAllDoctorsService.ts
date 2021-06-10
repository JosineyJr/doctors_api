import { inject, injectable } from 'tsyringe';
import Doctor from '../infra/typeorm/entities/Doctor';
import IDoctorsRepository from '../repositories/IDoctorsRepository';

@injectable()
class ListAllDoctorsService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute(): Promise<Doctor[]> {
    const allDoctors = this.doctorsRepository.listAll();

    return allDoctors;
  }
}

export default ListAllDoctorsService;
