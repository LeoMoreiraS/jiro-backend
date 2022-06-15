import { Router } from 'express';

import { AuthorizationMiddleware } from '@shared/middlewares/authorization-middleware';

import { CreateTaskController } from '@task/controllers/create-task-controller';
import { DeleteTaskController } from '@task/controllers/delete-task-controller';
import { ListTaskController } from '@task/controllers/list-task-controller';
import { UpdateTaskController } from '@task/controllers/update-task-controller';

const taskRoutes = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const createTaskController = new CreateTaskController();
const listTaskController = new ListTaskController();
const updateTaskController = new UpdateTaskController();
const deleteTaskController = new DeleteTaskController();

taskRoutes.post('/', authorizationMiddleware.verifyAdminToken, createTaskController.handle);
taskRoutes.put('/', authorizationMiddleware.verifyAdminToken, updateTaskController.handle);
taskRoutes.delete('/', authorizationMiddleware.verifyAdminToken, deleteTaskController.handle);

taskRoutes.get('/', authorizationMiddleware.verifyUserToken, listTaskController.handle);

export { taskRoutes };
