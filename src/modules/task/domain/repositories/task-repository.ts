import { Task } from '../entities/task';
import { CreateTaskDTO } from './dtos/create-task-dto';
import { UpdateTaskDTO } from './dtos/update-task-dto';

export interface ITaskRepository {
  create(params: CreateTaskDTO.Params): Promise<CreateTaskDTO.Result>;
  update(params: UpdateTaskDTO.Params): Promise<UpdateTaskDTO.Result>;
  delete(id: number): Promise<Task | null>;
  findAll(): Promise<Task[]>;
  findById(id: number): Promise<Task | null>;
}
