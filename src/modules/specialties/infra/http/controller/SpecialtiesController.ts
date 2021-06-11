import { Request, Response } from 'express';
import CreateSpecialtyService from '@modules/specialties/services/CreateSpecialtyService';
import { container } from 'tsyringe';
import ListAllSpecialtiesService from '@modules/specialties/services/ListAllSpecialtiesService';

class SpecialtiesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createSpecialtyService = container.resolve(CreateSpecialtyService);

    const createdSpecialty = await createSpecialtyService.execute(name);

    return response.status(201).json({ specialty: createdSpecialty });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const listAllSpecialtiesService = container.resolve(
      ListAllSpecialtiesService,
    );

    const allSpecialties = await listAllSpecialtiesService.execute();

    return response.json({ specialties: allSpecialties });
  }
}

export default SpecialtiesController;
