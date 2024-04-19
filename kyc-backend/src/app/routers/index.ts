import { Router } from 'express';
import { UserRouters } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/api/auth',
    route: UserRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
