import CreateDoctorService from '@modules/doctors/services/CreateDoctorService';
import FilterDoctorService from '@modules/doctors/services/FilterDoctorService';
import ListAllDoctorsService from '@modules/doctors/services/ListAllDoctorsService';
import UpdateDoctorService from '@modules/doctors/services/UpdateDoctorService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class DoctorsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, crm, landline, cellPhone, cep, specialties } = request.body;

    const createDoctorService = container.resolve(CreateDoctorService);

    const createdDoctor = await createDoctorService.execute({
      cellPhone,
      cep,
      crm,
      name,
      specialties,
      landline,
    });

    return response.status(201).json({ doctor: createdDoctor });
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

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, crm, landline, cellPhone, cep, specialties } = request.body;

    const { id } = request.params;

    const updatedDoctorService = container.resolve(UpdateDoctorService);

    const doctorUpdated = await updatedDoctorService.execute({
      id,
      cellPhone,
      cep,
      crm,
      landline,
      name,
      specialties,
    });

    return response.json({ doctor: doctorUpdated });
  }
}

export default DoctorsController;
