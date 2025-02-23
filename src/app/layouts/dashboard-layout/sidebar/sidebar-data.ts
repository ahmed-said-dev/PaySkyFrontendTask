import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Products',
    iconName: 'building-store',
    route: '/dashboard/products',
  },

  {
    displayName: 'Categories',
    iconName: 'layout-dashboard',
    route: '/dashboard/categories',
  }
];
