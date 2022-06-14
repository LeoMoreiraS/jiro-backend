import { AppError } from '@shared/errors/app-error';

import { Employee } from '../entities/employee';
import { IEmployeeRepository } from '../repositories/employee-repository';

export namespace DeleteEmployeeUseCaseDTO {
  export type Params = {
    cpf: string;
  };

  export type Result = Employee;
}

export class DeleteEmployeeUseCase {
  constructor(private readonly employeeRepository: IEmployeeRepository) {}

  async execute({
    cpf,
  }: DeleteEmployeeUseCaseDTO.Params): Promise<DeleteEmployeeUseCaseDTO.Result> {
    if (!cpf) {
      throw new AppError('Faltam parâmetros');
    }

    const deletedEmployee = await this.employeeRepository.delete({ cpf });

    if (!deletedEmployee) {
      throw new AppError(`Falha ao deletar funcionário de CPF '${cpf}'`);
    }

    return deletedEmployee;
  }
}
