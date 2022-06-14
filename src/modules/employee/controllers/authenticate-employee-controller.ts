import { Response, Request } from 'express';
import { BcryptEncrypterAdapter } from 'modules/employee/infra/adapters/bcrypt-encrypter-adapter';

import { JwtAuthenticatorAdapter } from '@shared/infra/adapters/jwt-authenticator-adapter';

import { AuthenticateEmployeeUseCase } from '@employee/domain/useCases/authenticate-employee-use-case';
import { EmployeeRepository } from '@employee/infra/repositories/employee-repository';

export class AuthenticateEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf, password } = request.body;

    const employeeRepository = new EmployeeRepository();
    const bcryptEncrypterAdapter = new BcryptEncrypterAdapter();
    const jwtAuthenticatorAdapter = new JwtAuthenticatorAdapter();
    const authenticateEmployeeUseCase = new AuthenticateEmployeeUseCase(
      employeeRepository,
      bcryptEncrypterAdapter,
      jwtAuthenticatorAdapter
    );

    const result = await authenticateEmployeeUseCase.execute({
      cpf,
      password,
    });

    return response.status(200).json(result);
  }
}
