import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginRegisterServiceService } from '../service/login-register-service.service';

export const userGuard: CanActivateFn = (route, state) => {
 
  const router = inject(Router);
  const logSer = inject(LoginRegisterServiceService);


  if (logSer.isLogged()) {
    return true;
  } else {
  router.navigate(['/login']);
    return false;
  }

};
