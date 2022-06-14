import { Router } from 'express';

import { employeeRoutes } from '@employee/infra/http/employee.routes';

const router = Router();

router.use('/employee', employeeRoutes);

export { router };
