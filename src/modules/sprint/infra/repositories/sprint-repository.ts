import { query } from '@shared/infra/database/connection';

import { Sprint } from '@sprint/domain/entities/sprint';
import { CreateSprintDTO } from '@sprint/domain/repositories/dtos/create-sprint-dto';
import { UpdateSprintDTO } from '@sprint/domain/repositories/dtos/update-sprint-dto';
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

  async update({
    id,
    name,
    description,
    startDate,
    endDate,
  }: UpdateSprintDTO.Params): Promise<Sprint> {
    const paramsToUpdateWithLastComma = `
      ${name ? `name = '${name}',` : ''}
      ${description ? `description = '${description}',` : ''}
      ${startDate ? `startDate = '${startDate}',` : ''}
      ${endDate ? `endDate = '${endDate}',` : ''}
    `;

    // Todos os ternários acima possuem uma vírgula no final, o que causaria um erro na execução da query
    // A função abaixo utiliza um regex para remover a última vírgula da string de parâmetros e tudo que está depois dela
    const paramsToUpdateWithoutLastComma = paramsToUpdateWithLastComma.replace(/,([^,]*)$/, '');

    const queryResponse = await query(`
      UPDATE sprints SET ${paramsToUpdateWithoutLastComma}
      WHERE id = '${id}'
      RETURNING id, name, description, startDate, endDate;
    `);

    const updatedSprint: Sprint = queryResponse.rows[0];
    return updatedSprint;
  }

  async findAll(): Promise<Sprint[]> {
    const { rows: sprints } = await query('SELECT * FROM sprints;');
    return sprints;
  }

  async findById(id: number): Promise<Sprint | null> {
    const { rows: queryResponse } = await query(
      `SELECT * FROM sprints WHERE id = '${id}' LIMIT 1;`
    );

    const findSprint = queryResponse.length > 0 ? queryResponse[0] : null;
    return findSprint;
  }
}
