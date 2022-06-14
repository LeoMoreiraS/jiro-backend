import { Story } from '@story/domain/entities/story';

export namespace UpdateStoryDTO {
  export type Params = {
    id: number;
    sprint_id?: number;
    title?: string;
    status?: string;
    bdd?: string;
    bussinessRules?: string[];
    acceptanceCriteria?: string;
  };

  export type Result = Story;
}
