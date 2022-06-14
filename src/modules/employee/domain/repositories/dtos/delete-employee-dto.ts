import { Employee } from '@employee/domain/entities/employee';

export namespace DeleteEmployeeDTO {
  export type Params = { cpf: string };
  export type Result = Employee;
}
