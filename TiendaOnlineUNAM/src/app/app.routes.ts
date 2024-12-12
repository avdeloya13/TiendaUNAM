import { Routes } from '@angular/router';

import { CategoryComponent } from './modules/product/component/category/category.component';
import { MainComponent } from './modules/layout/component/main/main.component';
import { LoginComponent } from './modules/auth/component/login/login.component';
import { RegisterComponent } from './modules/auth/component/register/register.component';
import { SecuredComponent } from './modules/auth/component/secured/secured.component';
import { authenticationGuard } from './modules/auth/authentication.guard';
import { ProductImageComponent } from './modules/product/component/product-image/product-image.component';
import { ProductComponent } from './modules/product/component/product/product.component';
import { HomeComponent } from './modules/layout/component/home/home.component';
import { InvoiceComponent } from './modules/invoice/component/invoice/invoice.component';
import { ByCategoryComponent } from './modules/product/component/by-category/by-category.component';
import { CartComponent } from './modules/invoice/component/cart/cart.component';
import { InvoiceDetailComponent } from './modules/invoice/component/invoice-detail/invoice-detail.component';
import { RegionComponent } from './modules/customer/component/region/region.component';
import { CustomerImageComponent } from './modules/customer/component/customer-image/customer-image.component';
import { CustomerComponent } from './modules/customer/component/customer/customer.component';
import { ProductsComponent } from './modules/product/component/products/products.component';
import { ByCatProductImageComponent } from './modules/product/component/by-cat-product-image/by-cat-product-image.component';
import { ProductsImageComponent } from './modules/product/component/products-image/products-image.component';
import { adminGuard } from './core/admin.guard';
import { customerGuard } from './core/customer.guard';

export const routes: Routes = [
    
    {
        path: '',
        component: HomeComponent 
    },
    {
        path: 'categoria',
        component: CategoryComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'product',
        component: ProductComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'product/:gtin',
        component: ProductImageComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'categoria/:id',
        component: ByCategoryComponent
    },
    //{
       // path: 'secured',
      //  component: SecuredComponent, 
        //canActivate: [authenticationGuard]
    //},
    {
        path: 'region',
        component: RegionComponent,
        canActivate: [adminGuard]
    },
    {   path: 'invoice',
        component: InvoiceComponent
    },
    {   path: 'invoice/:id',
        component: InvoiceDetailComponent 
    },
    {   path: 'cart',
        component: CartComponent,
        canActivate: [customerGuard]
    },
    {
        path: 'customer',
        component: CustomerComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'customer/:rfc',
        component: CustomerImageComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'categoria/:id/product/:gtin',
        component: ByCatProductImageComponent
    },
    {
        path: 'products/product/:gtin',
        component: ProductsImageComponent
    },
];
