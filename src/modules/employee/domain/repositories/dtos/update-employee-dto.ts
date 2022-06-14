import { Employee } from '@employee/domain/entities/employee';

export namespace UpdateEmployeeDTO {
  export type Params = {
    currentCpf: string;
    cpf?: string;
    name?: string;
    password?: string;
    dtNasc?: string;
    role?: string;
  };

  export type Result = Employee;
}
