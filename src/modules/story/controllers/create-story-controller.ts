import { Response, Request } from 'express';

import { SprintRepository } from '@sprint/infra/repositories/sprint-repository';

import { CreateStoryUseCase } from '@story/domain/useCases/create-story-use-case';
import { StoryRepository } from '@story/infra/repositories/story-repository';

export class CreateStoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { sprint_id, title, status, bussinessRules, acceptanceCriteria, bdd } = request.body;

    const sprintRepository = new SprintRepository();
    const storyRepository = new StoryRepository();

    const createStoryUseCase = new CreateStoryUseCase(storyRepository, sprintRepository);

    const result = await createStoryUseCase.execute({
      sprint_id,
      title,
      bdd,
      status,
      bussinessRules,
      acceptanceCriteria,
    });

    return response.status(201).json(result);
  }
}
