import { query } from '@shared/infra/database/connection';

import { Story } from '@story/domain/entities/story';
import { CreateStoryDTO } from '@story/domain/repositories/dtos/create-story-dto';
import { UpdateStoryDTO } from '@story/domain/repositories/dtos/update-story-dto';
import { IStoryRepository } from '@story/domain/repositories/story-repository';

export class StoryRepository implements IStoryRepository {
  async create({
    sprint_id,
    bdd,
    acceptanceCriteria,
    bussinessRules,
    status,
    title,
  }: CreateStoryDTO.Params): Promise<CreateStoryDTO.Result> {
    const queryResponse = await query(`
      INSERT INTO stories (sprint_id, acceptanceCriteria, status, title, bdd)
      VALUES(${sprint_id},'${acceptanceCriteria}', '${status}', '${title}', '${bdd}')
      RETURNING *;
    `);
    const storyId = queryResponse.rows[0].id;
    bussinessRules.forEach(async (rule) => {
      query(`
        INSERT INTO bussiness_rules (story_id, rule)
        VALUES(${storyId},'${rule}')
     `);
    });

    const createdSprint: Story = queryResponse.rows[0];

    return createdSprint;
  }

  async update({
    id,
    bussinessRules,
    status,
    title,
    acceptanceCriteria,
    bdd,
    sprint_id,
  }: UpdateStoryDTO.Params): Promise<Story> {
    const paramsToUpdateWithLastComma = `
        ${status ? `status = '${status}',` : ''}
        ${acceptanceCriteria ? `acceptanceCriteria = '${acceptanceCriteria}',` : ''}
        ${sprint_id ? `sprint_id = '${sprint_id}',` : ''}
        ${title ? `title = '${title}',` : ''}
        ${bdd ? `bdd = '${bdd}',` : ''}
      `;

    // Todos os ternários acima possuem uma vírgula no final, o que causaria um erro na execução da query
    // A função abaixo utiliza um regex para remover a última vírgula da string de parâmetros e tudo que está depois dela
    const paramsToUpdateWithoutLastComma = paramsToUpdateWithLastComma.replace(/,([^,]*)$/, '');
    const rules = new Set(bussinessRules) ?? [];

    if (rules.size > 0) {
      await query(`
      DELETE FROM bussiness_rules
      WHERE story_id = ${id}
      RETURNING *;
    `);

      rules.forEach(async (rule) => {
        query(`
        INSERT INTO bussiness_rules (story_id, rule)
        VALUES(${id},'${rule}')
     `);
      });
    }
    const queryResponse = await query(`
        UPDATE stories SET ${paramsToUpdateWithoutLastComma}
        WHERE id = '${id}'
        RETURNING *;
      `);

    const updatedStory: Story = queryResponse.rows[0];
    updatedStory.bussinessRules = [...rules];
    return updatedStory;
  }
  async delete(id: number): Promise<Story | null> {
    const queryResponse = await query(`
      DELETE FROM stories
      WHERE id = '${id}'
      RETURNING *;
    `);
    const story: Story = queryResponse.rows[0];
    return story;
  }
  async findAll(): Promise<Story[]> {
    const response = await query(`
    SELECT *
    FROM stories JOIN (
        SELECT story_id as sid ,array_agg(br.rule) AS bussinessRules 
        FROM bussiness_rules br JOIN stories s ON s.id = br.story_id 
        GROUP BY br.story_id) j ON sid = id;
  `);

    const stories: Story[] = response.rows;
    return stories;
  }

  async findById(id: number): Promise<Story | null> {
    const response = await query(`
    SELECT * FROM stories WHERE id = ${id};
  `);
    const story: Story = response.rows[0];
    return story;
  }
}
