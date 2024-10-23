import { Routes } from '@angular/router';

import { CategoryComponent } from './modules/product/component/category/category.component';
import { MainComponent } from './modules/layout/component/main/main.component';
import { LoginComponent } from './modules/auth/component/login/login.component';
import { RegisterComponent } from './modules/auth/component/register/register.component';
import { SecuredComponent } from './modules/auth/component/secured/secured.component';
import { authenticationGuard } from './modules/auth/authentication.guard';
import { ProductImageComponent } from './modules/product/component/product-image/product-image.component';
import { ProductComponent } from './modules/product/component/product/product.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/categoria',
        pathMatch: 'full'
    },
    {
        path: 'categoria',
        component: CategoryComponent
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
        component: ProductComponent
    },
    {
        path: 'product/:gtin',
        component: ProductImageComponent
    },
    {
        path: 'secured',
        component: SecuredComponent, 
        canActivate: [authenticationGuard]
    }

];
