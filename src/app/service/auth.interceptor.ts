import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  

  const authToken = localStorage.getItem("token");
  if (!authToken) {
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
