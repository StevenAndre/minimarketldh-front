import { NgFor, NgIf } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserRegister } from '../../../models/userRegisterAdmin';
import { LoginRegisterServiceService } from '../../../service/login-register-service.service';
import { RoleTransformPipePipe } from '../../../pipes/role-transform-pipe.pipe';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [FormsModule,NgIf,RouterLink,NgFor,RoleTransformPipePipe,MatSelectModule,MatFormFieldModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {

  constructor(private logser:LoginRegisterServiceService){

  }
  ngOnInit(): void {
    this.logser.getAllRoles().subscribe({
      next:(data)=>{
        console.log("ROLES +");
        console.log(data);
        this.roles=data;
      },
      error:(err)=>console.log(err)
    });
    
  }

  roles:any;
  user:UserRegister= new UserRegister();

  register(){
  
    

  }
  


}
