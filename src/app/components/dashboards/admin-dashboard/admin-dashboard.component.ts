import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginRegisterServiceService } from '../../../service/login-register-service.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent  implements OnInit{
  
  constructor(private logser:LoginRegisterServiceService){}

  name:string="";
  
  ngOnInit(): void {
    
    this.logser.getUSerActual().subscribe({
      next:(user) => {
        console.log(user);
        this.name=user.name;
      },
      error:(err) =>console.log(err)
    });

  }

}
