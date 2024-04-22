import { Component } from '@angular/core';
import { loginDTO } from '../../models/login';
import { FormsModule, NgModel } from '@angular/forms';
import { LoginRegisterServiceService } from '../../service/login-register-service.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private loginser:LoginRegisterServiceService){

  }


  loginReques:loginDTO=new loginDTO();



  login(){

    console.log(this.loginReques);
    this.loginser.login(this.loginReques).subscribe({
      next:(data)=>console.log(data),
      error: (error) => console.log(error)
    });    

  }


}
