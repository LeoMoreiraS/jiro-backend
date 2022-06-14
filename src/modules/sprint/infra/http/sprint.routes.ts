import { Router } from 'express';

import { AuthorizationMiddleware } from '@shared/middlewares/authorization-middleware';

import { CreateSprintController } from '@sprint/controllers/create-sprint-controller';
import { DeleteSprintController } from '@sprint/controllers/delete-sprint-controller';
import { ListSprintsController } from '@sprint/controllers/list-sprints-controller';
import { UpdateSprintController } from '@sprint/controllers/update-sprint-controller';

const sprintRoutes = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const createSprintController = new CreateSprintController();
const listSprintsController = new ListSprintsController();
const updateSprintController = new UpdateSprintController();
const deleteSprintController = new DeleteSprintController();

sprintRoutes.post('/', authorizationMiddleware.verifyAdminToken, createSprintController.handle);
sprintRoutes.put('/', authorizationMiddleware.verifyAdminToken, updateSprintController.handle);
sprintRoutes.delete('/', authorizationMiddleware.verifyAdminToken, deleteSprintController.handle);

sprintRoutes.get('/', authorizationMiddleware.verifyUserToken, listSprintsController.handle);

export { sprintRoutes };
