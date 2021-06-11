import { inject, injectable } from 'tsyringe';
import RegisterCepService from '@modules/cep/services/RegisterCepService';
import ISpecialtiesRepository from '@modules/specialties/repositories/ISpecialtiesRepository';
import AppError from '@shared/errors/AppError';
import IUpdateDoctorDTO from '../dtos/IUpdateDoctorDTO';
import Doctor from '../infra/typeorm/entities/Doctor';
import IDoctorsRepository from '../repositories/IDoctorsRepository';

@injectable()
class UpdateDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
    @inject('SpecialtiesRepository')
    private specialtiesRepository: ISpecialtiesRepository,
    @inject('RegisterCepService')
    private registerCepService: RegisterCepService,
  ) {}

  public async execute({
    id,
    cellPhone,
    cep,
    crm,
    name,
    specialties,
    landline,
  }: IUpdateDoctorDTO): Promise<Doctor> {
    const doctorFound = await this.doctorsRepository.findById(id);

    if (!doctorFound) throw new AppError('Doctor has not registered yet');

    if (crm) {
      const checkCrmExists = await this.doctorsRepository.findByCrm(crm);

      if (checkCrmExists) throw new AppError('Crm has already been registered');

      doctorFound.crm = crm;
    }

    if (specialties) {
      if (specialties.length < 2)
        throw new AppError('Doctors must have at least 2 specialties');

      const specialtiesFound = await this.specialtiesRepository.findSpecialties(
        specialties,
      );

      if (specialtiesFound.length !== specialties.length)
        throw new AppError('The doctor`s specialties are not in database');

      doctorFound.specialties = specialtiesFound;
    }

    if (cellPhone) {
      const checkCellPhoneRegistered =
        await this.doctorsRepository.findByCellPhone(cellPhone);

      if (checkCellPhoneRegistered)
        throw new AppError('Cell phone has already been registered');

      doctorFound.cellPhone = cellPhone;
    }

    if (cep) {
      const cepData = await this.registerCepService.execute(cep);

      doctorFound.cep = cepData;
    }

    if (landline) {
      doctorFound.landline = landline;
    }

    if (name) {
      doctorFound.name = name;
    }

    const updatedDoctor = await this.doctorsRepository.save(doctorFound);

    return updatedDoctor;
  }
}

export default UpdateDoctorService;
