import { Router } from 'express';

import { AuthorizationMiddleware } from '@shared/middlewares/authorization-middleware';

import { CreateStoryController } from '@story/controllers/create-story-controller';
import { DeleteStoryController } from '@story/controllers/delete-story-controller';
import { ListStoriesController } from '@story/controllers/list-story-controller';
import { UpdateStoryController } from '@story/controllers/update-story-controller';

const storyRoutes = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const createStoryController = new CreateStoryController();
const listStoriesController = new ListStoriesController();
const updateStoryController = new UpdateStoryController();
const deleteStoryController = new DeleteStoryController();

storyRoutes.post('/', authorizationMiddleware.verifyAdminToken, createStoryController.handle);
storyRoutes.put('/', authorizationMiddleware.verifyAdminToken, updateStoryController.handle);
storyRoutes.delete('/', authorizationMiddleware.verifyAdminToken, deleteStoryController.handle);

storyRoutes.get('/', authorizationMiddleware.verifyUserToken, listStoriesController.handle);

export { storyRoutes };
