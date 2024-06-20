import {AfterViewInit, Component, ViewChild,OnInit } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MenuItem } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { UserServiceService } from '../../../service/user-service.service';

import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { CustomerService } from '../../../service/customer.service';
import { CustomerRegisterComponent } from '../customer-register/customer-register.component';
@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [MatTableModule,
    CustomerRegisterComponent,
    MatPaginatorModule,ToolbarModule, ButtonModule, SplitButtonModule, InputTextModule,FormsModule,NgFor,NgIf,],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {
  

  constructor(private customerService:CustomerService){}

  customers:any[]=[];
 

  isVisible:boolean=false;

  itemLIS=[1,2,2,3,4,5,6,7,3,8,8,8,4,2,3,4,5,6,23,45,6,77,7,7,,7,7,7,7,7,7,7,7]
  
  ngOnInit(): void {


  this.cargarData();

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

  items: MenuItem[] | undefined;

cargarData(){
  this.customerService.getAllUsers().subscribe({
    next: (data) => {
      console.log(data);
    
      this.customers=data;

    },error:err=>console.log(err)
  })
}

  openMoal(){
    this.isVisible=true;
  }

closeModal(){
  this.isVisible=false;
}


closeModalAndRefreshData(registroExitoso: boolean): void {
  if (registroExitoso) {
   this.closeModal(); 
   this.cargarData();
   
  }
}


}
