import { Sprint } from '../entities/sprint';
import { ISprintRepository } from '../repositories/sprint-repository';

export class ListSprintsUseCase {
  constructor(private readonly sprintRepository: ISprintRepository) {}

  async execute(): Promise<Sprint[]> {
    const sprints = await this.sprintRepository.findAll();
    return sprints;
  }
}
