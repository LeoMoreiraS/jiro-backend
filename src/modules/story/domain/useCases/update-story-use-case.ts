import { AppError } from '@shared/errors/app-error';

import { Story } from '../entities/story';
import { IStoryRepository } from '../repositories/story-repository';

export namespace UpdateStoryUseCaseDTO {
  export type Params = {
    id: number;
    sprint_id?: number;
    title?: string;
    status?: string;
    bdd?: string;
    bussinessRules?: string[];
    acceptanceCriteria?: string;
  };

  export type Result = Story;
}

export class UpdateStoryUseCase {
  constructor(private readonly storyRepository: IStoryRepository) {}

  async execute({
    id,
    sprint_id,
    title,
    status,
    bdd,
    bussinessRules,
    acceptanceCriteria,
  }: UpdateStoryUseCaseDTO.Params): Promise<UpdateStoryUseCaseDTO.Result> {
    const storyExists = await this.storyRepository.findById(id);

    if (!storyExists) {
      throw new AppError(`História de id ${id} não encontrada`);
    }

    if (!sprint_id && !title && !status && !bussinessRules && !acceptanceCriteria && !bdd) {
      throw new AppError('Não foram enviados parâmetros para atualização');
    }

    const updatedStory = await this.storyRepository.update({
      id,
      sprint_id,
      title,
      status,
      bdd,
      bussinessRules,
      acceptanceCriteria,
    });

    return updatedStory;
  }
}
