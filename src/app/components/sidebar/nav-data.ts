export const navbarData=[
    {
        routerLink:'/dashboard/admin-dashboard',
        icon: 'fal fa-home',
        label: 'Dashboard',
        submendesplegado:false
    },
    {
        routerLink:'dashboard',
        icon: 'fa fa-shopping-cart',
        label: 'Ventas',
        submendesplegado:false,
        submenu: [
            {
                istoggable:false,
                routerLink: 'dashboard/sales-report',
                label: 'Reporte de Ventas'
            },
            {
                istoggable:false,
                routerLink: 'dashboard/sales-analytics',
                label: 'Analytics de Ventas'
            }
        ]
    },
    {
        routerLink:'/dashboard/admin-dashboard',
        icon: 'fas fa-users',
        label: 'Usuarios',
        submendesplegado:false,
        submenu: [
            {
                routerLink: '/dashboard/admin-dashboard/register-user',
                label: 'Registrar usuario'
            },
            {
                routerLink: '/dashboard/admin-dashboard/list-users',
                label: 'Ver usuarios'
            }
        ]
    },
    {
        routerLink:'dashboard',
        icon: 'fal fa-chart-bar',
        label: 'Estadisticas',
        submendesplegado:false
    },
    {
        routerLink:'dashboard',
        icon: 'far fa-address-book',
        submendesplegado:false,
        label: 'Clientes',
        submenu: [
            {
                routerLink: '/dashboard/admin-dashboard/register-customer',
                label: 'Registrar cliente'
            },
            {
                routerLink: '/dashboard/admin-dashboard/list-customer',
                label: 'Ver clientes'
            }
        ]
    },
    {
        routerLink:'dashboard',
        icon: 'far fa-file-pdf',
        label: 'Reportes',
        submendesplegado:false,
    },
    {
        routerLink:'dashboard',
        icon: 'fas fa-box-open',
        label: 'Productos',
        submendesplegado:false,
        submenu: [
            {
                routerLink: '/dashboard/admin-dashboard/categories',
                label: 'Categorias'
            },
            {
                routerLink: '/dashboard/admin-dashboard/products',
                label: 'Productos'
            },
            {
                routerLink: '/dashboard/admin-dashboard/brans',
                label: 'Marcas'
            },
            {
                routerLink: '/dashboard/admin-dashboard/units',
                label: 'Unidades de medida'
            }
        ]
    },
    {
        routerLink:'dashboard',
        icon: 'fas fa-calculator',
        label: 'Compras',
        submendesplegado:false,
    },
    {
        routerLink:'dashboard',
        icon: 'far fa-clipboard',
        label: 'Inventario',
        submendesplegado:false,
    },
    {
        routerLink:'dashboard',
        icon: 'fas fa-ambulance',
        label: 'Pedidos',
        submendesplegado:false,
    },
    



    

    
    
    
]