import { AppError } from '@shared/errors/app-error';

import { Sprint } from '../entities/sprint';
import { ISprintRepository } from '../repositories/sprint-repository';

export namespace CreateSprintUseCaseDTO {
  export type Params = {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  };

  export type Result = Sprint;
}

export class CreateSprintUseCase {
  constructor(private readonly sprintRepository: ISprintRepository) {}

  async execute({
    name,
    description,
    startDate,
    endDate,
  }: CreateSprintUseCaseDTO.Params): Promise<CreateSprintUseCaseDTO.Result> {
    if (!name || !description || !startDate || !endDate) {
      throw new AppError('Faltam parâmetros');
    }

    // TODO validação de data

    const createdSprint = await this.sprintRepository.create({
      name,
      description,
      startDate,
      endDate,
    });

    return createdSprint;
  }
}
