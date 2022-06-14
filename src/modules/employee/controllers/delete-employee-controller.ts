import { Response, Request } from 'express';

import { DeleteEmployeeUseCase } from '@employee/domain/useCases/delete-employee-use-case';
import { EmployeeRepository } from '@employee/infra/repositories/employee-repository';

export class DeleteEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.headers;

    const employeeRepository = new EmployeeRepository();
    const deleteEmployeeUseCase = new DeleteEmployeeUseCase(employeeRepository);

    const result = await deleteEmployeeUseCase.execute({ cpf: cpf?.toString() || '' });

    return response.status(200).json(result);
  }
}
