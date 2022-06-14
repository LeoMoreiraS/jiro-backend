import { Sprint } from '../entities/sprint';
import { CreateSprintDTO } from './dtos/create-sprint-dto';
import { UpdateSprintDTO } from './dtos/update-sprint-dto';

export interface ISprintRepository {
  create(params: CreateSprintDTO.Params): Promise<CreateSprintDTO.Result>;
  update(params: UpdateSprintDTO.Params): Promise<UpdateSprintDTO.Result>;
  findAll(): Promise<Sprint[]>;
  findById(id: number): Promise<Sprint | null>;
}
