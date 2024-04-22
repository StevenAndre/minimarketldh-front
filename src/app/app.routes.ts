import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegiterComponent } from './auth/regiter/regiter.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'register',component:RegiterComponent}
];
