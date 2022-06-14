import { Sprint } from '@sprint/domain/entities/sprint';

export namespace UpdateSprintDTO {
  export type Params = {
    id: number;
    name?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
  };

  export type Result = Sprint;
}
