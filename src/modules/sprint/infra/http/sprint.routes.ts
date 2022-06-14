import { Router } from 'express';

import { AuthorizationMiddleware } from '@shared/middlewares/authorization-middleware';

import { CreateSprintController } from '@sprint/controllers/create-sprint-controller';
import { ListSprintsController } from '@sprint/controllers/list-sprints-controller';

const sprintRoutes = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const createSprintController = new CreateSprintController();
const listSprintsController = new ListSprintsController();

sprintRoutes.post('/', authorizationMiddleware.verifyAdminToken, createSprintController.handle);
sprintRoutes.get('/', authorizationMiddleware.verifyUserToken, listSprintsController.handle);

export { sprintRoutes };
