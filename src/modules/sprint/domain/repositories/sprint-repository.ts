import { CreateSprintDTO } from './dtos/create-sprint-dto';

export interface ISprintRepository {
  create(params: CreateSprintDTO.Params): Promise<CreateSprintDTO.Result>;
}
