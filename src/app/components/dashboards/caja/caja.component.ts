import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CajaService,CashRequest } from '../../../service/caja.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caja',
  standalone: true,
  imports: [NgIf,NgFor,FormsModule,ReactiveFormsModule,NgClass],
  templateUrl: './caja.component.html',
  styleUrl: './caja.component.css'
})
export class CajaComponent  implements OnInit,OnDestroy{
 

  cajaService=inject(CajaService);
  router=inject(Router);

  caja:CashRequest={
    name:"",
    location:"",
    number:0
  };
  ngOnInit(): void {
   this.cargarData();
  }

  ngOnDestroy(): void {
    
    if(!this.clickTarjeta){
      this.cajaService.cajaID.set(1);
    }
   
  }
  cajas:Caja[]=[];

  modal:boolean=false;
  clickTarjeta:boolean=false;
  toggleModal() {
    this.modal=true;
    console.log(this.modal);

  }
  closeModal(){
    this.modal=false;
    console.log(this.modal);
  }


  cargarData(){
    this.cajaService.listAllCash().subscribe(
      (data:Caja[])=>{
        console.log(data);
        this.cajas=data;
      },
      (error:any)=>{
        console.log(error);
      }
    );;
  }


  openAperturas(id:number){
    this.cajaService.cajaID.set(id);
    this.clickTarjeta=true;
    this.router.navigate(["/dashboard/admin-dashboard/lista-aperturas"]);

  }


  registrarCaja(){

    if(this.caja.number==null || this.caja.location.length<1 || this.caja.name.trim()=='' ){
      Swal.fire('Atencion','debes llenar todos los campos','warning');
    }

    console.log(this.caja);

      this.cajaService.createCash(this.caja).subscribe({
        next: (data) => {
          console.log(data);
          this.closeModal();
          Swal.fire('Correcto','Caja registrada','success');
          this.caja.location="";
          this.caja.number=0;
          this.caja.name=""
          this.cargarData();
        },
        error: (error) => {
          Swal.fire('Error',error,'error');
        }
      });

  }


}
interface Caja {
  id:number;
  name:string;
  number:number;
  location:string;
}