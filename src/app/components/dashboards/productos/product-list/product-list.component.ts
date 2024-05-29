import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../../../service/productos.service';
import { RegisterProductComponent } from '../register-product/register-product.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule,NgIf,NgFor,NgClass,RegisterProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{



  buscar:string="";
  isEdit:boolean=false;
  detail:boolean=false;
  productID!:string;
  isVisible:boolean=false;
  selectedPage: number = 0;
  productos:Product[]=[];
  numPag: number = this.selectedPage;
  first!:boolean;
  from:number=1;
  numElements!:number;
  to!:number;
  last!:boolean;
  totalPages!:number;
  field: string = 'name';
  totalEmlements!:number;
  pageSize: number = 3;
  sortDirec: string = 'asc';


  constructor(private productServ:ProductosService){
    
  }
  ngOnInit(): void {
  this.getProducts();
  }

  selectPage(page: number): void {
    this.selectedPage = page;
    this.numPag=this.selectedPage;
    this.getProducts();
  }

  get items(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  closeModalAndRefreshData(registroExitoso: boolean): void {
    if (registroExitoso) {
     this.closeModal(); // Cierra el modal
     this.getProducts();
    }
  }


  onSearchChange(buscar: string): void {
    this.getProducts();
    this.numPag=0;
    console.log(this.buscar);

  }

  nextPage(){
    ++this.numPag;
    ++this.selectedPage;
    this.getProducts();
  }

  previusPage(){
    --this.numPag;
    --this.selectedPage;
    this.getProducts();
  }

  changePage(newPage: number): void {
    this.numPag = newPage;
    this.getProducts();
  }

  changeSort(field: string, direction: string): void {
    this.field = field;
    this.sortDirec = direction;
    this.getProducts();
  }

  changePageSize(newPageSize: number): void {
    this.pageSize = newPageSize;
   
  }

  closeModal(){
    this.isVisible=false;
    this.isEdit=false;
    this.detail=false;
  }
  openModal(){
    console.log("ABRIENDO REGISTRAr");
    this.isVisible=true;
  }
  openDetail(productID:string){
    this.isVisible=true;
    this.detail=true;
    this.productID=productID;
  }

  edit(productID:string){
    this.isVisible=true;
    this.productID=productID;
    this.isEdit=true;
  }


  deleteProducto(codProduct:string){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Deseas eliminar al producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar producto',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.productServ.deleteProduct(codProduct).subscribe({
          next: (data) => {
            Swal.fire(
              '¡Eliminado!',
              'El registro del producto fue eliminado',
              'success'
            );
            this.getProducts();
            
          },
          error: (err) => {
           Swal.fire('Vaya!','Parece que ocurrio un error intenta de nuevo')
          }
        });
        
        
      }
    });
  }




  getProducts(){

    if(this.buscar.length<1){
      this.productServ.getAllProductsPaginated(this.numPag, this.field, this.pageSize, this.sortDirec).subscribe({
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
         
          
        },
        error: (error) => {
          console.log(error);
        }
      });
    }else{
      
      this.productServ.getAllProductsLike(this.buscar,this.numPag, this.field, this.pageSize, this.sortDirec).subscribe({
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
         
          
        },
        error: (error) => {
          console.log(error);
        }
      });
    }

   
  }

  


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