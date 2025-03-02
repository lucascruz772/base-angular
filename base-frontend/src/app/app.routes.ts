import { Routes, Route } from '@angular/router';
import { LoginComponent } from './pages/public/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './pages/private/home/home.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './layouts/private-layout/private-layout.component';

const publicRoutes: Routes = [
    {
        path: 'auth',
        component: PublicLayoutComponent,
        children:  [{path: 'auth/login', component: LoginComponent}],
    },
];


const privateRoutes: Routes = [
    {
        path: '',
        component: PrivateLayoutComponent,
        children:  [{ path:'home', component: HomeComponent}],
    },

    ].map((route: Route) => ({
        ...route, 
        canActivate: !!route.canActivate 
        ? [...route.canActivate, authGuard] 
        : [authGuard],
    }));


export const route: Routes = [
    {path: '',
         redirectTo: 'auth/login',
         pathMatch: 'full',
    },
    
        
    ...publicRoutes,
    ...privateRoutes,
];

