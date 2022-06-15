import { Story } from '../entities/story';
import { IStoryRepository } from '../repositories/story-repository';

export class ListStoriesUseCase {
  constructor(private readonly storyRepository: IStoryRepository) {}

  async execute(): Promise<Story[]> {
    const stories = await this.storyRepository.findAll();
    return stories;
  }
}
