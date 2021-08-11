export interface Permission {
  id: string;
  name: string;
  description: string;
  // Permission UI
  code?: string;
  // Permission Resource
  method?: string;
  url?: string;
  permissionType?: number;
  // Permission Data
  username?: string;
  provinceId?: string;
  indicatorId?: string;
  type?: number;
}

export interface PermissionCM {
  permission?: {
    name?: string;
    description?: string;
    // Permission UI
    code?: string;
    // Permision API
    url?: string;
    method?: string;
    permissionType?: number;
    // Permission Data
    username?: string;
    provinceId?: string;
    indicatorId?: string;
    type?: number;
  };
  holderId: string;
  isGroup?: boolean;
  isRole?: boolean;
  isUser?: boolean;
  isPermissionUI?: boolean;
  isPermissionResource?: boolean;
  isPermissionData?: boolean;
}
