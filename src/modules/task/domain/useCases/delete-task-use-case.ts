import { AppError } from '@shared/errors/app-error';

import { Task } from '../entities/task';
import { ITaskRepository } from '../repositories/task-repository';

export namespace DeleteTaskUseCaseDTO {
  export type Params = {
    id: number;
  };

  export type Result = Task;
}

export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}
  async execute({ id }: DeleteTaskUseCaseDTO.Params): Promise<DeleteTaskUseCaseDTO.Result> {
    if (!id) {
      throw new AppError('Faltam parâmetros');
    }

    const deletedTask = await this.taskRepository.delete(id);

    if (!deletedTask) {
      throw new AppError(`Falha ao deletar task de id '${id}'`);
    }

    return deletedTask;
  }
}
