import { AppError } from '@shared/errors/app-error';

import { Story } from '../entities/story';
import { IStoryRepository } from '../repositories/story-repository';

export namespace DeleteStoryUseCaseDTO {
  export type Params = {
    id: number;
  };

  export type Result = Story;
}

export class DeleteStoryUseCase {
  constructor(private readonly storyRepository: IStoryRepository) {}
  async execute({ id }: DeleteStoryUseCaseDTO.Params): Promise<DeleteStoryUseCaseDTO.Result> {
    if (!id) {
      throw new AppError('Faltam parâmetros');
    }

    console.log('oi');
    const deletedStory = await this.storyRepository.delete(id);

    if (!deletedStory) {
      throw new AppError(`Falha ao deletar história de id '${id}'`);
    }

    return deletedStory;
  }
}
