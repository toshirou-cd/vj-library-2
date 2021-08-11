export interface ChangePasswordModel {
  oldPassword: string;
  newPassword: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  fullName: string;
}

export interface UserCM extends Omit<User, 'id'> {
  password: string;
}

export interface AddUsersModel {
  userIds: string[];
}
