import { Employee } from '../entities/employee';
import { IEmployeeRepository } from '../repositories/employee-repository';

export class ListEmployeesUseCase {
  constructor(private readonly employeeRepository: IEmployeeRepository) {}

  async execute(): Promise<Employee[]> {
    const employees = await this.employeeRepository.findAll();
    return employees;
  }
}
