import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AllProduct } from './all-product/all-product';
import { ProductDetailsComponent } from './product-details/product-details';

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

  },
{
  path:'product-details/:id',
  loadComponent: () =>
    import('./product-details/product-details')
    .then(m => m.ProductDetailsComponent)
}
];
