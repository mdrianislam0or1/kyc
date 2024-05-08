import { Router } from 'express';
import { UserRouters } from '../modules/user/user.route';
import { InstituteRoutes } from '../modules/fnInstitute/fnInstitute.route';
import { AddInstituteUserRoutes } from '../modules/addIntituteUser/addInstituteUser.route';

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
  {
    path: '/api/addInstituteUser',
    route: AddInstituteUserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
