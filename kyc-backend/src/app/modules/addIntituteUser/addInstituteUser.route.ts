import express from 'express';
import {
  addUsersToInstituteController,
  getAllUsersByInstituteController,
  verifyAndAddUserToInstituteController,
} from './addInstituteUser.controller';
import fnAuth from '../../middleware/fnAuth';

const router = express.Router();

router.post('/addUsers', addUsersToInstituteController);
router.post('/verifyAndAddUser', verifyAndAddUserToInstituteController);
router.get('/profile', fnAuth('manager'), getAllUsersByInstituteController);

export const AddInstituteUserRoutes = router;
