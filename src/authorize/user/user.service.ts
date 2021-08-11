import { httpClient, apiLinks } from '@app/utils';
import { User } from './user.model';

const getUsers = async (): Promise<User[]> => {
  const result = await httpClient.get({
    url: apiLinks.authorization.user.get,
  });

  return result.data as User[];
};

const userService = {
  getUsers,
};

export default userService;
