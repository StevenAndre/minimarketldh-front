import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComprasService,PurchaseDto } from '../../../../service/compras.service';
import { RegistrarCompraComponent } from '../registrar-compra/registrar-compra.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-compras',
  standalone: true,
  imports: [NgClass,NgIf,NgFor,FormsModule,RegistrarCompraComponent],
  templateUrl: './list-compras.component.html',
  styleUrl: './list-compras.component.css'
})
export class ListComprasComponent implements OnInit {
  compraID!:string;
  isEdit:boolean=false;
  detail:boolean=false;
  compras:PurchaseDto[]=[];
  isVisible:boolean=false;
  selectedPage: number = 0;
  numPag: number = this.selectedPage;
  first!:boolean;
  from:number=1;
  numElements!:number;
  to!:number;
  last!:boolean;
  totalPages!:number;
  field: string = 'description';
  totalEmlements!:number;
  pageSize: number = 3;
  sortDirec: string = 'asc';

  constructor(private compraServ:ComprasService,
    
  ){

  }
  ngOnInit(): void {
    this.cargarDATA();
   
  }

  selectPage(page: number): void {
    this.selectedPage = page;
    this.numPag=this.selectedPage;
    this.cargarDATA();
  }


  cargarDATA(){
    this.compraServ.getAllPurchasesPaginated(this.numPag, this.field, this.pageSize, this.sortDirec).subscribe({
      next: (data:any) => {
        console.log('numPag:', this.numPag, 'field:', this.field, 'pageSize:', this.pageSize, 'sortDirec:', this.sortDirec);
        this.pageSize=data.size;
        this.numElements=data.numberOfElements;
        this.totalEmlements=data.totalElements;
        this.from=data.first?1:(this.pageSize*this.numPag)+1;
        this.to=this.numElements+this.from-1;
        this.first=data.first;
        this.totalPages=data.totalPages;
        this.last=data.last;
        console.log(data);
        this.compras=data.content;
        
      },
      error: (err) => {
        console.log(err);
      }
    });

    
  }

  get items(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  closeModalAndRefreshData(registroExitoso: boolean): void {
    if (registroExitoso) {
     this.closeModal(); // Cierra el modal
     this.cargarDATA();
    }
  }

  nextPage(){
    ++this.numPag;
    ++this.selectedPage;
    this.cargarDATA();
    
  }

  previusPage(){
    --this.numPag;
    --this.selectedPage;
    this.cargarDATA();
  }


  changePage(newPage: number): void {
    this.numPag = newPage;
    this.cargarDATA();
  }

  changeSort(field: string, direction: string): void {
    this.field = field;
    this.sortDirec = direction;
    this.cargarDATA();
  }


  

  changePageSize(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.cargarDATA();
  }

  closeModal(){
    this.isVisible=false;
    this.isEdit=false;
    this.detail=false;
  }
  openModal(){
    console.log("ABRIENDO REGISTRAr");
    this.isVisible=true;
    
  }


  
  deleteCompra(compraID:string){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Deseas eliminar la compra?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar compra',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.compraServ.deletePurchase(compraID).subscribe({
          next: (data) => {
            Swal.fire(
              '¡Eliminado!',
              'El registro de la compra fue eliminado',
              'success'
            );
            this.cargarDATA();
            
          },
          error: (err) => {
           Swal.fire('Vaya!','Parece que ocurrio un error intenta de nuevo')
          }
        });
        
        
      }
    });
  }


  verDetalles(compraID:string){
    this.compraID=compraID;
    this.detail=true;
    this.isVisible=true;
  }

  updateModal(document:string){
    console.log("UPDATED MODAL CLICKK");
    this.isVisible=true;
    this.isEdit=true;
    this.compraID=document;
  }

  openDetai(document:string){
    this.compraID=document;
    this.detail=true;
    this.isVisible=true;
  }



  transformarFecha(fecha: string): string {
    const fechaObjeto = new Date(fecha);
    const dia = fechaObjeto.getDate();
    const mes = fechaObjeto.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
    const año = fechaObjeto.getFullYear();
  
    // Formatear el día y el mes para que tengan dos dígitos
    const diaFormateado = dia < 10 ? `0${dia}` : dia.toString();
    const mesFormateado = mes < 10 ? `0${mes}` : mes.toString();
  
    // Construir la fecha en el formato corto
    const fechaCorta = `${año}-${mesFormateado}-${diaFormateado}`;
  
    return fechaCorta;
  }


}
