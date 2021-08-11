export interface Role {
  id: string;
  name: string;
  description: string;
}

export type RoleCM = Omit<Role, 'id'>;

export interface AddRolesModel {
  ids: string[];
}
