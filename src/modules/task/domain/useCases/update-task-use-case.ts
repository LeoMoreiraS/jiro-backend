import { AppError } from '@shared/errors/app-error';

import { Task } from '../entities/task';
import { ITaskRepository } from '../repositories/task-repository';

export namespace UpdateTaskUseCaseDTO {
  export type Params = {
    id: number;
    title?: string;
    status?: string;
    scope?: string;
    description?: string;
    priority?: number;
    employee_cpf?: string;
    story_id?: number;
  };

  export type Result = Task;
}

export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute({
    id,
    title,
    status,
    scope,
    description,
    priority,
    employee_cpf,
    story_id,
  }: UpdateTaskUseCaseDTO.Params): Promise<UpdateTaskUseCaseDTO.Result> {
    const storyExists = await this.taskRepository.findById(id);

    if (!storyExists) {
      throw new AppError(`História de id ${id} não encontrada`);
    }

    if (!scope && !title && !status && !description && !priority && !employee_cpf && !story_id) {
      throw new AppError('Não foram enviados parâmetros para atualização');
    }

    const updatedStory = await this.taskRepository.update({
      id,
      title,
      status,
      scope,
      description,
      priority,
      employee_cpf,
      story_id,
    });

    return updatedStory;
  }
}
