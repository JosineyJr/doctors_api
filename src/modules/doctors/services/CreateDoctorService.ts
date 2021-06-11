import RegisterCepService from '@modules/cep/services/RegisterCepService';
import ISpecialtiesRepository from '@modules/specialties/repositories/ISpecialtiesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateDoctorDTO from '../dtos/ICreateDoctorDTO';
import Doctor from '../infra/typeorm/entities/Doctor';
import IDoctorsRepository from '../repositories/IDoctorsRepository';

@injectable()
class CreateDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
    @inject('SpecialtiesRepository')
    private specialtiesRepository: ISpecialtiesRepository,
    @inject('RegisterCepService')
    private registerCepService: RegisterCepService,
  ) {}

  public async execute({
    cellPhone,
    cep,
    crm,
    name,
    specialties,
    landline,
  }: ICreateDoctorDTO): Promise<Doctor> {
    if (specialties.length < 2)
      throw new AppError('Doctors must have at least 2 specialties');

    const checkDoctorExists = await this.doctorsRepository.findByCrm(crm);

    if (checkDoctorExists)
      throw new AppError('Crm has already been registered');

    const checkCellPhoneRegistered =
      await this.doctorsRepository.findByCellPhone(cellPhone);

    if (checkCellPhoneRegistered)
      throw new AppError('Cell phone has already been registered');

    if (Number(cellPhone.charAt(2)) < 6)
      throw new AppError('Invalid cell phone format');

    const cepData = await this.registerCepService.execute(cep);

    const specialtiesFound = await this.specialtiesRepository.findSpecialties(
      specialties,
    );

    if (specialtiesFound.length !== specialties.length)
      throw new AppError('The doctor`s specialties are not in database');

    const createdDoctor = await this.doctorsRepository.create({
      cellPhone,
      cep: cepData,
      crm,
      name,
      specialties: specialtiesFound,
      landline,
    });

    return createdDoctor;
  }
}

export default CreateDoctorService;
