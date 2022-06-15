import { Task } from '@task/domain/entities/task';

export namespace UpdateTaskDTO {
  export type Params = {
    id: number;
    title?: string;
    status?: string;
    scope?: string;
    description?: string;
    priority?: number;
    employee_cpf?: string;
    story_id?: number;
  };

  export type Result = Task;
}
