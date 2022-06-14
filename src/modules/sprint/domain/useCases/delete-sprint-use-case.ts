import { AppError } from '@shared/errors/app-error';

import { Sprint } from '../entities/sprint';
import { ISprintRepository } from '../repositories/sprint-repository';

export namespace DeleteSprintUseCaseDTO {
  export type Params = {
    id: number;
  };

  export type Result = Sprint;
}

export class DeleteSprintUseCase {
  constructor(private readonly sprintRepository: ISprintRepository) {}

  async execute({ id }: DeleteSprintUseCaseDTO.Params): Promise<DeleteSprintUseCaseDTO.Result> {
    if (!id) {
      throw new AppError('Faltam parâmetros');
    }

    const deletedSprint = await this.sprintRepository.delete(id);

    if (!deletedSprint) {
      throw new AppError(`Falha ao deletar funcionário de id '${id}'`);
    }

    return deletedSprint;
  }
}
