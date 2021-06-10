import CreateDoctorService from '@modules/doctors/services/CreateDoctorService';
import FilterDoctorService from '@modules/doctors/services/FilterDoctorService';
import ListAllDoctorsService from '@modules/doctors/services/ListAllDoctorsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class DoctorsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, crm, landline, cellPhone, cep, specialties } = request.body;

    const createDoctorService = container.resolve(CreateDoctorService);

    const doctorCreated = await createDoctorService.execute({
      cellPhone,
      cep,
      crm,
      name,
      specialties,
      landline,
    });

    return response.status(201).json({ doctor: doctorCreated });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { param } = request.params;

    const filterDoctorService = container.resolve(FilterDoctorService);

    const filteredDoctor = await filterDoctorService.execute(param);

    return response.json({ doctor: filteredDoctor });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const listAllService = container.resolve(ListAllDoctorsService);

    const allDoctors = await listAllService.execute();

    return response.json({ doctors: allDoctors });
  }
}

export default DoctorsController;
