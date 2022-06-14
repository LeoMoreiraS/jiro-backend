import { Router } from 'express';

import { AuthorizationMiddleware } from '@shared/middlewares/authorization-middleware';

import { AuthenticateEmployeeController } from '@employee/controllers/authenticate-employee-controller';
import { CreateEmployeeController } from '@employee/controllers/create-employee-controller';
import { UpdateEmployeeController } from '@employee/controllers/update-employee-controller';

const employeeRoutes = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const createEmployeeController = new CreateEmployeeController();
const authenticateEmployeeController = new AuthenticateEmployeeController();
const updateEmployeeController = new UpdateEmployeeController();
// const getEmployeeInfoController = new GetEmployeeInfoController();
// const findEmployeeController = new SearchEmployeesController();
// const findEmployeeProfileController = new FindEmployeeProfileController();
// const deleteEmployeeController = new DeleteEmployeeController();

employeeRoutes.post('/login', authenticateEmployeeController.handle);

employeeRoutes.post('/', authorizationMiddleware.verifyAdminToken, createEmployeeController.handle);

employeeRoutes.put('/', authorizationMiddleware.verifyUserToken, updateEmployeeController.handle);
// employeeRoutes.get('/', authorizationMiddleware.verifyUserToken, getEmployeeInfoController.handle);
// employeeRoutes.get('/search', authorizationMiddleware.verifyUserToken, findEmployeeController.handle);
// employeeRoutes.get(
//   '/profile',
//   authorizationMiddleware.verifyUserToken,
//   findEmployeeProfileController.handle
// );
// employeeRoutes.delete('/', authorizationMiddleware.verifyUserToken, deleteEmployeeController.handle);

export { employeeRoutes };
