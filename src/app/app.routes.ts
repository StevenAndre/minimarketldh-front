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
import { ListUsersComponent } from './components/dashboards/list-users/list-users.component';
import { CustomerListComponent } from './components/dashboards/customer-list/customer-list.component';
import { CustomerRegisterComponent } from './components/dashboards/customer-register/customer-register.component';
import { ListComprasComponent } from './components/dashboards/compras/list-compras/list-compras.component';
import { ListProveedoresComponent } from './components/dashboards/proveedores/list-proveedores/list-proveedores.component';
import { ListRubrosComponent } from './components/dashboards/rubros/list-rubros/list-rubros.component';
import { ProductListComponent } from './components/dashboards/productos/product-list/product-list.component';
import { ListMarcasComponent } from './components/dashboards/productos/list-marcas/list-marcas.component';
import { ListCategoriasComponent } from './components/dashboards/productos/list-categorias/list-categorias.component';
import { ListUnidadesComponent } from './components/dashboards/productos/list-unidades/list-unidades.component';
import { MainDashboardComponent } from './components/dashboards/main-dashboard/main-dashboard.component';
import { ListaVentasComponent } from './components/dashboards/ventas/lista-ventas/lista-ventas.component';
import { RegistroVentasComponent } from './components/dashboards/ventas/registro-ventas/registro-ventas.component';
import { RegistrarCompraComponent } from './components/dashboards/compras/registrar-compra/registrar-compra.component';
import { PedidosComponent } from './components/dashboards/pedidos/pedidos.component';
import { CajaComponent } from './components/dashboards/caja/caja.component';
import { InventarioComponent } from './components/dashboards/inventario/inventario.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'forget',component:ForgetpasswComponent},
    {path:'register',component:RegiterComponent},
    {path:'dashboard',component:MainpageComponent,children:[
        {path:'admin-dashboard',component:AdminDashboardComponent,children:[
            {path:'register-user',component:UserRegisterComponent},
            {path:'list-users',component:ListUsersComponent},
            {path:'list-customer',component:CustomerListComponent},
            {path:'register-customer',component:CustomerRegisterComponent},
            {path:'purchase',component:ListComprasComponent},
            {path:'register-purchase',component:RegistrarCompraComponent},
            {path:'proveedores',component:ListProveedoresComponent},
            {path:'rubros',component:ListRubrosComponent},
            {path:'products',component:ProductListComponent},
            {path:'brands',component:ListMarcasComponent},
            {path:'categories',component:ListCategoriasComponent},
            {path:'units',component:ListUnidadesComponent},
            {path:'main',component:MainDashboardComponent},
            {path:'list-sales',component:ListaVentasComponent},
            {path:'register-sale',component:RegistroVentasComponent},
            {path:'pedidos',component:PedidosComponent},
            {path:'inventario',component:InventarioComponent},
            {path:'caja',component:CajaComponent},
        ]},
        {path:'user-dashboard',component:UserDashboardComponent},
        {path:'cajero-dashboard',component:CajeroDashboardComponent},
    ] 
    }
];
