import { Response, Request } from 'express';

import { UpdateSprintUseCase } from '@sprint/domain/useCases/update-sprint-use-case';
import { SprintRepository } from '@sprint/infra/repositories/sprint-repository';

export class UpdateSprintController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, name, description, startDate, endDate } = request.body;

    const sprintRepository = new SprintRepository();
    const updateSprintUseCase = new UpdateSprintUseCase(sprintRepository);

    const result = await updateSprintUseCase.execute({
      id,
      name,
      description,
      startDate,
      endDate,
    });

    return response.status(200).json(result);
  }
}
