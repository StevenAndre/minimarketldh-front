import {AfterViewInit, Component, ViewChild,OnInit, TemplateRef } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MenuItem } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { UserServiceService } from '../../../service/user-service.service';
import { Role } from '../../../models/role';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RoleTransformPipePipe } from '../../../pipes/role-transform-pipe.pipe';
import { Router } from '@angular/router';
import { UserRegister } from '../../../models/userRegisterAdmin';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Injectable, Inject, forwardRef } from '@angular/core';
import { EditUserComponent } from '../edit-user/edit-user.component';
@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,ToolbarModule,
    NgClass,
    ButtonModule, SplitButtonModule, InputTextModule,FormsModule,NgFor,NgIf,RoleTransformPipePipe,EditUserComponent],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements AfterViewInit,OnInit  {

  constructor(private userService:UserServiceService, private router:Router,
    //@Inject(forwardRef(() => BsModalService))private modalService: BsModalService
  ){
   

  }


  users:UserDto[]=[];
  modalRef?: BsModalRef;
  isVisible:boolean=false;
  user:UserRegister= new UserRegister();
  displayedColumns: string[] = ['user_id', 'name', 'lastname', 'email','address'];
  dataSource = new MatTableDataSource<UserDto>(this.users);
  userID!:string;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  //users:UserDto[]=[];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  items: MenuItem[] | undefined;

    ngOnInit() {
      this.userService.getAllUsers().subscribe({
        next:data=>{
          console.log(data);
          this.users=data;
         
          console.log("USERS=>"+this.users);
        },
        error:err=>console.log(err)
      });
      
        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Delete',
                icon: 'pi pi-times'
            }
        ];
    }

    redirectRegister(){
      this.router.navigate(['/dashboard/admin-dashboard/register-user']);
    }

    openModal(viewUserTemplate: TemplateRef<any>, userId: string) {
      if (userId) {
        
       // this.modalRef = this.modalService.show(viewUserTemplate);
      }
    }

    editModal(userId:string){
      this.userID=userId;
      alert('USER ID:'+userId);
      this.isVisible=true;
      
    
    }
  closeModal(){
    this.isVisible=false;
  }

}

export interface UserDto {
  user_id:string;
  name: string;
  email:string ;
  lastname: string; 
  username: string;
  phone:string;
  address:string;
  provided:string;
  roles: Role[];
}