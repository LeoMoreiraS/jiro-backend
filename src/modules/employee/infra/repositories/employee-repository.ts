import { query } from '@shared/infra/database/connection';

import { Employee } from '@employee/domain/entities/employee';
import { CreateEmployeeDTO } from '@employee/domain/repositories/dtos/create-employee-dto';
import { DeleteEmployeeDTO } from '@employee/domain/repositories/dtos/delete-employee-dto';
import { UpdateEmployeeDTO } from '@employee/domain/repositories/dtos/update-employee-dto';
import { IEmployeeRepository } from '@employee/domain/repositories/employee-repository';

export class EmployeeRepository implements IEmployeeRepository {
  async create({
    cpf,
    name,
    password,
    dtNasc,
    admin,
    role,
  }: CreateEmployeeDTO.Params): Promise<Employee> {
    const employeeResponse = await query(`
      INSERT INTO employees (cpf, name, password, dtNasc, admin, role)
      VALUES('${cpf}', '${name}', '${password}', '${dtNasc}', '${admin}', '${role}')
      RETURNING cpf, name, dtNasc, admin, role;
    `);

    const createdEmployee: Employee = employeeResponse.rows[0];

    return createdEmployee;
  }

  async update({
    currentCpf,
    cpf,
    name,
    password,
    dtNasc,
    role,
  }: UpdateEmployeeDTO.Params): Promise<Employee> {
    const paramsToUpdateWithLastComma = `
      ${cpf ? `cpf = '${cpf}',` : ''}
      ${name ? `name = '${name}',` : ''}
      ${password ? `password = '${password}',` : ''}
      ${dtNasc ? `dtNasc = '${dtNasc}',` : ''}
      ${role ? `role = '${role}',` : ''}
    `;

    // Todos os ternários acima possuem uma vírgula no final, o que causaria um erro na execução da query
    // A função abaixo utiliza um regex para remover a última vírgula da string de parâmetros e tudo que está depois dela
    const paramsToUpdateWithoutLastComma = paramsToUpdateWithLastComma.replace(/,([^,]*)$/, '');

    const employeeResponse = await query(`
      UPDATE employees SET ${paramsToUpdateWithoutLastComma}
      WHERE cpf = '${currentCpf}'
      RETURNING cpf, name, dtNasc, admin, role;
    `);

    const updatedEmployee: Employee = employeeResponse.rows[0];
    return updatedEmployee;
  }

  async findByCpf(cpf: string): Promise<Employee | null> {
    const { rows: queryResponse } = await query(
      `SELECT * FROM employees WHERE cpf = '${cpf}' LIMIT 1;`
    );

    const findEmployee = queryResponse.length > 0 ? queryResponse[0] : null;
    return findEmployee;
  }

  async delete({ cpf }: DeleteEmployeeDTO.Params): Promise<Employee> {
    const employeeResponse = await query(`
      DELETE FROM employees
      WHERE cpf = '${cpf}'
      RETURNING cpf, name, dtNasc, admin, role;
    `);

    const deletedEmployee: Employee = employeeResponse.rows[0];
    return deletedEmployee;
  }
}
