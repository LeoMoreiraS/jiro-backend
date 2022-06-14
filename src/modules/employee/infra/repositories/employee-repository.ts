import { query } from '@shared/infra/database/connection';

import { Employee } from '@employee/domain/entities/employee';
import { CreateEmployeeDTO } from '@employee/domain/repositories/dtos/create-employee-dto';
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

  async findByCpf(cpf: string): Promise<Employee | null> {
    const { rows: queryResponse } = await query(
      `SELECT * FROM employees WHERE cpf = '${cpf}' LIMIT 1;`
    );

    const findEmployee = queryResponse.length > 0 ? queryResponse[0] : null;
    return findEmployee;
  }

  // async update({
  //   currentEmail,
  //   email,
  //   name,
  //   bio,
  //   nickname,
  //   password,
  //   githubAccount,
  // }: UpdateEmployeeDTO.Params): Promise<Employee> {
  //   const paramsToUpdateWithLastComma = `
  //     ${email ? `email = '${email}',` : ''}
  //     ${name ? `name = '${name}',` : ''}
  //     ${bio ? `bio = '${bio}',` : ''}
  //     ${nickname ? `nickname = '${nickname}',` : ''}
  //     ${password ? `password = '${password}',` : ''}
  //     ${githubAccount ? `githubAccount = '${githubAccount}',` : ''}
  //   `;

  //   // Todos os ternários acima possuem uma vírgula no final, o que causaria um erro na execução da query
  //   // A função abaixo utiliza um regex para remover tudo após a última vírgula da string de parâmetros
  //   const paramsToUpdateWithoutLastComma = paramsToUpdateWithLastComma.replace(/,([^,]*)$/, '');

  //   const employeeResponse = await query(`
  //     UPDATE employees SET ${paramsToUpdateWithoutLastComma}
  //     WHERE email = '${currentEmail}'
  //     RETURNING email, name, bio, nickname, githubAccount;
  //   `);

  //   const updatedEmployee: Employee = employeeResponse.rows[0];

  //   return updatedEmployee;
  // }

  // async delete({ email }: DeleteEmployeeDTO.Params): Promise<Employee> {
  //   const employeeResponse = await query(`
  //     DELETE FROM employees
  //     WHERE email = '${email}'
  //     RETURNING email, name, bio, nickname, githubAccount;
  //   `);

  //   const deletedEmployee: Employee = employeeResponse.rows[0];

  //   return deletedEmployee;
  // }
}
