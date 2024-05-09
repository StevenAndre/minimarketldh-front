import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginRegisterServiceService } from '../../../service/login-register-service.service';
import { SidebarComponent } from '../../sidebar/sidebar.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet,RouterLink,SidebarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent  implements OnInit{
  
  constructor(private logser:LoginRegisterServiceService){}

  name:string="";

  roles:any;
 
  
  ngOnInit(): void {

   
    
    this.logser.getUSerActual().subscribe({
      next:(data) => {
        console.log("ROLES: "+data);
        this.roles=data;
      },
      error:(err) =>console.log(err)
    });

  }

}
