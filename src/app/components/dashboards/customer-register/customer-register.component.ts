import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConsultaSdocumentoService } from '../../../service/consulta-sdocumento.service';
import { CustomerService } from '../../../service/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-register',
  standalone: true,
  imports: [FormsModule,NgIf,NgFor,NgClass,ReactiveFormsModule],
  templateUrl: './customer-register.component.html',
  styleUrl: './customer-register.component.css'
})
export class CustomerRegisterComponent implements OnInit {
  
  @Output() registroExitoso = new EventEmitter<boolean>();
  clienteForm: FormGroup;
  nombreBotonConsul:string="RENIEC";
  isRUC:boolean=false;
  typeDocuments = [
    { id: 0, name: 'DNI' },
    { id: 1, name: 'RUC' },
  ];
  constructor(private fb: FormBuilder,
     private consultas:ConsultaSdocumentoService,
    private clienteServ:CustomerService){

      this.clienteForm = this.fb.group({
        document: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(11)]],
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        address: [''],
        phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
        email: ['', [Validators.required, Validators.email]],
        observation: [''],
        type_document: [null, Validators.required], 
        company_name: [''],
        gender: [null, Validators.required], 
      });

     }
  
  ngOnInit(): void {
   
  }
  selectedTab: string = 'Datos de Cliente';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }


  consultarDatos(){

    let document = this.clienteForm.get('document')?.value;
    if(!this.isRUC){
      this.consultas.consultarDNI(document).subscribe({
        next: (response) => {
          let apellidos=`${response.apellidoPaterno} ${response.apellidoMaterno}`
          this.clienteForm.get('name')?.setValue(response.nombres);
          this.clienteForm.get('lastname')?.setValue(apellidos);
        },
        error:err=>console.log(err)
      });
    }else {
      this.consultas.consultarRUC(document).subscribe({
        next: (response) => {
          let name=response.razonSocial
          let address=response.direccion
          this.clienteForm.get('company_name')?.setValue(name);
          this.clienteForm.get('address')?.setValue(address);
        },
        error:err=>console.log(err)
      });
    }

  }



  onTypeDocumentChange(event:any){
    let tipo=event.target.value
    this.clienteForm.get('name')?.setValue("");
    this.clienteForm.get('document')?.setValue("");
    this.clienteForm.get('address')?.setValue("");
    this.clienteForm.get('lastname')?.setValue("");
    if(tipo==0){
      this.nombreBotonConsul="RENIEC";
      this.isRUC=false;
    }else if(tipo==1){
      this.nombreBotonConsul="SUNAT";
      this.isRUC=true;
    }


  }

  submitForm(){

    if (this.clienteForm.valid) {
    console.log(this.clienteForm.value)
    let cliente=this.clienteForm.value;
       this.clienteServ.guardarCliente(cliente).subscribe({
    next: (response) => {
      Swal.fire('Registrado!!','El nuevo cliente fue registrado con exito','success')
      this.registroExitoso.emit(true);
    },
    error:err=>{
      Swal.fire('Vaya :( Lo sentimos, parece que ocurrio un error ',err.error.message,'error');
      console.log(err);
    }
  });
    }else{
      Swal.fire('Vaya!','Parece que los campos no estan correctamente llenados','warning');
    }

  }

  cancel() {
    // Logic to handle cancellation
    this.registroExitoso.emit(true);
    console.log('Cancel button clicked');
  }
}
