import { AppError } from '@shared/errors/app-error';

import { Sprint } from '../entities/sprint';
import { ISprintRepository } from '../repositories/sprint-repository';

export namespace UpdateSprintUseCaseDTO {
  export type Params = {
    id: number;
    name?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
  };

  export type Result = Sprint;
}

export class UpdateSprintUseCase {
  constructor(private readonly sprintRepository: ISprintRepository) {}

  async execute({
    id,
    name,
    description,
    startDate,
    endDate,
  }: UpdateSprintUseCaseDTO.Params): Promise<UpdateSprintUseCaseDTO.Result> {
    const sprintExists = await this.sprintRepository.findById(id);

    if (!sprintExists) {
      throw new AppError(`Sprint de id ${id} não encontrada`);
    }

    if (!name && !description && !startDate && !endDate) {
      throw new AppError('Não foram enviados parâmetros para atualização');
    }

    const updatedSprint = await this.sprintRepository.update({
      id,
      name,
      description,
      startDate,
      endDate,
    });

    return updatedSprint;
  }
}
