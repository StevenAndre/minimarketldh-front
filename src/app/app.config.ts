import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { LoginRegisterServiceService } from './service/login-register-service.service';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './service/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SpinnerInterceptor } from './service/spinner.interceptor';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { IMAGE_CONFIG } from '@angular/common';
import { DatePipe } from '@angular/common';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideCharts(withDefaultRegisterables()),
    DatePipe,
    provideHttpClient(withInterceptors([authInterceptor,SpinnerInterceptor])), provideAnimationsAsync(),
    provideOAuthClient(),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true, 
        disableImageLazyLoadWarning: true
      }
    },
    
  ]
};
