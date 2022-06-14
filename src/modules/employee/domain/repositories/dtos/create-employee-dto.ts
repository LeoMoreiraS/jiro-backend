import { Employee } from '@employee/domain/entities/employee';

export namespace CreateEmployeeDTO {
  export type Params = {
    cpf: string;
    name: string;
    password: string;
    dtNasc: Date;
    admin: boolean;
    role: string;
  };

  export type Result = Employee;
}
