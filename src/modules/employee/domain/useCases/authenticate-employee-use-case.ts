import { IAuthenticatorAdapter } from '@shared/adapters/authenticator-adapter';
import { AppError } from '@shared/errors/app-error';

import { IEncrypterAdapter } from '../adapters/encrypter-adapter';
import { IEmployeeRepository } from '../repositories/employee-repository';

export namespace AuthenticateEmployeeUseCaseDTO {
  export type Params = {
    cpf: string;
    password: string;
  };

  export type Result = {
    token: string;
  };
}

export class AuthenticateEmployeeUseCase {
  constructor(
    private readonly employeeRepository: IEmployeeRepository,
    private readonly encrypterAdapter: IEncrypterAdapter,
    private readonly authenticatorAdapter: IAuthenticatorAdapter
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateEmployeeUseCaseDTO.Params): Promise<AuthenticateEmployeeUseCaseDTO.Result> {
    if (!cpf || !password) {
      throw new AppError('Missing params');
    }

    const employee = await this.employeeRepository.findByCpf(cpf);

    if (!employee) {
      throw new AppError('Wrong credentials');
    }

    const isPasswordValid = await this.encrypterAdapter.comparePassword({
      plainPassword: password,
      hashedPassword: employee.password,
    });

    if (!isPasswordValid) {
      throw new AppError('Wrong credentials');
    }

    const { token } = await this.authenticatorAdapter.createToken({
      payload: {
        cpf: employee.cpf,
        admin: employee.admin,
      },
    });

    return {
      token,
    };
  }
}
