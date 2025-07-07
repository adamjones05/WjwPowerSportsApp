import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'register',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./Auth/register/register.component').then(
        (m) => m.RegisterComponent
      );
    },
  },
  {
    path: '',
    redirectTo: './login/login.component',
    pathMatch: 'full',
  },
  {
    path: 'home',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./home/home.component').then((m) => m.HomeComponent);
    },
  },
  {
    path: 'customer',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./search-customer/search-customer.component').then(
        (m) => m.SearchCustomerComponent
      );
    },
  },
  {
    path: 'editCustomer',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./edit-customer/edit-customer.component').then(
        (m) => m.EditCustomerComponent
      );
    },
  },
  {
    path: 'addCustomer',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./add-customer/add-customer.component').then(
        (m) => m.AddCustomerComponent
      );
    },
  },
  {
    path: 'deleteCustomer',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./delete-customer/delete-customer.component').then(
        (m) => m.DeleteCustomerComponent
      );
    },
  },
  {
    path: '**',
    redirectTo: 'login',
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./Auth/login/login.component').then(
        (m) => m.LoginComponent
      );
    },
  },
];
