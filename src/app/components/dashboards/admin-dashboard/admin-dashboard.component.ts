import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginRegisterServiceService } from '../../../service/login-register-service.service';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { OauthGoogleService } from '../../../service/oauth-google.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet,RouterLink,SidebarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent  implements OnInit{
  
  constructor(private logser:LoginRegisterServiceService,private oautservice:OauthGoogleService){}

  name:string="";

  roles:any;
 
  
  ngOnInit(): void {

   
     

  }

  showdata(){
    const data=JSON.stringify(this.oautservice.getProfile());
    console.log("DATA OAURH DOS=>"+data);
  }

}
