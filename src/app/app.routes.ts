import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegiterComponent } from './auth/regiter/regiter.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MainpageComponent } from './components/dashboards/mainpage/mainpage.component';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/dashboards/user-dashboard/user-dashboard.component';
import { CajeroDashboardComponent } from './components/dashboards/cajero-dashboard/cajero-dashboard.component';
import { ForgetpasswComponent } from './auth/forgetpassw/forgetpassw.component';
import { UserRegisterComponent } from './components/dashboards/user-register/user-register.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'forget',component:ForgetpasswComponent},
    {path:'register',component:RegiterComponent},
    {path:'dashboard',component:MainpageComponent,children:[
        {path:'admin-dashboard',component:AdminDashboardComponent,children:[
            {path:'register-user',component:UserRegisterComponent}
        ]},
        {path:'user-dashboard',component:UserDashboardComponent},
        {path:'cajero-dashboard',component:CajeroDashboardComponent},
    ] 
    }
];
