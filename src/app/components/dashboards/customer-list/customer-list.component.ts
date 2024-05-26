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
@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,ToolbarModule, ButtonModule, SplitButtonModule, InputTextModule,FormsModule,NgFor,NgIf,],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {
  

  constructor(private customerService:CustomerService){}

  customers:any[]=[];
  
  ngOnInit(): void {


    this.customerService.getAllUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.customers=data;

      },error:err=>console.log(err)
    })

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




}
