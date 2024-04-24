import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ForgetpasswService } from '../../service/forgetpassw.service';
import { changePasswordDto } from '../../models/changePassword';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgetpassw',
  standalone: true,
  imports: [FormsModule,NgIf,RouterLink],
  templateUrl: './forgetpassw.component.html',
  styleUrl: './forgetpassw.component.css'
})
export class ForgetpasswComponent implements OnInit{
  
  
  constructor(private forgetServ:ForgetpasswService,
    private router:Router
  ){}

  ngOnInit(): void {
   Swal.fire("Atencion","Introduce el email de tu cuenta y te enviaremos un codigo de verificacion a tu correo",'info')
  }

  

  email: string = '';
  password:string='';
  tokenUnique:string='';
  confirmationCode: string = '';
  sendCode:boolean=false;
  showCodeInput: boolean = false;
  successMessage: string = '';
  changepsswInpu:boolean=false;
  changePass:changePasswordDto= new changePasswordDto();

  sendEmail() {
    this.forgetServ.senDVerificactioEmailCode(this.email).subscribe(
      {
        next:(data)=>{
          console.log(data);
          this.showCodeInput=true;
          Swal.fire("Codigo Enviado","Acabamos de enviar un codigo a su correo por favor revise","success");
          
        },
        error: (error) => {
          console.log(error);
          Swal.fire("lo siento","Hubo un problema intente de nuevo","error");
        }
      }
    );
    
  
    this.sendCode=true;
   
  }

  verifyCode() {
   this.forgetServ.SendVerificationCode(this.email, this.confirmationCode).subscribe({
     next : (data) => { 
      console.log(data);
      this.tokenUnique=data.code;
      this.showCodeInput=false;
      this.changepsswInpu=true;
     },
     error: (err) =>{
      Swal.fire("lo siento","El codigo introducido no es el correcto","error");
     }
  });
   
  }

  changePassword(){
  
    this.changePass.email=this.email;
    this.changePass.code=this.tokenUnique;
    this.changePass.new_password=this.password;


    this.forgetServ.changePassword(this.changePass).subscribe({
      next:(data)=>{
        console.log(data);
        this.email="";
        this.tokenUnique="";
        this.password="";
        this.changePass= new changePasswordDto();
        Swal.fire('Contraseña actualizada','Felicidades su contraseña fue actualizada','info');
        this.router.navigate(['/login']);
      },
      error:(err)=>{
          console.log(err);
      }
    });


  }
}
