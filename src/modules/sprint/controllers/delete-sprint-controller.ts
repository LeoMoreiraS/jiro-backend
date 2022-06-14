import { Response, Request } from 'express';

import { DeleteSprintUseCase } from '@sprint/domain/useCases/delete-sprint-use-case';
import { SprintRepository } from '@sprint/infra/repositories/sprint-repository';

export class DeleteSprintController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;

    const sprintRepository = new SprintRepository();
    const deleteSprintUseCase = new DeleteSprintUseCase(sprintRepository);

    const result = await deleteSprintUseCase.execute({ id });

    return response.status(200).json(result);
  }
}
