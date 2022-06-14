import { Response, Request } from 'express';

import { ListEmployeesUseCase } from '@employee/domain/useCases/list-employees-use-case';
import { EmployeeRepository } from '@employee/infra/repositories/employee-repository';

export class ListEmployeesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const employeeRepository = new EmployeeRepository();
    const listEmployeesUseCase = new ListEmployeesUseCase(employeeRepository);

    const result = await listEmployeesUseCase.execute();

    return response.status(200).json(result);
  }
}
