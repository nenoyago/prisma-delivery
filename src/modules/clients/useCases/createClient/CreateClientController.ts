import { Request, Response } from 'express';

import { CreateClientUseCase } from './CreateClientUseCase';
import { HttpStatus } from '@shared/enums/HttpStatus';

export class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const createClientUseCase = new CreateClientUseCase();
    const result = await createClientUseCase.execute({ username, password });

    return response.status(HttpStatus.CREATED).json(result);
  }
}
