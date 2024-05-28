import { Component, Input } from '@angular/core';
import { UserRegister } from '../../../models/userRegisterAdmin';
import { UserUpdate } from '../../../models/userUpdateAd';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { LoginRegisterServiceService } from '../../../service/login-register-service.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule,NgClass,NgIf,NgFor],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  
  constructor(private logUser:LoginRegisterServiceService){}

  isVisible:boolean=false;
  @Input() userId!: string;
  user:USer= new UserRegister();

  editModal(userId:string){
    this.isVisible=true;
  }


}
