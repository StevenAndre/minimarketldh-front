import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MarcasService } from '../../../../service/marcas.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-register-marcas',
  standalone: true,
  imports: [FormsModule,NgFor,NgIf,NgClass],
  templateUrl: './register-marcas.component.html',
  styleUrl: './register-marcas.component.css'
})
export class RegisterMarcasComponent {
  constructor(private marcaSer:MarcasService){
    
  }
  
  ngOnInit(): void {
    if(this.isEdit){
      this.marcaSer.getBrandById(this.brandID).subscribe({
        next: (data) => {
          this.marca = data;
        },
        error: (error) => {}
      })
    }
   
  }

  name:string="";
  
  @Input() brandID!:number;
  @Input() isEdit!:boolean;
  @Input() detail!:boolean;
  @Output() registroExitoso = new EventEmitter<boolean>();

  marca!:Marca;

  onSubmit(){
    this.registrar();
  }


  update(){

    this.marcaSer.updateBrand(this.marca.brand_id,this.marca.name).subscribe(
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
    this.marcaSer.registerBrand(this.name).subscribe({
      next: (data) => {
        this.registroExitoso.emit(true);
        Swal.fire('Registrado!!','La nueva Marca fue registrada con exito','success')
      },
      error: (err) => {
        Swal.fire('Vaya :( Lo sentimos, parece que ocurrio un error ',err.error.message,'error');
        console.log(err);
      }
    });

  }

}
interface Marca{
  brand_id:number,
  name:string,
  }