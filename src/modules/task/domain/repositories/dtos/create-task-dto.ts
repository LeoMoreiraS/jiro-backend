import { Task } from '../../entities/task';

export namespace CreateTaskDTO {
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
