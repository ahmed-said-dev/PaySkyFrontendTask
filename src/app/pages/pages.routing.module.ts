import { Routes } from '@angular/router';
import { CategoriesComponent } from './product-categories/categories.component';
import { AppDashboardComponent } from './admin-dashboard/products.component';

export const PagesRoutes: Routes = [
  {
    path: 'products',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    
  },
];
