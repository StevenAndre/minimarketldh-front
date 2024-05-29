import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarcasService } from '../../../../service/marcas.service';
import Swal from 'sweetalert2';
import { RegisterMarcasComponent } from '../register-marcas/register-marcas.component';

@Component({
  selector: 'app-list-marcas',
  standalone: true,
  imports: [FormsModule,NgIf,NgFor,NgClass,RegisterMarcasComponent],
  templateUrl: './list-marcas.component.html',
  styleUrl: './list-marcas.component.css'
})
export class ListMarcasComponent {
  isEdit:boolean=false;
  brandID!:number;
  isVisible:boolean=false;
  selectedPage: number = 0;
  numPag: number = this.selectedPage;
  first!:boolean;
  from:number=1;
  to!:number;
  last!:boolean;
  totalPages!:number;
  numElements!:number;
  field: string = 'name';
  totalEmlements!:number;
  pageSize: number = 3;
  sortDirec: string = 'asc';
  marcas:Marca[]=[]


  constructor(private marcaSer:MarcasService){

  }
  
  ngOnInit(): void {

    this.cargarData();

  }


  cargarData(){
    this.marcaSer.getAllBrandsPaginated(this.numPag, this.field, this.pageSize, this.sortDirec).subscribe({
      next: (data:any) => {
        this.pageSize=data.size;
        this.numElements=data.numberOfElements;
        this.totalEmlements=data.totalElements;
        this.from=data.first?1:(this.pageSize*this.numPag)+1;
        this.to=this.numElements+this.from-1;
        this.first=data.first;
        this.totalPages=data.totalPages;
        this.last=data.last;
        console.log(data);
        this.marcas=data.content;
        
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  
  selectPage(page: number): void {
    this.selectedPage = page;
    this.numPag=this.selectedPage;
    this.cargarData();
    
  }

  get items(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }


  nextPage(){
    ++this.numPag;
    ++this.selectedPage;
    this.cargarData();
  }

  previusPage(){
    --this.numPag;
    --this.selectedPage;
    this.cargarData();
  }

  openModal(){
    this.isVisible=true;
  }

  closeModal(){
    this.isVisible=false;
    this.isEdit=false;
  }

  closeModalAndRefreshData(registroExitoso: boolean): void {
    if (registroExitoso) {
      console.log("REGISTRO EXITOSOS");
     this.closeModal(); 
     this.cargarData();
    }
  }

  editModal(id:number){
    this.brandID=id;
    this.isVisible=true;
    this.isEdit=true;
  }

  deleteRubro(id:number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Deseas eliminar la Marca?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar Marca',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.marcaSer.deleteBrand(id).subscribe({
          next: (data) => {
            Swal.fire(
              '¡Eliminado!',
              'El registro de la Marca fue eliminado',
              'success'
            );
            this.cargarData();
            console.log(data);
          },
          error: (err) => {
           Swal.fire('Vaya!','Parece que ocurrio un error intenta de nuevo')
          }
        });
        
        
      }
    });
  }



}

interface Marca{
brand_id:number,
name:string,
}

