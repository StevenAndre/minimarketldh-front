import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedoresService } from '../../../../service/proveedores.service';
import { NgFor, NgIf } from '@angular/common';
import { RubrosService } from '../../../../service/rubros.service';
import Swal from 'sweetalert2';
import { ConsultaSdocumentoService } from '../../../../service/consulta-sdocumento.service';


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

  tipoDoc!:number;
  proveedorUp!:ProveedorUpdate;
  provUPdated!:ProveedorUPSend;
  proveedorForm: FormGroup;
  nombreBotonConsult:string="SUNAT";
  typeDocuments = [
    { id: 0, name: 'DNI' },
    { id: 1, name: 'RUC' },
  ];
  categorySuppliers:any;

  constructor(private fb: FormBuilder, private proveedorService: ProveedoresService,
    private rubroSer:RubrosService,
    private consultas:ConsultaSdocumentoService
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

  consultarDocumento(){
    let document = this.proveedorForm.get('document')?.value;
    if(this.tipoDoc==0){

      this.consultas.consultarDNI(document).subscribe({
        next:(data)=>{
          console.log(data);
          let name=`${data.nombres} ${data.apellidoPaterno} ${data.apellidoMaterno}`
          this.proveedorForm.get('name')?.setValue(name);
        },
        error:err=>console.log(err)
      });
    }else if(this.tipoDoc==1){
      this.consultas.consultarRUC(document).subscribe({
        next:(data)=>{
          console.log(data);
          let name=data.razonSocial
          let address=data.direccion
          this.proveedorForm.get('name')?.setValue(name);
          this.proveedorForm.get('address')?.setValue(address);
        },
        error:err=>console.log(err)
      });
    }


    
  }

  onTypeDocumentChange(event:any){
    let tipo=event.target.value
    this.tipoDoc=tipo;
    this.proveedorForm.get('name')?.setValue("");
    this.proveedorForm.get('document')?.setValue("");
    this.proveedorForm.get('address')?.setValue("");
    if(tipo==0){
      this.nombreBotonConsult="RENIEC";
      console.log("CAMBIANDO NOBRE BOTN:"+this.nombreBotonConsult);
    }else if(tipo==1){
      this.nombreBotonConsult="SUNAT";
      console.log("CAMBIANDO NOBRE BOTN:"+this.nombreBotonConsult);
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
