import { Router } from 'express';
import { UserRouters } from '../modules/user/user.route';
import { InstituteRoutes } from '../modules/fnInstitute/fnInstitute.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/api/auth',
    route: UserRouters,
  },
  {
    path: '/api/fnInstitute',
    route: InstituteRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
