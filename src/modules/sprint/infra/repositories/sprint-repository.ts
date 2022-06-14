import { query } from '@shared/infra/database/connection';

import { Sprint } from '@sprint/domain/entities/sprint';
import { CreateSprintDTO } from '@sprint/domain/repositories/dtos/create-sprint-dto';
import { ISprintRepository } from '@sprint/domain/repositories/sprint-repository';

export class SprintRepository implements ISprintRepository {
  async create({ name, description, startDate, endDate }: CreateSprintDTO.Params): Promise<Sprint> {
    const queryResponse = await query(`
      INSERT INTO sprints (name, description, startDate, endDate)
      VALUES('${name}', '${description}', '${startDate}', '${endDate}')
      RETURNING *;
    `);

    const createdSprint: Sprint = queryResponse.rows[0];

    return createdSprint;
  }

  async findAll(): Promise<Sprint[]> {
    const { rows: sprints } = await query('SELECT * FROM sprints;');
    return sprints;
  }
}
