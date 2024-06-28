import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, inject, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConsultaSdocumentoService } from '../../../../service/consulta-sdocumento.service';
import { CustomerService } from '../../../../service/customer.service';
import { CustomerRegisterComponent } from '../../customer-register/customer-register.component';
import { ProductosService } from '../../../../service/productos.service';
import { SunatService } from '../../../../service/sunat.service';
import { Invoice, InvoiceLine } from '../../../../models/DataVenta';
import { NumeroALetras } from '../../../../service/numeroToLetras';


@Component({
  selector: 'app-registro-ventas',
  standalone: true,
  imports: [FormsModule,NgClass,NgIf,ReactiveFormsModule,NgFor,
    CustomerRegisterComponent
  ],
  templateUrl: './registro-ventas.component.html',
  styleUrl: './registro-ventas.component.css'
})
export class RegistroVentasComponent implements OnInit {

  consDoc=inject(ConsultaSdocumentoService)
  clienteServ=inject(CustomerService);
  productServ=inject(ProductosService);
  sunatServ=inject(SunatService);
  clienteName:string="";
  clientedOCUMENTO="";
 
  isVisible:boolean=false;
  ventaForm: FormGroup;
  maxLengthDocument!:number;
  showDropdown: boolean = false;
  fechaHoy!: string;
  fechaCredito!: string;
  productAll!:Product[];
  productFilter!:Product[];
  now = new Date();
  productsCar:ProductCar[]=[];
  items:Item[]=[];
  paymentsList:Payment[]=[];

  ItemsVenta:InvoiceLine[]=[];

  comprobantes=[
    {id:0, name:'Boleta'},
    {id:1, name:'Factura'},
  ];

  tipoPago=[
    {id:0, name:'Contado'},
    {id:1, name:'Credito'},
    {id:2, name:'Credito a cuotas'},
  ]

  tipoPagoLabel:string="";

  metodoPago=[
    {id:0, name:'Efectivo'},
    {id:1, name:'Tarjeta'},
    {id:2, name:'Yape'},
    {id:3, name:'Plin'},
  ]

  payments:Pago[]=[
    {
      metodo:0,
      monto:0.0,
      fecha:new Date()
    }
  ];
  clienteDireccion: string="";



  addPago(){
    this.payments.push(
      {fecha:new Date(),
        metodo:0,
        monto:0.0
      }
    )
    this.calcularRepartido()
    console.log(JSON.stringify(this.payments));
  }
  
  deletePago(i:number){
    this.payments.splice(i,1);
    this.calcularRepartido()
  }

  documentos=[
    {id:0, name:'DNI'},
    {id:1, name:'RUC'},
  ];

