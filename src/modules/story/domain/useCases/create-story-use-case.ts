import { AppError } from '@shared/errors/app-error';

import { ISprintRepository } from '@sprint/domain/repositories/sprint-repository';

import { Story } from '../entities/story';
import { IStoryRepository } from '../repositories/story-repository';

export namespace CreateStoryUseCaseDTO {
  export type Params = {
    sprint_id: number;
    title: string;
    status: string;
    bussinessRules: string[];
    acceptanceCriteria: string;
    bdd: string;
  };

  export type Result = Story;
}

export class CreateStoryUseCase {
  constructor(
    private readonly storyRepository: IStoryRepository,
    private readonly sprintRepository: ISprintRepository
  ) {}

  async execute({
    sprint_id,
    title,
    status,
    bussinessRules,
    acceptanceCriteria,
    bdd,
  }: CreateStoryUseCaseDTO.Params): Promise<CreateStoryUseCaseDTO.Result> {
    if (!sprint_id || !title || !status || !bussinessRules || !acceptanceCriteria || !bdd) {
      throw new AppError('Faltam parâmetros');
    }

    const sprintFound = this.sprintRepository.findById(sprint_id);

    if (!sprintFound) {
      throw new AppError('Sprint não encontrada');
    }

    const createdSprint = await this.storyRepository.create({
      sprint_id,
      title,
      status,
      bussinessRules,
      acceptanceCriteria,
      bdd,
    });

    return createdSprint;
  }
}
