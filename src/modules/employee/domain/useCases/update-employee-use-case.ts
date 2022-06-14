import { IAuthenticatorAdapter } from '@shared/adapters/authenticator-adapter';
import { AppError } from '@shared/errors/app-error';

import { IEncrypterAdapter } from '../adapters/encrypter-adapter';
import { Employee } from '../entities/employee';
import { IEmployeeRepository } from '../repositories/employee-repository';

export namespace UpdateEmployeeUseCaseDTO {
  export type Params = {
    currentCpf: string;
    cpf?: string;
    name?: string;
    password?: string;
    dtNasc?: string;
    role?: string;
  };

  export type Result = {
    updatedEmployee: Employee;
    newToken?: string;
  };
}

export class UpdateEmployeeUseCase {
  constructor(
    private readonly employeeRepository: IEmployeeRepository,
    private readonly encrypterAdapter: IEncrypterAdapter,
    private readonly authenticatorAdapter: IAuthenticatorAdapter
  ) {}

  async execute({
    currentCpf,
    cpf,
    name,
    password,
    dtNasc,
    role,
  }: UpdateEmployeeUseCaseDTO.Params): Promise<UpdateEmployeeUseCaseDTO.Result> {
    const employeeExists = await this.employeeRepository.findByCpf(currentCpf);

    if (!employeeExists) {
      throw new AppError(`Funcionário de CPF ${currentCpf} não encontrado`);
    }

    if (!cpf && !name && !password && !dtNasc && !role) {
      throw new AppError('Não foram enviados parâmetros para atualização');
    }

    if (cpf) {
      const cpfAlreadyExists = await this.employeeRepository.findByCpf(cpf);

      if (cpfAlreadyExists) {
        throw new AppError(`Cpf '${cpf}' já existe`);
      }
    }

    let encryptedPassword = password;
    if (password) {
      encryptedPassword = await this.encrypterAdapter.encrypt(password);
    }

    const updatedEmployee = await this.employeeRepository.update({
      currentCpf,
      cpf,
      name,
      password: encryptedPassword,
      dtNasc,
      role,
    });

    let newToken: string | undefined;
    if (cpf) {
      const { token } = await this.authenticatorAdapter.createToken({
        payload: {
          cpf: updatedEmployee.cpf,
          admin: updatedEmployee.admin,
        },
      });

      newToken = token;
    }

    return {
      updatedEmployee,
      newToken,
    };
  }
}
