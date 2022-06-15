import { Response, Request } from 'express';

import { DeleteStoryUseCase } from '@story/domain/useCases/delete-story-use-case';
import { StoryRepository } from '@story/infra/repositories/story-repository';

export class DeleteStoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;

    const storyRepository = new StoryRepository();
    const deleteStoryUseCase = new DeleteStoryUseCase(storyRepository);

    const result = await deleteStoryUseCase.execute({ id: Number(id) });

    return response.status(200).json(result);
  }
}
