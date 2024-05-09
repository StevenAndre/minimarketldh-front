import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { LoginRegisterServiceService } from './service/login-register-service.service';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './service/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SpinnerInterceptor } from './service/spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor,SpinnerInterceptor])), provideAnimationsAsync(),
  ]
};
