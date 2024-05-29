import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { UnidadesService } from '../../../../service/unidades.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterUnidadesComponent } from '../register-unidades/register-unidades.component';

@Component({
  selector: 'app-list-unidades',
  standalone: true,
  imports: [NgFor,NgIf,NgClass,FormsModule,RegisterUnidadesComponent],
  templateUrl: './list-unidades.component.html',
  styleUrl: './list-unidades.component.css'
})
export class ListUnidadesComponent {

  isEdit:boolean=false;
  unitID!:number;
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
  unidades:Unidad[]=[]


  constructor(private unitSer:UnidadesService){

  }
  
  ngOnInit(): void {

    this.cargarData();

  }


  cargarData(){
    this.unitSer.getAllUnitsPaginated(this.numPag, this.field, this.pageSize, this.sortDirec).subscribe({
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
        this.unidades=data.content;
        
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
    this.unitID=id;
    this.isVisible=true;
    this.isEdit=true;
  }

  deleteRubro(id:number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Deseas eliminar la unidad de medida ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar la unidad de medida ',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.unitSer.deleteUnit(id).subscribe({
          next: (data) => {
            Swal.fire(
              '¡Eliminado!',
              'El registro de la unidad de medida  fue eliminado',
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


class Unidad{
  unit_id:number=0;
  description:string="";
}