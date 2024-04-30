import config from '../config';
import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const superUser = {
  username: 'rian',
  email: 'rianislam.coder@gmail.com',
  nid: '1', // "12345678901234567890" is a placeholder
  password: config.supper_admin_password,
  role: USER_ROLE.superAdmin,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExits = await User.findOne({ role: USER_ROLE.superAdmin });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
