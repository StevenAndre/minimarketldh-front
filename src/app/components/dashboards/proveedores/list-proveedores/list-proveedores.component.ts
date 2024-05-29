import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../../service/proveedores.service';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RegisterProveedorComponent } from '../register-proveedor/register-proveedor.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-proveedores',
  standalone: true,
  imports: [FormsModule,NgIf,NgFor,RegisterProveedorComponent,NgClass],
  templateUrl: './list-proveedores.component.html',
  styleUrl: './list-proveedores.component.css'
})
export class ListProveedoresComponent implements OnInit{

  constructor(private proveedorServ:ProveedoresService){

  }
  proveedorID!:string;
  isEdit:boolean=false;
  detail:boolean=false;

  isVisible:boolean=false;
  selectedPage: number = 0;
  proveedores:Proveedor []=[];
  numPag: number = this.selectedPage;
  first!:boolean;
  from:number=1;
  numElements!:number;
  to!:number;
  last!:boolean;
  totalPages!:number;
  field: string = 'name';
  totalEmlements!:number;
  pageSize: number = 3;
  sortDirec: string = 'asc';
  ngOnInit(): void {

   // this.cargarDataGeneral();
    this.getProveedores();
    
  }



  selectPage(page: number): void {
    this.selectedPage = page;
    this.numPag=this.selectedPage;
    this.getProveedores();
  }

  get items(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  closeModalAndRefreshData(registroExitoso: boolean): void {
    if (registroExitoso) {
     this.closeModal(); // Cierra el modal
     this.getProveedores();
    }
  }

  nextPage(){
    ++this.numPag;
    ++this.selectedPage;
    this.getProveedores();
  }

  previusPage(){
    --this.numPag;
    --this.selectedPage;
    this.getProveedores();
  }


  getProveedores(): void {
    this.proveedorServ.getAllProveedores(this.numPag, this.field, this.pageSize, this.sortDirec).subscribe({
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
        this.proveedores=data.content;
        
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  // Métodos para cambiar la página, el campo de ordenamiento, el tamaño de la página, y la dirección de ordenamiento
  changePage(newPage: number): void {
    this.numPag = newPage;
    this.getProveedores();
  }

  changeSort(field: string, direction: string): void {
    this.field = field;
    this.sortDirec = direction;
    this.getProveedores();
  }


  cargarDataGeneral(){
    this.proveedorServ.getAllProeedores().subscribe({
      next: (data) => {
        console.log(data);
        this.proveedores=data;
      },
      error: (error) => {console.log(error);},
    });
  }

  changePageSize(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.getProveedores();
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

  deleteProveedor(document:string){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Deseas eliminar al proveedor?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar proveedor',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.proveedorServ.deleteProveedor(document).subscribe({
          next: (data) => {
            Swal.fire(
              '¡Eliminado!',
              'El registro del proveedor fue eliminado',
              'success'
            );
            this.getProveedores();
            console.log(data);
          },
          error: (err) => {
           Swal.fire('Vaya!','Parece que ocurrio un error intenta de nuevo')
          }
        });
        
        
      }
    });
  }

  updateModal(document:string){
    console.log("UPDATED MODAL CLICKK");
    this.isVisible=true;
    this.isEdit=true;
    this.proveedorID=document;
  }

  openDetai(document:string){
    this.proveedorID=document;
    this.detail=true;
    this.isVisible=true;
  }


}

class Proveedor{
  document: string="";
  name: string="";
  type_document: string="";
  address: string="";
  phone: string="";
  email: string="";
  observation: string="";
  category_supplier: any;
}
