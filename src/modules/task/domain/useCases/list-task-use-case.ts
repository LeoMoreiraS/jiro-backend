import { Task } from '../entities/task';
import { ITaskRepository } from '../repositories/task-repository';

export class ListTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(): Promise<Task[]> {
    const tasks = await this.taskRepository.findAll();
    return tasks;
  }
}
