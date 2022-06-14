import { Response, Request } from 'express';

import { ListSprintsUseCase } from '@sprint/domain/useCases/list-sprints-use-case';
import { SprintRepository } from '@sprint/infra/repositories/sprint-repository';

export class ListSprintsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const sprintRepository = new SprintRepository();
    const listSprintUseCase = new ListSprintsUseCase(sprintRepository);

    const result = await listSprintUseCase.execute();

    return response.status(200).json(result);
  }
}
