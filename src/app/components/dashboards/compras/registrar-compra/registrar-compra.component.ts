import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProveedoresService } from '../../../../service/proveedores.service';
import { ProductosService } from '../../../../service/productos.service';
import { LoginRegisterServiceService } from '../../../../service/login-register-service.service';
import { UserDto } from '../../list-users/list-users.component';
import { ComprasService } from '../../../../service/compras.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-compra',
  standalone: true,
  imports: [NgFor,NgIf,NgClass,FormsModule],
  templateUrl: './registrar-compra.component.html',
  styleUrl: './registrar-compra.component.css'
})
export class RegistrarCompraComponent implements OnInit{


  @Output() registroExitoso = new EventEmitter<boolean>();
  @Input() detail!:boolean;
  @Input()compraID!:string;

buscar:string="";

  description!:string;

  subtotalCAR:number=0;
  totalCAR:number=0;;
  IGV:number=0;

  selectedSupplier!: string;
  selectedPaymentType!: number;
  
  productoSend!:ProductoCar;
  productosCAR:ProductoCar[]=[];
  precioCompra:number=0.0;
  cantidad:number=0;
  productos:Product[]=[];
  proveedores:Proveedor[]=[];
  roveedorID!:string;
  subtotalA=this.cantidad*this.precioCompra;
  isEdit:boolean=false;
  
  isVisible:boolean=false;
  selectedPage: number = 0;
  numPag: number = this.selectedPage;
  first!:boolean;
  from:number=1;
  numElements!:number;
  to!:number;
  last!:boolean;
  totalPages!:number;
  field: string = 'description';
  totalEmlements!:number;
  pageSize: number = 1;
  sortDirec: string = 'asc';
  user!:UserDto;
  itemsP:Item[]=[];

  constructor(private proveedorSer:ProveedoresService,
    private porductoService:ProductosService,
    private userService:LoginRegisterServiceService,
    private compraServ:ComprasService
  ){

  }
  ngOnInit(): void {
   this.cargarProveedores();
   this.cargarProductos();
   this.userService.getUSerActual().subscribe(
    {
      next: (data) => {
        this.user=data;
        console.log(this.user);
      },
      error: (err) => {
        console.log(err);
      }
    }
   );
  }

  typeDPayment = [
    { id: 0, name: 'EFECTIVO' },
    { id: 1, name: 'TARJETA' },
  ];
  calcularIGV(valorTotal: number): number {
    const tasaIGV = 0.18; // 18%
    const igv = valorTotal * tasaIGV;
    return igv;
}

  subirCantidad(){
    console.log("subeundo")
    this.subtotalA=this.cantidad*this.precioCompra;
    ++this.cantidad;
  }

  bajarCantidad(){
    console.log("bajando")
    if(this.cantidad>0){
      this.subtotalA=this.cantidad*this.precioCompra;
      --this.cantidad;
     
    }
  }

  onPrecioChange(event: any) {
    if (event.target && event.target.value) {
      this.precioCompra = event.target.value;
      this.subtotalA=this.cantidad*this.precioCompra;
      console.log('Precio actualizado:', this.precioCompra);
    }
  }
  
  selectPage(page: number): void {
    this.selectedPage = page;
    this.numPag=this.selectedPage;
    this.cargarProductos();
  }

