import { Sprint } from '@sprint/domain/entities/sprint';

export namespace CreateSprintDTO {
  export type Params = {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  };

  export type Result = Sprint;
}
