import { Story } from '../../entities/story';

export namespace CreateStoryDTO {
  export type Params = {
    sprint_id: number;
    title: string;
    bdd: string;
    status: string;
    bussinessRules: string[];
    acceptanceCriteria: string;
  };

  export type Result = Story;
}
