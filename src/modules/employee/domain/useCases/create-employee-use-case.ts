import { AppError } from '@shared/errors/app-error';

import { IEncrypterAdapter } from '../adapters/encrypter-adapter';
import { Employee } from '../entities/employee';
import { IEmployeeRepository } from '../repositories/employee-repository';

export namespace CreateEmployeeUseCaseDTO {
  export type Params = {
    cpf: string;
    name: string;
    password: string;
    dtNasc: Date;
    admin?: boolean;
    role: string;
  };

  export type Result = Employee;
}

export class CreateEmployeeUseCase {
  constructor(
    private readonly employeeRepository: IEmployeeRepository,
    private readonly encrypterAdapter: IEncrypterAdapter
  ) {}

  async execute({
    cpf,
    name,
    password,
    dtNasc,
    admin,
    role,
  }: CreateEmployeeUseCaseDTO.Params): Promise<CreateEmployeeUseCaseDTO.Result> {
    if (!cpf || !name || !password || !dtNasc || !role) {
      throw new AppError('Missing params');
    }

    const cpfAlreadyExists = await this.employeeRepository.findByCpf(cpf);

    if (cpfAlreadyExists) {
      throw new AppError(`Cpf '${cpf}' already exists`);
    }

    const encryptedPassword = await this.encrypterAdapter.encrypt(password);

    const createdEmployee = await this.employeeRepository.create({
      cpf,
      name,
      password: encryptedPassword,
      dtNasc,
      admin: admin ?? false,
      role,
    });

    return createdEmployee;
  }
}
