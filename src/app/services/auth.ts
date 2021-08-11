import { httpClient, apiLinks } from '@app/utils';

import { Token } from '@app/models/token';
import { UserInfo } from '@app/models/user-info';

const login = async (username: string, password: string): Promise<Token> => {
  const response = await httpClient.post({
    url: apiLinks.authentication.token,
    data: {
      username,
      password,
    },
  });
  return response.data as Token;
};

const getUserInfo = async (): Promise<UserInfo> => {
  const response = await httpClient.get({
    url: apiLinks.auth.userInfo,
  });
  return response.data as UserInfo;
};

const authService = {
  login,
  getUserInfo,
};

export default authService;
