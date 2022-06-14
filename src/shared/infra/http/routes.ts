import { Router } from 'express';

import { employeeRoutes } from '@employee/infra/http/employee.routes';

import { sprintRoutes } from '@sprint/infra/http/sprint.routes';

import { storyRoutes } from '@story/infra/http/story.routes';

const router = Router();

router.use('/employee', employeeRoutes);
router.use('/sprint', sprintRoutes);
router.use('/story', storyRoutes);

export { router };
