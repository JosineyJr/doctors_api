import { Request, Response } from 'express';
import ListAllCepsService from '@modules/cep/services/ListAllCepsService';
import { container } from 'tsyringe';
import RegisterCepService from '@modules/cep/services/RegisterCepService';

class CepsController {
  public async register(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { cep } = request.body;

    const registerCepService = container.resolve(RegisterCepService);

    const registeredCep = await registerCepService.execute(cep);

    return response.status(201).json({ cep: registeredCep });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const listAllCepsService = container.resolve(ListAllCepsService);

    const allCeps = await listAllCepsService.execute();

    return response.json({ ceps: allCeps });
  }
}

export default CepsController;
