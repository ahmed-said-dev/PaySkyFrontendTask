import { Component, Input } from '@angular/core';
import { 
  faHome,
  faStore,
  faBoxes,
  faChartPie,
  faUsers,
  faCog,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';

interface MenuItem {
  title: string;
  icon: any;
  link: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['../../../../assets/scss/layouts/dashboard-layout/sidebar/dashboard-sidebar.component.scss']
})
export class DashboardSidebarComponent {
  @Input() isCollapsed = false;

  menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: faHome,
      link: '/dashboard'
    },
    {
      title: 'Products',
      icon: faStore,
      link: '/dashboard/products'
    },
    {
      title: 'Categories',
      icon: faChartPie,
      link: '/dashboard/categories'
    },
    {
      title: 'Settings',
      icon: faCog,
      link: '/settings'
    },
    {
      title: 'Help',
      icon: faQuestionCircle,
      link: '/help'
    }
  ];

  expandedItems: { [key: string]: boolean } = {};

  toggleSubmenu(title: string) {
    this.expandedItems[title] = !this.expandedItems[title];
  }

  isExpanded(title: string): boolean {
    return this.expandedItems[title] || false;
  }
}