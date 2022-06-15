export interface Story {
  id: string;
  sprint_id: string;
  title: string;
  status: string;
  bdd: string;
  bussinessRules: string[];
  acceptanceCriteria: string;
}
