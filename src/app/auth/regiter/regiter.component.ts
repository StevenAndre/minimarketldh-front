import { Component, NgModule } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { LoginRegisterServiceService } from '../../service/login-register-service.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-regiter',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './regiter.component.html',
  styleUrl: './regiter.component.css'
})
export class RegiterComponent {

  constructor(private registserv:LoginRegisterServiceService,private router:Router){}

  user:User= new User();


  register(){
    console.log(this.user);
    if(this.user.email.trim()=='' || this.user.password.trim()==''|| this.user.username.trim()=='' || this.user.name.trim()==''){
      Swal.fire('Atencion','Todos los campos del registro deben estar llenados','info');
    }
    this.registserv.register(this.user).subscribe({
      next:(data)=>{
        this.user=new User();
        console.log(data);
        Swal.fire("Registro exitoso","Felicidades ya esta registrado en la  plataforma!","success");
       this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
        Swal.fire("lo siento",error.error.message,"warning");
      }
    });    
    }


}
