export interface NavItem {
  title: string;
  path: string;
  subMenu?: NavItem[];
  Icon?: React.ReactNode;
  isInvisible?: boolean;
}
