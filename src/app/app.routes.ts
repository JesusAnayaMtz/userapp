import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UserformComponent } from './components/userform/userform.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/users/page/0'
    },
    {
        path: 'users',
        component: UserComponent,
    },
    {
        path: 'users/page/:page',
        component: UserComponent,
    },
    {
        path: 'users/create',
        component: UserformComponent,
        canActivate: [authGuard]  //se agrega el cantactivate para proyteger la ruta
    },
    {
        path: 'users/edit/:id',
        component: UserformComponent,
        canActivate: [authGuard]  //se agrega el cantactivate para proyteger la ruta
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
