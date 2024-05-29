import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoriasService } from '../../../../service/categorias.service';
import Swal from 'sweetalert2';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-categoria',
  standalone: true,
  imports: [NgIf,NgFor,FormsModule],
  templateUrl: './register-categoria.component.html',
  styleUrl: './register-categoria.component.css'
})
export class RegisterCategoriaComponent {
  constructor(private categ:CategoriasService){
    
  }
  
  ngOnInit(): void {
    if(this.isEdit){
      this.categ.getCategoryById(this.categoryID).subscribe({
        next: (data) => {
          this.categoria = data;
        },
        error: (error) => {}
      })
    }
   
  }

  name:string="";
  
  @Input() categoryID!:number;
  @Input() isEdit!:boolean;
  @Input() detail!:boolean;
  @Output() registroExitoso = new EventEmitter<boolean>();

  categoria!:Categoria;

  onSubmit(){
    this.registrar();
  }


  update(){

    this.categ.updateCategory(this.categoria.category_id,this.categoria.name).subscribe(
      {
        next: (data) => {
          this.registroExitoso.emit(true);
          Swal.fire('Actualizado!!','La categoria fue actualizado con exito','info')
        },
        error: (err) => {
          Swal.fire('Vaya :( Lo sentimos, parece que ocurrio un error ',err.error.message,'error');
          console.log(err);
        }
      }
    );

  }

  registrar(){

    console.log(this.name);
    this.categ.registerCategory(this.name).subscribe({
      next: (data) => {
        this.registroExitoso.emit(true);
        Swal.fire('Registrado!!','La nuevo categoria fue registrada con exito','success')
      },
      error: (err) => {
        Swal.fire('Vaya :( Lo sentimos, parece que ocurrio un error ',err.error.message,'error');
        console.log(err);
      }
    });

  }

}
interface Categoria{
  category_id:number,
  name:string,
  }