import { Response, Request } from 'express';

import { CreateSprintUseCase } from '@sprint/domain/useCases/create-sprint-use-case';
import { SprintRepository } from '@sprint/infra/repositories/sprint-repository';

export class CreateSprintController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, startDate, endDate } = request.body;

    const sprintRepository = new SprintRepository();
    const createSprintUseCase = new CreateSprintUseCase(sprintRepository);

    const result = await createSprintUseCase.execute({
      name,
      description,
      startDate,
      endDate,
    });

    return response.status(201).json(result);
  }
}
