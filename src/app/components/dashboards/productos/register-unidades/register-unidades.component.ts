import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { UnidadesService } from '../../../../service/unidades.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-unidades',
  standalone: true,
  imports: [NgFor,NgIf,NgClass,FormsModule],
  templateUrl: './register-unidades.component.html',
  styleUrl: './register-unidades.component.css'
})
export class RegisterUnidadesComponent {
 
  constructor(private unitSer:UnidadesService){
    
  }
  
  ngOnInit(): void {
    if(this.isEdit){
      this.unitSer.getUnitById(this.unitID).subscribe({
        next: (data) => {
          this.unidad = data;
        },
        error: (error) => {}
      })
    }
   
  }

  description:string="";
  
  @Input() unitID!:number;
  @Input() isEdit!:boolean;
  @Input() detail!:boolean;
  @Output() registroExitoso = new EventEmitter<boolean>();

  unidad!:Unidad;

  onSubmit(){
    this.registrarRubro();
  }


  updateRubro(){

    this.unitSer.updateUnit(this.unidad.unit_id,this.unidad.description).subscribe(
      {
        next: (data) => {
          this.registroExitoso.emit(true);
          Swal.fire('Actualizado!!','La unidad de medida fue actualizado con exito','info')
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
    this.unitSer.registerUnit(this.description).subscribe({
      next: (data) => {
        this.registroExitoso.emit(true);
        Swal.fire('Registrado!!','La unidad de medida fue registrado con exito','success')
      },
      error: (err) => {
        Swal.fire('Vaya :( Lo sentimos, parece que ocurrio un error ',err.error.message,'error');
        console.log(err);
      }
    });

  }

}

interface Unidad{
  unit_id:number;
  description:string;
}
