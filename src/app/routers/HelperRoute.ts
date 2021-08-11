import { ReactNode } from 'react';
import { match } from 'react-router-dom';

export default interface HelperRoute {
  component?: React.FC<{ match: match }>;
  layout?: React.FC<{ children: ReactNode, routerPath:string }>;
  path?: string;
  redirectTo?: string;
  exact?: boolean;
  isPrivate?: boolean;
}
