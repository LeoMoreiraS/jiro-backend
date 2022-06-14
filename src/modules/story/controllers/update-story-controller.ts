import { Response, Request } from 'express';

import { UpdateStoryUseCase } from '@story/domain/useCases/update-story-use-case';
import { StoryRepository } from '@story/infra/repositories/story-repository';

export class UpdateStoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, sprint_id, title, status, bussinessRules, acceptanceCriteria } = request.body;

    const storyRepository = new StoryRepository();
    const updateSprintUseCase = new UpdateStoryUseCase(storyRepository);

    const result = await updateSprintUseCase.execute({
      id,
      sprint_id,
      title,
      status,
      bussinessRules,
      acceptanceCriteria,
    });

    return response.status(200).json(result);
  }
}
