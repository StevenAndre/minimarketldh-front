import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class OauthGoogleService {


  openID="928353775574-jmphcfmnishg37i1of8caiqn4k6ninnr.apps.googleusercontent.com";

  constructor(private oAuthservice:OAuthService) { 
    this.initLogin();
  }

  initLogin(){
    const config:AuthConfig={
      issuer:'https://accounts.google.com',
      strictDiscoveryDocumentValidation:false,
      clientId:this.openID,
      redirectUri:'http://localhost:4200/dashboard/admin-dashboard',
      scope: 'openid profile email',
    }

    this.oAuthservice.configure(config);
    this.oAuthservice.setupAutomaticSilentRefresh();
    this.oAuthservice.loadDiscoveryDocumentAndTryLogin();

  }


  login(){
    this.oAuthservice.initLoginFlow();
  }

  logOut(){
    this.oAuthservice.logOut();
  }

  getProfile(){
    return this.oAuthservice.getIdentityClaims();
  }


}
