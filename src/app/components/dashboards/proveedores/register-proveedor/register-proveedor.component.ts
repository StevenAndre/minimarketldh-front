import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedoresService } from '../../../../service/proveedores.service';
import { NgFor, NgIf } from '@angular/common';
import { RubrosService } from '../../../../service/rubros.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register-proveedor',
  standalone: true,
  imports: [FormsModule,NgFor,NgIf,ReactiveFormsModule],
  templateUrl: './register-proveedor.component.html',
  styleUrl: './register-proveedor.component.css'
})
export class RegisterProveedorComponent implements OnInit{

  @Input() proveedorID!:string;
  @Input() isEdit!:boolean;
  @Input() detail!:boolean;
  @Output() registroExitoso = new EventEmitter<boolean>();

  proveedorUp!:ProveedorUpdate;
  provUPdated!:ProveedorUPSend;
  proveedorForm: FormGroup;
  typeDocuments = [
    { id: 0, name: 'DNI' },
    { id: 1, name: 'RUC' },
  ];
  categorySuppliers:any;

  constructor(private fb: FormBuilder, private proveedorService: ProveedoresService,
    private rubroSer:RubrosService
  ) {
    this.proveedorForm = this.fb.group({
      document: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(11)]],
      name: ['', Validators.required],
      address: [''],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      email: ['', [Validators.required, Validators.email]],
      observation: [''],
      type_document: [null, Validators.required], // Utiliza el nombre de atributo de la interfaz Proveedor
      category_supplier: [null, Validators.required] // Utiliza el nombre de atributo de la interfaz Proveedor
    });
  }

  ngOnInit(): void {
      
    if(!this.isEdit){
      this.getRubros();
    }

      if(this.isEdit || this.detail){
        this.proveedorService.getProveedorByDocument(this.proveedorID).subscribe(
          {
            next: (data) =>{
              this.proveedorUp=data;
              console.log(data);
            },
            error: (error) => console.log(error)
          }
        );
      }


  }


  getRubros(){
    this.rubroSer.getAllCategorySupplier().subscribe({
      next: (data) =>{
        console.log(data);
        this.categorySuppliers = data;
      } ,
      error: (error) => console.log(error)
    });
  }


    updateProveedor(){

      
      console.log(this.proveedorUp.name);
      this.provUPdated={
        name:this.proveedorUp.name,
        observation:this.proveedorUp.observation,
        address:this.proveedorUp.address,
        phone:this.proveedorUp.phone,
        email:this.proveedorUp.email,
      }
      console.log("ACTUALIZANDAAAA");
  

      this.proveedorService.updateProveedor(this.proveedorID,this.provUPdated).subscribe({
        next: (data) => {
          this.registroExitoso.emit(true);
          Swal.fire('Actualizado!!','El proveedor fue actualizado con exito','info')
        },
        error: (err) => {
          Swal.fire('Vaya :( Lo sentimos, parece que ocurrio un error ',err.error.message,'error');
          console.log(err);
        }
      });

    }

  onSubmit(): void {
    if (this.proveedorForm.valid) {
      const newProveedor = this.proveedorForm.value;
      this.proveedorService.registrarProveedor(newProveedor).subscribe({
        next: (data) => {
          this.registroExitoso.emit(true);
          Swal.fire('Registrado!!','El nuevo proveedor fue registrado con exito','success')
        },
        error: (err) => {
          Swal.fire('Vaya :( Lo sentimos, parece que ocurrio un error ',err.error.message,'error');
          console.log(err);
        }
      });
    console.log(newProveedor);
    }
  }
}

interface ProveedorReg {
  document: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  observation: string;
  type_document: number;
  category_supplier: number;
}

interface ProveedorUpdate {
  document: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  observation: string;
  type_document: string;
  category_supplier: any;
}
class ProveedorUPSend {
  name: string="";
  address: string="";
  phone: string="";
  email: string="";
  observation: string="";
}
