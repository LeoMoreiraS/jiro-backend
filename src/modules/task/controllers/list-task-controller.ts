import { Response, Request } from 'express';

import { ListTaskUseCase } from '@task/domain/useCases/list-task-use-case';
import { TaskRepository } from '@task/infra/repositories/story-repository';

export class ListTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const taskRepository = new TaskRepository();
    const listTaskUseCase = new ListTaskUseCase(taskRepository);

    const result = await listTaskUseCase.execute();

    return response.status(200).json(result);
  }
}
