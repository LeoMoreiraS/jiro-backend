import { Employee } from '../entities/employee';
import { CreateEmployeeDTO } from './dtos/create-employee-dto';
import { DeleteEmployeeDTO } from './dtos/delete-employee-dto';
import { UpdateEmployeeDTO } from './dtos/update-employee-dto';

export interface IEmployeeRepository {
  create(params: CreateEmployeeDTO.Params): Promise<CreateEmployeeDTO.Result>;
  update(params: UpdateEmployeeDTO.Params): Promise<UpdateEmployeeDTO.Result>;
  delete(params: DeleteEmployeeDTO.Params): Promise<DeleteEmployeeDTO.Result>;
  findAll(): Promise<Employee[]>;
  findByCpf(cpf: string): Promise<Employee | null>;
}
