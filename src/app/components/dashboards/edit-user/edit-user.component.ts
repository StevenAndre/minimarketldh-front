import { Component, Input, OnInit } from '@angular/core';
import { UserRegister } from '../../../models/userRegisterAdmin';
import { UserUpdate } from '../../../models/userRegisterAdmin';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { LoginRegisterServiceService } from '../../../service/login-register-service.service';
import { UserDto } from '../list-users/list-users.component';
import { UserServiceService } from '../../../service/user-service.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule,NgClass,NgIf,NgFor],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{
  
  constructor(private userSer:UserServiceService){
    
  }
  ngOnInit(): void {
    
    this.userSer.getUserByID(this.userId).subscribe({
      next: (data) => {
        this.user=data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  isVisible:boolean=false;
  @Input() userId!: string;
  userUp:UserUpdate= new UserUpdate();

  user!:UserDto;

  editModal(userId:string){
    this.isVisible=true;
  }


}
