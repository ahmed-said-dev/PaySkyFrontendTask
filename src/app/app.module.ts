import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardSidebarComponent } from './layouts/dashboard-layout/sidebar/dashboard-sidebar.component';
import { DashboardHeaderComponent } from './layouts/dashboard-layout/header/dashboard-header.component';
import { SidebarBrandingComponent } from './layouts/dashboard-layout/sidebar/sidebar-branding.component';
import { SidebarNavItemComponent } from './layouts/dashboard-layout/sidebar/nav-item/sidebar-nav-item.component';
import { httpInterceptorProviders } from './helpers/http.interceptor';
import { ProductsService } from './services/product-management/products.service';
import { CategoriesService } from './services/category-management/categories.service';

import { AppSideLoginComponent } from './pages/authentication/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    AuthLayoutComponent,
    DashboardSidebarComponent,
    DashboardHeaderComponent,
    SidebarBrandingComponent,
    SidebarNavItemComponent,
    AppSideLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    NgScrollbarModule,
    FontAwesomeModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatBadgeModule,
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
  providers: [
    httpInterceptorProviders,
    ProductsService,
    CategoriesService
  ],

})
export class AppModule {}
