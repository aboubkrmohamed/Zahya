import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AllProduct } from './all-product/all-product';

export const routes: Routes = [
  {
    path:"",
    component:Home

  },

   {
    path:"home",
    component:Home

  },

   {
    path:"allProduct",
    component:AllProduct

  }
];
