import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RubrosService } from '../../../../service/rubros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-rubro',
  standalone: true,
  imports: [NgFor,FormsModule,NgIf],
  templateUrl: './registrar-rubro.component.html',
  styleUrl: './registrar-rubro.component.css'
})
export class RegistrarRubroComponent implements OnInit{
  
  constructor(private rubroServ:RubrosService){
    
  }
  
  ngOnInit(): void {
    if(this.isEdit){
      this.rubroServ.getCategorySupplierById(this.rubroID).subscribe({
        next: (data) => {
          this.rubro = data;
        },
        error: (error) => {}
      })
    }
   
  }

  description:string="";
  
  @Input() rubroID!:number;
  @Input() isEdit!:boolean;
  @Input() detail!:boolean;
  @Output() registroExitoso = new EventEmitter<boolean>();

  rubro!:Rubro;

  onSubmit(){
    this.registrarRubro();
  }


  updateRubro(){

    this.rubroServ.updateCategorySupplier(this.rubro.id,this.rubro.description).subscribe(
      {
        next: (data) => {
          this.registroExitoso.emit(true);
          Swal.fire('Actualizado!!','El rubro fue actualizado con exito','info')
        },
        error: (err) => {
          Swal.fire('Vaya :( Lo sentimos, parece que ocurrio un error ',err.error.message,'error');
          console.log(err);
        }
      }
    );

  }

  registrarRubro(){

    console.log(this.description);
    this.rubroServ.registerCategorySupplier(this.description).subscribe({
      next: (data) => {
        this.registroExitoso.emit(true);
        Swal.fire('Registrado!!','El nuevo proveedor fue registrado con exito','success')
      },
      error: (err) => {
        Swal.fire('Vaya :( Lo sentimos, parece que ocurrio un error ',err.error.message,'error');
        console.log(err);
      }
    });

  }

}

interface Rubro{
  id:number;
  description:string;
}
