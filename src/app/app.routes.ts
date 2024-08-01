import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UserformComponent } from './components/userform/userform.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/users'
    },
    {
        path: 'users',
        component: UserComponent,
    },
    {
        path: 'users/create',
        component: UserformComponent,
    },
    {
        path: 'users/edit/:id',
        component: UserformComponent,
    }
];
