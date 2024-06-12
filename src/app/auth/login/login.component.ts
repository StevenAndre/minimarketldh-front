import { Component } from '@angular/core';
import { loginDTO } from '../../models/login';
import { FormsModule, NgModel } from '@angular/forms';
import { LoginRegisterServiceService } from '../../service/login-register-service.service';
import { Router, RouterModule } from '@angular/router';
import { NgIconComponent, NgIconsModule, provideIcons } from '@ng-icons/core';
import Swal from 'sweetalert2';
import { OauthGoogleService } from '../../service/oauth-google.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule,NgIconComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private loginser:LoginRegisterServiceService, private router:Router,
    private oauthservice:OauthGoogleService
  ){

  }


  loginReques:loginDTO=new loginDTO();



  login(){

    if(this.loginReques.email.trim()=='' || this.loginReques.password.trim()==''){
      Swal.fire('Atencion','Todos los campos deben estar llenados','info');
      this.loginReques=new loginDTO();
      return;
    }
    console.log(this.loginReques);
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if(regexCorreo.test(this.loginReques.email)){
      this.loginReques.username=this.loginReques.email;
    }else{
      this.loginReques.username=this.loginReques.email;
      this.loginReques.email="_@_._"
    }
    
    this.loginser.login(this.loginReques).subscribe({
      next:(data)=>{
        this.loginReques=new loginDTO();
        console.log(data);
        this.loginser.saveToken(data.token);
        this.router.navigate(['/dashboard/admin-dashboard/main']);
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error de autenticación','Correo o contraseña incorrectas, vuelve a intentarlo!!','error');
      }
      
    });    

    this.loginReques=new loginDTO();
  }

  loginOauth2(){
    this.oauthservice.login();
  }


}
