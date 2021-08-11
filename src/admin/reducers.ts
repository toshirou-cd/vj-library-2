import { combineReducers } from '@reduxjs/toolkit';

import userManagement from './user-management';

export default combineReducers({
  userManagement: combineReducers(userManagement),
});
