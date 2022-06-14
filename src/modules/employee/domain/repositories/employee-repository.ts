import { Employee } from '../entities/employee';
import { CreateEmployeeDTO } from './dtos/create-employee-dto';

export interface IEmployeeRepository {
  create(params: CreateEmployeeDTO.Params): Promise<CreateEmployeeDTO.Result>;
  findByCpf(cpf: string): Promise<Employee | null>;
}
