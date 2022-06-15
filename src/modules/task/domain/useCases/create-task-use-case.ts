import { AppError } from '@shared/errors/app-error';

import { IEmployeeRepository } from '@employee/domain/repositories/employee-repository';

import { IStoryRepository } from '@story/domain/repositories/story-repository';

import { Task } from '../entities/task';
import { ITaskRepository } from '../repositories/task-repository';

export namespace CreateTaskUseCaseDTO {
  export type Params = {
    title: string;
    status: string;
    scope: string;
    description: string;
    priority: number;
    employee_cpf: string;
    story_id: number;
  };

  export type Result = Task;
}

export class CreateTaskUseCase {
  constructor(
    private readonly storyRepository: IStoryRepository,
    private readonly taskRepository: ITaskRepository,
    private readonly employeeRepository: IEmployeeRepository
  ) {}

  async execute({
    title,
    status,
    description,
    scope,
    priority,
    employee_cpf,
    story_id,
  }: CreateTaskUseCaseDTO.Params): Promise<CreateTaskUseCaseDTO.Result> {
    if (!scope || !title || !status || !priority || !employee_cpf || !story_id || !description) {
      throw new AppError('Faltam parâmetros!');
    }

    const employeeFound = this.employeeRepository.findByCpf(employee_cpf);

    if (!employeeFound) {
      throw new AppError('Funcionário não encontrado!');
    }

    const storyFound = this.storyRepository.findById(story_id);

    if (!storyFound) {
      throw new AppError('História não encontrada!');
    }

    const createdSprint = await this.taskRepository.create({
      title,
      status,
      description,
      scope,
      priority,
      employee_cpf,
      story_id,
    });

    return createdSprint;
  }
}
