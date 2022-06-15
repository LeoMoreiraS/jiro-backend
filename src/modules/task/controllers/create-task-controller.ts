import { Response, Request } from 'express';

import { EmployeeRepository } from '@employee/infra/repositories/employee-repository';

import { StoryRepository } from '@story/infra/repositories/story-repository';

import { CreateTaskUseCase } from '@task/domain/useCases/create-task-use-case';
import { TaskRepository } from '@task/infra/repositories/story-repository';

export class CreateTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, status, scope, priority, description, employee_cpf, story_id } = request.body;

    const taskRepository = new TaskRepository();
    const employeeRepository = new EmployeeRepository();
    const storyRepository = new StoryRepository();

    const createTaskUseCase = new CreateTaskUseCase(
      storyRepository,
      taskRepository,
      employeeRepository
    );

    const result = await createTaskUseCase.execute({
      title,
      status,
      scope,
      priority,
      description,
      employee_cpf,
      story_id,
    });

    return response.status(201).json(result);
  }
}
