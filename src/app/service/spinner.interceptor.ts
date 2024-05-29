import { inject } from "@angular/core"
import { SpinnerService } from "./spinner.service"
import { finalize } from "rxjs";
import { HttpInterceptorFn } from "@angular/common/http";

export const SpinnerInterceptor:HttpInterceptorFn=(req,next)=>{
    const spinnerSvc=inject(SpinnerService);
    const excludedRoutes = ['http://localhost:8080/products/all-pag-like',
        //'http://localhost:8080/products/image',
        'blob:http://localhost:4200/'
    ];

    // Comprobar si la URL del request coincide exactamente con alguna de las rutas excluidas
    const isExcludedRoute = excludedRoutes.some(route => req.url === route);
  
    // Si la ruta está excluida, no aplicar el interceptor
    if (isExcludedRoute) {
      return next(req);
    }
    spinnerSvc.show();
    return next(req).pipe(
        finalize(()=>spinnerSvc.hide())
    );
}