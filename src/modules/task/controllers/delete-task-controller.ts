import { Response, Request } from 'express';

import { DeleteTaskUseCase } from '@task/domain/useCases/delete-task-use-case';
import { TaskRepository } from '@task/infra/repositories/story-repository';

export class DeleteTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;

    const taskRepository = new TaskRepository();
    const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

    const result = await deleteTaskUseCase.execute({ id: Number(id) });

    return response.status(200).json(result);
  }
}
