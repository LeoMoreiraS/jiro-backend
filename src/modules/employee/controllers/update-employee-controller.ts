import { Response, Request } from 'express';

import { JwtAuthenticatorAdapter } from '@shared/infra/adapters/jwt-authenticator-adapter';

import { UpdateEmployeeUseCase } from '@employee/domain/useCases/update-employee-use-case';
import { BcryptEncrypterAdapter } from '@employee/infra/adapters/bcrypt-encrypter-adapter';
import { EmployeeRepository } from '@employee/infra/repositories/employee-repository';

export class UpdateEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf, name, password, dtNasc, role } = request.body;

    const employee = response.locals.decodedToken;

    const employeeRepository = new EmployeeRepository();
    const bcryptEncrypterAdapter = new BcryptEncrypterAdapter();
    const jwtAuthenticatorAdapter = new JwtAuthenticatorAdapter();
    const createEmployeeUseCase = new UpdateEmployeeUseCase(
      employeeRepository,
      bcryptEncrypterAdapter,
      jwtAuthenticatorAdapter
    );

    const result = await createEmployeeUseCase.execute({
      currentCpf: employee.cpf,
      cpf,
      name,
      password,
      dtNasc,
      role,
    });

    return response.status(200).json(result);
  }
}
