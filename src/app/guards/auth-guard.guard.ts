import { CanActivateFn, Router } from '@angular/router';
import { LoginRegisterServiceService } from '../service/login-register-service.service';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const logSer = inject(LoginRegisterServiceService);

  if (logSer.isLogged()) {
    router.navigate(['/dashboard/admin-dashboard/main']);
    return false;
  } else {
   
    return true;
  }
};
