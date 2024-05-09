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
                routerLink: 's',
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
        icon: 'far fa-file-pdf',
        label: 'Reportes',
        submendesplegado:false,
    },
    {
        routerLink:'dashboard',
        icon: 'fas fa-box-open',
        label: 'Productos',
        submendesplegado:false,
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
    {
        routerLink:'dashboard',
        icon: 'far fa-address-book',
        submendesplegado:false,
        label: 'Clientes'
    },



    

    
    
    
]