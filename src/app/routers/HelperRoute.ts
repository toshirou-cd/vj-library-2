import { NavItem } from '@app/models/side-bar-tab-item';
import { match } from 'react-router-dom';

export default interface HelperRoute {
  component?: React.FC<{ match: match }>;
  layout?: React.FC<any>;
  navItems? : NavItem[];
  path?: string;
  redirectTo?: string;
  exact?: boolean;
  isPrivate?: boolean;
}
