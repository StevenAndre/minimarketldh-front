import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductosService,ProductRequest,ProductUpdate } from '../../../../service/productos.service';
import { CategoriasService } from '../../../../service/categorias.service';
import { MarcasService } from '../../../../service/marcas.service';
import { UnidadesService } from '../../../../service/unidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-product',
  standalone: true,
  imports: [NgFor,FormsModule,ReactiveFormsModule,NgIf,NgClass],
  templateUrl: './register-product.component.html',
  styleUrl: './register-product.component.css'
})
export class RegisterProductComponent {

  @Output() registroExitoso = new EventEmitter<boolean>();
  @Input() productId!:string;
  @Input() isEdit!:boolean;
  @Input()detail!:boolean;

  productForm: FormGroup;
  Imagen!:File | null;
  producto!:ProductRequest;
  productUP!:Product;
  productUpdate!:ProductUpdate;
  categories: any[] = [];
  brands: any[] = [];
  units: any[] = [];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  imageProduct!:string | ArrayBuffer | null;
  


  constructor(
    private fb: FormBuilder,
    private productService: ProductosService,
    private categoryService: CategoriasService,
    private brandService: MarcasService,
    private unitService: UnidadesService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      unit: ['', Validators.required],
      image: [null]
    });
  }

  ngOnInit(): void {
    if(this.isEdit || this.detail){
      this.productService.getProductById(this.productId).subscribe({
        next: (product) => {
          console.log(product);
          this.productUP = product;
          if(this.productUP.image!==null){
            this.productService.getProductImage(this.productUP.image).subscribe({
              next: (imagen) => {
                this.imageProduct=URL.createObjectURL(imagen);
                console.log(this.imageProduct);
              },
              error:err=>{
                console.log(err);
              }
            });
          }else{
            this.imageProduct='../../../../../assets/images/noimagen.png'
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }else{
      this.loadCategories();
      this.loadBrands();
      this.loadUnits();
    }
    
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadBrands(): void {
    this.brandService.getAllBrands().subscribe(brands => {
      this.brands = brands;
    });
  }

  loadUnits(): void {
    this.unitService.getAllUnits().subscribe(units => {
      this.units = units;
    });
  }

  onFIleSelectUpdate(event: Event):void{
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageProduct = reader.result;
        this.Imagen=file;
      };
      reader.readAsDataURL(file);
    }else{
     this.Imagen=null;
      this.imageProduct=null;
    }
  }


  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;

    if (file) {
      this.productForm.patchValue({ image: file });
      const imageControl = this.productForm.get('image');
      if (imageControl) {
        imageControl.updateValueAndValidity();
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      // Si no hay ningún archivo seleccionado, restablecer el valor del formulario y la vista previa de la imagen
      this.productForm.patchValue({ image: null });
      this.imagePreview =null;
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = new FormData();
      Object.keys(this.productForm.value).forEach(key => {
        if (key !== 'image') {
          productData.append(key, this.productForm.value[key]);
        }
      });
      if (this.selectedFile) {
        productData.append('image', this.selectedFile);
      }

      this.producto={
        name:this.productForm.value.name,
        description:this.productForm.value.description,
        price:this.productForm.value.price,
        brand:this.productForm.value.brand,
        category:this.productForm.value.category,
        unit:this.productForm.value.unit
      }
      console.log(this.producto);
      console.log(this.productForm.value); // Verifica los valores del formulario
      console.log(this.productForm.value.image); // Verifica el archivo seleccionado

      
       this.productService.registerProduct(this.producto,this.productForm.value.image).subscribe(
        {
          next: (data) => {
            this.registroExitoso.emit(true);
            Swal.fire('Registrado!!','El producto fue registrado con exito','info')
          },
          error: (err) => {
            Swal.fire('Vaya :( Lo sentimos, parece que ocurrio un error ',err.error.message,'error');
            console.log(err);
          }

        }
     );
    }
  }

  update(){

    this.productUpdate={
      name:this.productUP.name,
      description:this.productUP.description,
      price:this.productUP.price,
    }

    this.productService.updateProduct(this.productUP.cod_product,this.productUpdate,this.Imagen).subscribe({
      next: (data) => {
        this.registroExitoso.emit(true);
        Swal.fire('Actualizado!!','El producto fue actualizado con exito','info')
      },
      error: (err) => {
        Swal.fire('Vaya :( Lo sentimos, parece que ocurrio un error ',err.error.message,'error');
        console.log(err);
      }
    });

    console.log(this.productUP);
    console.log(this.Imagen);


  }


}

 interface Product {
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


