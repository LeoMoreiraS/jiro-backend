import { query } from '@shared/infra/database/connection';

import { Task } from '@task/domain/entities/task';
import { CreateTaskDTO } from '@task/domain/repositories/dtos/create-task-dto';
import { UpdateTaskDTO } from '@task/domain/repositories/dtos/update-task-dto';
import { ITaskRepository } from '@task/domain/repositories/task-repository';

export class TaskRepository implements ITaskRepository {
  async create({
    employee_cpf,
    priority,
    scope,
    status,
    story_id,
    description,
    title,
  }: CreateTaskDTO.Params): Promise<Task> {
    const queryResponse = await query(`
        INSERT INTO tasks (title, status, scope, employee_cpf, story_id, priority, description)
        VALUES('${title}','${status}', '${scope}', '${employee_cpf}', ${story_id}, ${priority}, '${description}')
        RETURNING *;
      `);

    const createdTask: Task = queryResponse.rows[0];

    return createdTask;
  }
  async update({
    id,
    priority,
    scope,
    status,
    story_id,
    title,
    description,
    employee_cpf,
  }: UpdateTaskDTO.Params): Promise<Task> {
    const paramsToUpdateWithLastComma = `
    ${title ? `title = '${title}',` : ''}
    ${description ? `description = '${description}',` : ''}
    ${employee_cpf ? `employee_cpf = '${employee_cpf}',` : ''}
    ${scope ? `scope = '${scope}',` : ''}
    ${status ? `status = '${status}',` : ''}
    ${story_id ? `story_id = ${story_id},` : ''}
    ${priority ? `priority = ${priority},` : ''}
  `;

    // Todos os ternários acima possuem uma vírgula no final, o que causaria um erro na execução da query
    // A função abaixo utiliza um regex para remover a última vírgula da string de parâmetros e tudo que está depois dela
    const paramsToUpdateWithoutLastComma = paramsToUpdateWithLastComma.replace(/,([^,]*)$/, '');

    const queryResponse = await query(`
    UPDATE tasks SET ${paramsToUpdateWithoutLastComma}
    WHERE id = '${id}'
    RETURNING *;
  `);

    const updatedTask: Task = queryResponse.rows[0];
    return updatedTask;
  }
  async delete(id: number): Promise<Task | null> {
    const response = await query(`DELETE FROM tasks WHERE id = ${id} RETURNING *;`);
    return response.rows[0];
  }
  async findAll(): Promise<Task[]> {
    const response = await query('SELECT * FROM tasks;');
    return response.rows;
  }
  async findById(id: number): Promise<Task | null> {
    const response = await query(`
      SELECT * FROM tasks WHERE id = ${id};
    `);
    const task: Task = response.rows[0];
    return task;
  }
}
