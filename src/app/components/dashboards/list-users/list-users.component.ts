import {AfterViewInit, Component, ViewChild,OnInit } from '@angular/core';
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
import { NgFor, NgIf } from '@angular/common';
import { RoleTransformPipePipe } from '../../../pipes/role-transform-pipe.pipe';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,ToolbarModule, ButtonModule, SplitButtonModule, InputTextModule,FormsModule,NgFor,NgIf,RoleTransformPipePipe],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements AfterViewInit,OnInit  {

  constructor(private userService:UserServiceService){
   

  }

  users:UserDto[]=[];


  displayedColumns: string[] = ['user_id', 'name', 'lastname', 'email','address'];
  dataSource = new MatTableDataSource<UserDto>(this.users);

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