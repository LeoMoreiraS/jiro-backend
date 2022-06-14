import { Story } from '../entities/story';
import { CreateStoryDTO } from './dtos/create-story-dto';
import { UpdateStoryDTO } from './dtos/update-story-dto';

export interface IStoryRepository {
  create(params: CreateStoryDTO.Params): Promise<CreateStoryDTO.Result>;
  update(params: UpdateStoryDTO.Params): Promise<UpdateStoryDTO.Result>;
  delete(id: number): Promise<Story | null>;
  findAll(): Promise<Story[]>;
  findById(id: number): Promise<Story | null>;
}
