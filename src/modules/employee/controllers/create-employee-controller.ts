import { Response, Request } from 'express';

import { CreateEmployeeUseCase } from '@employee/domain/useCases/create-employee-use-case';
import { BcryptEncrypterAdapter } from '@employee/infra/adapters/bcrypt-encrypter-adapter';
import { EmployeeRepository } from '@employee/infra/repositories/employee-repository';

export class CreateEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf, name, password, dtNasc, admin, role } = request.body;

    const employeeRepository = new EmployeeRepository();
    const bcryptEncrypterAdapter = new BcryptEncrypterAdapter();
    const createEmployeeUseCase = new CreateEmployeeUseCase(
      employeeRepository,
      bcryptEncrypterAdapter
    );

    const result = await createEmployeeUseCase.execute({
      cpf,
      name,
      password,
      dtNasc,
      admin,
      role,
    });

    return response.status(201).json(result);
  }
}