  get items(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  closeModalAndRefreshData(registroExitoso: boolean): void {
    if (registroExitoso) {
    // this.closeModal(); // Cierra el modal
     this.cargarProductos();
    }
  }


  calculateFinalData(){
    this.productosCAR.forEach(
      p=>{
        this.subtotalCAR+=(p.cantidad*p.precio);
       
      }
    );
    this.IGV=this.calcularIGV(this.subtotalCAR);
    this.totalCAR=this.IGV+this.subtotalCAR;
  }
 

  onSearchChange(buscar: string): void {
    this.cargarProductos();
    this.numPag=0;
    console.log(this.buscar);

  }

  nextPage(){
    ++this.numPag;
    ++this.selectedPage;
    this.cargarProductos();
  }

  previusPage(){
    --this.numPag;
    --this.selectedPage;
    this.cargarProductos();
  }

  changePage(newPage: number): void {
    this.numPag = newPage;
    this.cargarProductos();
  }

  changeSort(field: string, direction: string): void {
    this.field = field;
    this.sortDirec = direction;
    this.cargarProductos();
  }

  changePageSize(newPageSize: number): void {
    this.pageSize = newPageSize;
   
  }



  pasarProducto(producto:Product){
    if(this.cantidad<1){
      return;
    }



    this.productoSend={
      cod_product:producto.cod_product,
      cantidad:this.cantidad,
      precio:this.precioCompra,
      name:producto.name,
      image:producto.pathImage,
    }

    if(this.productosCAR.some(p=>p.cod_product===producto.cod_product)){
      const index = this.productosCAR.findIndex(objeto => objeto.cod_product === producto.cod_product);

      if (index !== -1) {
    // El objeto está incluido en el array, ahora podemos modificar un atributo
      this.productosCAR[index].cantidad +=this.cantidad; // Modificar el atributo 'nombre' del objeto encontrado
      }
    }else{
      this.productosCAR.push(this.productoSend);
      
    }

    this.calculateFinalData();
    this.precioCompra=0;
  }


  deleteCar(p:ProductoCar){

    this.productosCAR=this.productosCAR.filter(pro=>pro!==p);
    this.calculateFinalData();

  }


  registrarCOmpra(){

    
    let compra:CompraRequest;
    this.productosCAR.forEach(pc=>{
      this.itemsP.push({
          product:pc.cod_product,
          quantity:pc.cantidad,
          purchase_price:pc.precio
      });
    })

    compra={
      description:this.description,
      supplier:this.selectedSupplier,
      type_payment:this.selectedPaymentType,
      user:this.user.user_id,
      items:this.itemsP
    }


    this.compraServ.registerPurchase(compra).subscribe(
      {
        next: (data) => {
          this.registroExitoso.emit(true);
          Swal.fire('Registrado!!','La compra fue registrada con exito','info')
        },
        error: (err) => {
          Swal.fire('Vaya :( Lo sentimos, parece que ocurrio un error ',err.error.message,'error');
          console.log(err);
        }

      }
   );

    

    console.log("Compra"+JSON.stringify(compra));


  }

  cargarProductos(){
    this.cantidad=0;
    this.precioCompra=0;
    this.subtotalA=this.cantidad*this.precioCompra;

    if(this.buscar.length<1){
      this.porductoService.getAllProductsPaginated(this.numPag, this.field, this.pageSize, this.sortDirec).subscribe({
        next: (data:any) => {
          console.log('numPag:', this.numPag, 'field:', this.field, 'pageSize:', this.pageSize, 'sortDirec:', this.sortDirec);
          this.pageSize=data.size;
          this.numElements=data.numberOfElements;
          this.totalEmlements=data.totalElements;
          this.from=data.first?1:(this.pageSize*this.numPag)+1;
          this.to=this.numElements+this.from-1;
          this.first=data.first;
          this.totalPages=data.totalPages;
          this.last=data.last;
          console.log(data);
          this.productos=data.content;
          this.productos.forEach(
            (p)=>{
              if(p.image!==null){
                this.porductoService.getProductImage(p.image).subscribe({
                  next: (imagen) => {
                    p.pathImage=URL.createObjectURL(imagen);
                  }
                });
              }else{
                p.pathImage='../../../../../assets/images/noimagen.png'
              }
            }
          );
         
          
        },
        error: (error) => {
          console.log(error);
        }
      });
    }else{
      
      this.porductoService.getAllProductsLike(this.buscar,this.numPag, this.field, this.pageSize, this.sortDirec).subscribe({
        next: (data:any) => {
          console.log('numPag:', this.numPag, 'field:', this.field, 'pageSize:', this.pageSize, 'sortDirec:', this.sortDirec);
          this.pageSize=data.size;
          this.numElements=data.numberOfElements;
          this.totalEmlements=data.totalElements;
          this.from=data.first?1:(this.pageSize*this.numPag)+1;
          this.to=this.numElements+this.from-1;
          this.first=data.first;
          this.totalPages=data.totalPages;
          this.last=data.last;
          console.log(data);
          this.productos=data.content;
          this.productos.forEach(
            (p)=>{
              if(p.image!==null){
                this.porductoService.getProductImage(p.image).subscribe({
                  next: (imagen) => {
                    p.pathImage=URL.createObjectURL(imagen);
                  }
                });
              }else{
                p.pathImage='../../../../../assets/images/noimagen.png'
              }
            }
          );
         
          
        },
        error: (error) => {
          console.log(error);
        }
      });
    }

   
  }


  cargarProveedores(){
    this.proveedorSer.getAllProeedores().subscribe(
      {
        next: (data) => {
          this.proveedores=data;
        },
        error: (error) => { console.log(error) },
      }
    );
  }
}

class Proveedor{
  document: string="";
  name: string="";
  type_document: string="";
  address: string="";
  phone: string="";
  email: string="";
  observation: string="";
  category_supplier: any;
}

export interface Product {
  cod_product: string;
  name: string;
  description: string;
  image: string;
  pathImage:string;
  price: number;
  category: any;
  brand: any;
  unit: any;
}

interface ProductoCar{
  cod_product: string;
  name: string;
  image: string;
  cantidad:number;
  precio:number;
}


interface CompraRequest{
  description:string,
  type_payment:number,
  supplier:string,
  user:string,
  items:Item[];
}

interface Item{
  quantity:number;
  product:string;
  purchase_price:number;
}