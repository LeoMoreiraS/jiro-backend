import { Response, Request } from 'express';

import { UpdateTaskUseCase } from '@task/domain/useCases/update-task-use-case';
import { TaskRepository } from '@task/infra/repositories/story-repository';

export class UpdateTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, title, status, scope, description, priority, employee_cpf, story_id } =
      request.body;

    const taskRepository = new TaskRepository();
    const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);

    const result = await updateTaskUseCase.execute({
      id,
      title,
      status,
      scope,
      description,
      priority,
      employee_cpf,
      story_id,
    });

    return response.status(200).json(result);
  }
}
