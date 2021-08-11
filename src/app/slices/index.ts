import auth from '@app/slices/auth';
import global from '@app/slices/global';

import authorize from '@authorize/reducers';
import admin from '@admin/reducers';

export default {
  auth,
  global,
  authorize,
  admin,
};
