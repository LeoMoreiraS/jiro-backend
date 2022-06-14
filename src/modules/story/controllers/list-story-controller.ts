import { Response, Request } from 'express';

import { ListStoriesUseCase } from '@story/domain/useCases/list-story-use-case';
import { StoryRepository } from '@story/infra/repositories/story-repository';

export class ListStoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const storyRepository = new StoryRepository();
    const listStoryUseCase = new ListStoriesUseCase(storyRepository);

    const result = await listStoryUseCase.execute();

    return response.status(200).json(result);
  }
}
