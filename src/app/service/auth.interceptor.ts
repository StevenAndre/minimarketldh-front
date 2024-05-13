import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { routes } from '../app.routes';



export const authInterceptor: HttpInterceptorFn = (req, next) => {


  const router:Router=new Router();
  
  const currentUrl = req.url;


  // Verificar si la ruta actual está en la lista de rutas excluidas
  if (currentUrl.includes('accounts.google.com/.well-known/openid-configuration')) {
    // Si la ruta actual está en la lista de rutas excluidas, no aplicar el interceptor
    return next(req);
  }
  const authToken = localStorage.getItem("token");
  if (!authToken) {
    router.navigate(['/login']);
    return next(req);
  }

  // Clone the request and add the authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  


  // Pass the cloned request with the updated header to the next handler
  return next(authReq);
};
