import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RubrosService } from '../../../../service/rubros.service';
import { RegistrarRubroComponent } from '../registrar-rubro/registrar-rubro.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-rubros',
  standalone: true,
  imports: [FormsModule,NgIf,NgFor,NgClass,RegistrarRubroComponent],
  templateUrl: './list-rubros.component.html',
  styleUrl: './list-rubros.component.css'
})
export class ListRubrosComponent  implements OnInit{
  
  isEdit:boolean=false;
  rubroID!:number;
  isVisible:boolean=false;
  selectedPage: number = 0;
  numPag: number = this.selectedPage;
  first!:boolean;
  from:number=1;
  to!:number;
  last!:boolean;
  totalPages!:number;
  numElements!:number;
  field: string = 'description';
  totalEmlements!:number;
  pageSize: number = 3;
  sortDirec: string = 'asc';
  rubros:Rubro[]=[]


  constructor(private rubroSer:RubrosService){

  }
  
  ngOnInit(): void {

    this.cargarData();

  }


  cargarData(){
    this.rubroSer.getAllCategorySuppliersPaginated(this.numPag, this.field, this.pageSize, this.sortDirec).subscribe({
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
        this.rubros=data.content;
        
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
    this.rubroID=id;
    this.isVisible=true;
    this.isEdit=true;
  }

  deleteRubro(id:number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Deseas eliminar al rubro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar rubro',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.rubroSer.deleteCategorySupplier(id).subscribe({
          next: (data) => {
            Swal.fire(
              '¡Eliminado!',
              'El registro del rubro fue eliminado',
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


class Rubro{
  id:number=0;
  description:string="";
}