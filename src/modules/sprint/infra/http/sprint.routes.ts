import { Router } from 'express';

import { AuthorizationMiddleware } from '@shared/middlewares/authorization-middleware';

import { CreateSprintController } from '@sprint/controllers/create-sprint-controller';

const sprintRoutes = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const createSprintController = new CreateSprintController();

sprintRoutes.post('/', authorizationMiddleware.verifyAdminToken, createSprintController.handle);

export { sprintRoutes };
