import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CajaService } from '../../../service/caja.service';
import { AperturaService,OpeningCash } from '../../../service/apertura.service';
import Swal from 'sweetalert2';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-apertura-list',
  standalone: true,
  imports: [FormsModule,NgFor,NgIf,NgClass,MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './apertura-list.component.html',
  styleUrl: './apertura-list.component.css'
})
export class AperturaListComponent implements OnInit {
  durationInSeconds = 5;
  cajaService=inject(CajaService);
  aperturaService=inject(AperturaService);
  cajaNumber!:number;
  cajaAperturada:boolean=false;
  isModalOpen: boolean = false;
  monto: number = 0;
  todayDate:string="";

  items: Item[] = [];
  aperturas:OpeningCash[]=[];

  constructor(private _snackBar: MatSnackBar) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;
    this.todayDate=todayString;
   }

  ngOnInit(): void {

    
    this.cajaService.getCashById(this.cajaService.cajaID()).subscribe({
      next: (data) => {
        this.cajaNumber = data.number;
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.cargarData();
    
    this.items = [
      {
        referencia: '1',
        vendedor: 'Administrador',
        apertura: '2024-06-23 02:30:00',
        cierre: '',
        saldoInicial: 12234.0000,
        saldoFinal: 0.0000,
        estado: 'Aperturada'
      },
      {
        referencia: '2',
        vendedor: 'Administrador',
        apertura: '2024-06-17 21:17:39',
        cierre: '2024-06-23 02:29:36',
        saldoInicial: 0.0000,
        saldoFinal: 5324.5000,
        estado: 'Cerrada'
      },
      {
        referencia: '2',
        vendedor: 'Administrador',
        apertura: '2024-06-17 21:17:39',
        cierre: '2024-06-23 02:29:36',
        saldoInicial: 0.0000,
        saldoFinal: 5324.5000,
        estado: 'Cerrada'
      },
      {
        referencia: '212321',
        vendedor: 'Administrador',
        apertura: '2024-06-16 23:44:00',
        cierre: '2024-06-17 00:34:46',
        saldoInicial: 122.0000,
        saldoFinal: 122.0000,
        estado: 'Cerrada'
      },
      {
        referencia: '01122023',
        vendedor: 'EDWIN',
        apertura: '2023-12-01 19:15:53',
        cierre: '2024-06-17 00:34:43',
        saldoInicial: 10.0000,
        saldoFinal: 10.0000,
        estado: 'Cerrada'
      },
      {
        referencia: '19112023',
        vendedor: 'Administrador',
        apertura: '2023-11-19 08:38:52',
        cierre: '2024-06-16 23:43:43',
        saldoInicial: 0.0000,
        saldoFinal: 87589.7800,
        estado: 'Cerrada'
      }
    ];
  }

  cargarData(){
    this.aperturaService.getAllOpeningsByCash(this.cajaService.cajaID()).subscribe({
      next: (data) => {
        this.aperturas = data;
        this.aperturas.forEach(a=>{
          
          if(a.date===this.todayDate){
            this.cajaAperturada=true;
            console.log("caja aperturada yaaa");
          }
        });
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
     
    });
  }

  openAvisoCaja(){
    this._snackBar.open(`La Caja #${this.cajaNumber} ya fue aperturada hoy`,'cerrar', {
      duration: this.durationInSeconds * 1000,
      panelClass: ['custom-snackbar'],
      verticalPosition: 'top',
    });
  }

  registrarApertura(){
    this.isModalOpen = true;
  }

  
  closeModal(): void {
    this.isModalOpen = false;
  }

  incrementar(): void {
    this.monto++;
  }

  decrementar(): void {
    if (this.monto > 0) {
      this.monto--;
    }
  }

  guardar(): void {
   
    this.aperturaService.openCash(this.cajaService.cajaID(),this.monto).subscribe({
      next: (data) => {
        Swal.fire('Caja aperturada',`La caja N°${this.cajaNumber} fue aperturada con exito!!`,'success');
        this.cargarData();
        this.isModalOpen = false;
        this.monto = 0;

      },
      error: (err) => {
        Swal.fire('Error',`No se pudo aperturar la caja N°${this.cajaNumber}`)
        console.log(err);
      }
    });

    

    console.log('Monto guardado:', this.monto);
    this.closeModal();
  }



}
interface Item {
  referencia: string;
  vendedor: string;
  apertura: string;
  cierre: string;
  saldoInicial: number;
  saldoFinal: number;
  estado: string;
}