  comprobanteID:number=0;
  documentoID:number=0;
  numDocumento!:number;
  total:number=0;
  tipoDocumento!:number;
  tipoPagoID:number=0;
  ngOnInit(): void { 

    this.productServ.getAllProducts().subscribe({
      next: (data) => {
        this.productAll = data;
        console.log(data);
        this.productAll.forEach(
          (p)=>{
            if(p.image!==null){
              this.productServ.getProductImage(p.image).subscribe({
                next: (imagen) => {
                  p.pathImage=URL.createObjectURL(imagen);
                }
              });
            }else{
              p.pathImage='../../../../../assets/images/noimagen.png'
            }
          }
        );
        this.productFilter=this.productAll;
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  constructor(private fb: FormBuilder) {
    this.total.toFixed(2)
    this.ventaForm = this.fb.group({
      type_voucher: [null,Validators.required],
      serie:[null,Validators.required],
      number:[null,Validators.required],
      opening:[null],
      documentoSelect:[null],
      customer:[null,Validators.required],
      type_payment:[null],
      payments:[null],
      items:[null],
      observation:[null],
      status:[null],
      issue_date:[null],
      due_date:[null]

    });

    this.fechaHoy = this.formatDate(this.now);
    this.fechaCredito = this.formatDate(new Date(this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()));


  }

  formatDate(date: Date): string {
   
    return date.toISOString().split('T')[0];
  }

  serie:string="";
  numero:string="";
  tipoComporbante:string="";

  consultarLastNumber(){

    let type=this.comprobanteID==0?"03":"01";
    let serie=this.comprobanteID==0?"B001":"F001";
    this.serie=serie;
    this.tipoComporbante=type;
    this.schemaID=this.comprobanteID==0?"01":"06";
   

    this.sunatServ.obtenerLastNumber(type,serie).subscribe({
      next: (data) => {
        console.log(data);
        let lastNumber=data.suggestedNumber;
        console.log(lastNumber);
        this.ventaForm.get('number')?.setValue(lastNumber);
        this.numero=lastNumber;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  comprobanteSeleccionado(event: Event): void {
    const itemSelected = event.target as HTMLSelectElement;
    this.comprobanteID=Number(itemSelected.value)
    
    this.ventaForm.get('documentoSelect')?.setValue(this.comprobanteID);
    this.ventaForm.get('serie')?.setValue(this.comprobanteID==0?'B001':'F001');
    this.maxLengthDocument=this.comprobanteID==0?8:11;
    this.consultarLastNumber();

  }

  tipoPagoSeleccionado(event:Event){
    const itemSelected=event.target as HTMLSelectElement;
    this.tipoPagoID=Number(itemSelected.value)
    this.tipoPagoLabel=this.tipoPagoID==0?"Contado":this.tipoPagoID==1?"Credito":"Credito a cuotas";

    this.payments=[
      {
        metodo:0,
        monto:0.0,
        fecha:new Date()
      }
    ];
    this.calcularRepartido();
  }

  documentoSeleccionado(event: Event): void {
    const itemSelected = event.target as HTMLSelectElement;
  
    this.documentoID=Number(itemSelected.value)
    this.ventaForm.get('type_voucher')?.setValue(this.documentoID);
    this.ventaForm.get('serie')?.setValue(this.documentoID==0?'B001':'F001');
    this.maxLengthDocument=this.documentoID==0?8:11;
    this.consultarLastNumber();
  }

  condicionPagoSelected(event: Event): void {
    const itemSelected = event.target as HTMLSelectElement;
    this.comprobanteID=Number(itemSelected.value);
    
  }


  
  consultarDocumento(event:Event){

    const input = event.target as HTMLInputElement;
    let inputValue = input.value;
    
    if (inputValue.length === 8 && this.comprobanteID==0) {
    
      this.clienteServ.getClienteByDocument(inputValue).subscribe({
        next: (data) => {
          console.log(data);
          this.clienteName=`${data.name} ${data.lastname}`;
          this.clienteDireccion=data.address;
          console.log(this.clienteName);
        }
      });
      
    }else if (inputValue.length === 11 && this.comprobanteID==1){

      this.clienteServ.getClienteByDocument(inputValue).subscribe({
        next: (data) => {
          console.log(data);
          this.clienteName=data.company_name;
          this.clienteDireccion=data.address;
          console.log(this.clienteName);
        }
      });
      
    
    }


  }

  openModal(){
    this.isVisible=true;
  }

  closeModal(){
    this.isVisible=false;
  }



  onInputFocus() {
    this.showDropdown = true;
  }

  outFocus(){
    setTimeout(() => {
      this.showDropdown = false;
    }, 250);
  }

  filtrarProductos(event:Event){
    const input = event.target as HTMLInputElement;
    let inputValue = input.value;

    this.productFilter = this.productAll.filter(p=>p.name.toLowerCase().includes(inputValue.toLowerCase())  );

  }


  descuentoPrecio(p:ProductCar){

    let descuento = p.descuento/100;
    p.price=p.price-(p.price*descuento);
    this.calcularTOTAL();
    this.calcularRepartido();
  }


  addCantidad(p:ProductCar){
    p.quantity=p.quantity+1;
    this.calcularTOTAL();
    this.calcularRepartido();
  }

  changeCantidad(event:Event,p:ProductCar){
    const input = event.target as HTMLInputElement;
    let inputValue =parseInt(input.value) ;
    p.quantity=inputValue;
    this.calcularTOTAL();
    this.calcularRepartido();
  }

  restCantidad(p:ProductCar){

    if(p.quantity>1){
      p.quantity=p.quantity-1;
    }

    this.calcularTOTAL();
    this.calcularRepartido();
  }



  calcularTOTAL(){
    let totalA=0;
    this.productsCar.forEach(
      p=>{
        totalA+=p.quantity*p.price;
      }
    );
    this.total=totalA;
  }

  calcularRepartido(){

    let totalFinal=this.total+(this.total*0.18)
    this.payments.forEach(p=>{
     p.monto=(totalFinal)/(this.payments.length)
    });
  }


  removeProductCar(p:ProductCar){
    this.productsCar=this.productsCar.filter(pro=>pro!==p);
    this.calcularTOTAL();
    this.calcularRepartido();
  }
  addProduc(producto:Product){

    if(this.productsCar.some(p=>p.cod_product===producto.cod_product)){
      const index = this.productsCar.findIndex(objeto => objeto.cod_product === producto.cod_product);

      if (index !== -1) {
   
      this.productsCar[index].quantity++;
     
      }
    }else{

      let pCar:ProductCar={
        cod_product:producto.cod_product,
        name:producto.name,
        price:producto.price,
        descuento:0,
        quantity:1,
        subtotal:0,
        pathImage:producto.pathImage
      };
      
      this.productsCar.push(pCar);
      this.calcularTOTAL();
      this.calcularRepartido();
    }
   
   

  }


  fechaVenta:string="";
  horaVenta:string="";
  fechaExpiracionVenta:string="";
  schemaID:string="06";
  totalGeneral:number=0;
   roundToTwoDecimals(number: number): number {
    return Math.round((number + Number.EPSILON) * 100) / 100;
}
  registrarVenta(){

    let type=this.comprobanteID==0?"03":"01";
    let serie=this.comprobanteID==0?"B001":"F001";
    this.serie=serie;
    this.tipoComporbante=type;
    this.schemaID=this.comprobanteID==0?"01":"06";

    console.log("SERIE:"+this.serie);
    console.log(this.tipoComporbante);
    console.log(this.schemaID);
   
   this.processDate();
   this.totalGeneral=this.total+(this.total*0.18);
   this.clientedOCUMENTO=this.ventaForm.get('customer')?.value;
    
    this.payments.forEach(p=>{
      let pay:Payment={
        payment_method:p.metodo,
        payment_status:0,
        amount:p.monto,
        date:p.fecha
      }

      this.paymentsList.push(pay);
    });

    this.productsCar.forEach(p=>{
      let ite:Item={
        product:p.cod_product,
        quantity:p.quantity,
        sale_price:p.price,
      }
      this.items.push(ite);
    })


    this.ventaForm.patchValue({
      opening: '',
      items: this.items,
      payments:this.paymentsList,
      observation: 'Sin observaciones', 
      status: 0, 
    });
    let i=0;
    this.productsCar.forEach(p=>{
      i++;
      this.ItemsVenta.push(
        {
          "cbc:ID": {
              "_text": i
          },
          "cbc:InvoicedQuantity": {
              "_attributes": {
                  "unitCode": "NIU"
              },
              "_text": p.quantity // Debes asignar la cantidad facturada aquí
          },
          "cbc:LineExtensionAmount": {
              "_attributes": {
                  "currencyID": "PEN"
              },
              "_text": this.roundToTwoDecimals((p.price*p.quantity)) // Debes asignar el monto de la línea aquí
          },
          "cac:PricingReference": {
              "cac:AlternativeConditionPrice": {
                  "cbc:PriceAmount": {
                      "_attributes": {
                          "currencyID": "PEN"
                      },
                      "_text": this.roundToTwoDecimals((p.price+(p.price*0.18))) // Debes asignar el precio aquí
                  },
                  "cbc:PriceTypeCode": {
                      "_text": "01"
                  }
              }
          },
          "cac:TaxTotal": {
              "cbc:TaxAmount": {
                  "_attributes": {
                      "currencyID": "PEN"
                  },
                  "_text": this.roundToTwoDecimals((p.price*0.18)*p.quantity) // Debes asignar el monto del impuesto aquí
              },
              "cac:TaxSubtotal": [
                  {
                      "cbc:TaxableAmount": {
                          "_attributes": {
                              "currencyID": "PEN"
                          },
                          "_text": this.roundToTwoDecimals((p.price*p.quantity)) // Debes asignar el monto imponible aquí
                      },
                      "cbc:TaxAmount": {
                          "_attributes": {
                              "currencyID": "PEN"
                          },
                          "_text": this.roundToTwoDecimals((p.price*0.18)*p.quantity) // Debes asignar el monto del impuesto aquí
                      },
                      "cac:TaxCategory": {
                          "cbc:Percent": {
                              "_text": 18
                          },
                          "cbc:TaxExemptionReasonCode": {
                              "_text": "10"
                          },
                          "cac:TaxScheme": {
                              "cbc:ID": {
                                  "_text": "1000"
                              },
                              "cbc:Name": {
                                  "_text": "IGV"
                              },
                              "cbc:TaxTypeCode": {
                                  "_text": "VAT"
                              }
                          }
                      }
                  }
              ]
          },
          "cac:Item": {
              "cbc:Description": {
                  "_text": p.name // Debes asignar la descripción del producto aquí
              }
          },
          "cac:Price": {
              "cbc:PriceAmount": {
                  "_attributes": {
                      "currencyID": "PEN"
                  },
                  "_text": this.roundToTwoDecimals(p.price) // Debes asignar el precio aquí
              }
          }
      }
      );


      
     


    });

    this.factura={
      personaId: "6670c2bab98c560015b1bae5",
      personaToken: "DEV_0JPbuTvNtCJDPliltLdhOqNuB8TD1DZnJAHrRbvptigBXXQtZht5XIN3sjKH5WAC", // Debes asignar tu personaToken aquí
      fileName: `10111213141-${this.tipoComporbante}-${this.serie}-${this.numero}`, // Debes asignar el nombre del archivo aquí
      documentBody: {
          "cbc:UBLVersionID": {
              "_text": "2.1"
          },
          "cbc:CustomizationID": {
              "_text": "2.0"
          },
          "cbc:ID": {
              "_text": `${this.serie}-${this.numero}` // Debes asignar el ID de la factura aquí
          },
          "cbc:IssueDate": {
              "_text": this.fechaVenta // Debes asignar la fecha de emisión aquí
          },
          "cbc:IssueTime": {
              "_text": this.horaVenta // Debes asignar la hora de emisión aquí
          },
          "cbc:DueDate": {
              "_text": this.fechaExpiracionVenta // Debes asignar la fecha de vencimiento aquí
          },
          "cbc:InvoiceTypeCode": {
              "_attributes": {
                  "listID": "0101"
              },
              "_text": `${this.tipoComporbante}`
          },
          "cbc:Note": [
              {
                  "_text": NumeroALetras.NumeroALetras(this.totalGeneral, {
                    plural: "SOLES",
                    singular: "SOL",
                    centPlural: "CENTAVOS",
                    centSingular: "CENTAVO"
                }), // Debes asignar el texto de la nota aquí
                  "_attributes": {
                      "languageLocaleID": "1000"
                  }
              }
          ],
          "cbc:DocumentCurrencyCode": {
              "_text": "PEN"
          },
          "cac:AccountingSupplierParty": {
              "cac:Party": {
                  "cac:PartyIdentification": {
                      "cbc:ID": {
                          "_attributes": {
                              "schemeID": "6"
                          },
                          "_text": "10111213141"
                      }
                  },
                  "cac:PartyLegalEntity": {
                      "cbc:RegistrationName": {
                          "_text": "Minimarket Los dos hermanitos"
                      },
                      "cac:RegistrationAddress": {
                          "cbc:AddressTypeCode": {
                              "_text": "0000"
                          }
                      }
                  }
              }
          },
          "cac:AccountingCustomerParty": {
              "cac:Party": {
                  "cac:PartyIdentification": {
                      "cbc:ID": {
                          "_attributes": {
                              "schemeID": this.schemaID
                          },
                          "_text": this.clientedOCUMENTO // Debes asignar el ID del cliente aquí
                      }
                  },
                  "cac:PartyLegalEntity": {
                      "cbc:RegistrationName": {
                          "_text": this.clienteName // Debes asignar el nombre del cliente aquí
                      },
                      "cac:RegistrationAddress": {
                          "cac:AddressLine": {
                              "cbc:Line": {
                                  "_text": this.clienteDireccion // Debes asignar la dirección del cliente aquí
                              }
                          }
                      }
                  }
              }
          },
          "cac:TaxTotal": {
              "cbc:TaxAmount": {
                  "_attributes": {
                      "currencyID": "PEN"
                  },
                  "_text": this.roundToTwoDecimals((this.total * 0.18)) // Debes asignar el monto del impuesto aquí
              },
              "cac:TaxSubtotal": [
                  {
                      "cbc:TaxableAmount": {
                          "_attributes": {
                              "currencyID": "PEN"
                          },
                          "_text": this.total // Debes asignar el monto imponible aquí
                      },
                      "cbc:TaxAmount": {
                          "_attributes": {
                              "currencyID": "PEN"
                          },
                          "_text": this.roundToTwoDecimals((this.total * 0.18) ) // Debes asignar el monto del impuesto aquí
                      },
                      "cac:TaxCategory": {
                          "cac:TaxScheme": {
                              "cbc:ID": {
                                  "_text": "1000"
                              },
                              "cbc:Name": {
                                  "_text": "IGV"
                              },
                              "cbc:TaxTypeCode": {
                                  "_text": "VAT"
                              }
                          }
                      }
                  }
              ]
          },
          "cac:LegalMonetaryTotal": {
              "cbc:LineExtensionAmount": {
                  "_attributes": {
                      "currencyID": "PEN"
                  },
                  "_text": this.roundToTwoDecimals(this.total) // Debes asignar el monto de la línea aquí
              },
              "cbc:TaxInclusiveAmount": {
                  "_attributes": {
                      "currencyID": "PEN"
                  },
                  "_text": this.roundToTwoDecimals(this.totalGeneral) // Debes asignar el monto con impuestos aquí
              },
              "cbc:PayableAmount": {
                  "_attributes": {
                      "currencyID": "PEN"
                  },
                  "_text": this.roundToTwoDecimals(this.totalGeneral) // Debes asignar el monto a pagar aquí
              }
          },
          "cac:PaymentTerms": [
              {
                  "cbc:ID": {
                      "_text": "FormaPago"
                  },
                  "cbc:PaymentMeansID": {
                      "_text": this.tipoPagoLabel
                  }
              }
          ],
          "cac:InvoiceLine":this.ItemsVenta
      }
  };

  
  this.sunatServ.enviarDatasunat(this.factura);

    console.log("IMPRIMEINDO DATA PA VENTA  SUNAT:"+JSON.stringify( this.factura));


    console.log(this.ventaForm.value);
  }


  processDate(): void {
    const dateE = this.ventaForm.get('issue_date');
    const dateV = this.ventaForm.get('due_date');
    if (dateE) {
      const dateValue = dateE.value; // Aquí obtienes el valor del campo
      const date = new Date(dateValue);

      // Obtener solo la fecha en formato 'yyyy-MM-dd'
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      console.log('Fecha:', formattedDate);
      this.fechaVenta=formattedDate;
      // Obtener solo la hora en formato 'HH:mm:ss'
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      console.log('Hora:', formattedTime);
      this.horaVenta=formattedTime;
    }
    if (dateV) {
      const dateValue = dateV.value; // Aquí obtienes el valor del campo
      const date = new Date(dateValue);

      // Obtener solo la fecha en formato 'yyyy-MM-dd'
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      console.log('Fecha:', formattedDate);

      // Obtener solo la hora en formato 'HH:mm:ss'
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      console.log('Hora:', formattedTime);
      this.fechaExpiracionVenta=formattedDate;
    }

  }



  // public convertNumberToWords(amount: number): string {
  //   const entero = Math.floor(amount);
  //   const decimal = Math.round((amount - entero) * 100);
  //   const enteroTexto = numeroALetras(entero);
  //   const decimalTexto = decimal.toString().padStart(2, '0');
  //   return `${enteroTexto} CON ${decimalTexto}/100 SOLES`.toUpperCase();
  // }





  //Data para venta api sunat:
   factura!: Invoice; 











}


interface Pago{
  metodo:number;
  monto:number;
  fecha:Date
}

interface ProductCar {
  cod_product: string;
  name: string;
  pathImage:string;
  price: number;
  quantity: number;
  descuento:number;
  subtotal: number;
}

 interface Product {
  cod_product: string;
  name: string;
  description: string;
  stock:number;
  image: string;
  pathImage:string;
  price: number;
  category: any;
  brand: any;
  unit: any;
}

interface Payment{
  payment_method:number;
  amount:number;
  date:Date;
  payment_status:number;
}


interface Item{
  product:string;
  quantity:number;
  sale_price:number;
} 


