import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-apertura',
  standalone: true,
  imports: [BaseChartDirective,FormsModule,NgIf,NgFor,NgClass],
  templateUrl: './apertura.component.html',
  styleUrl: './apertura.component.css'
})
export class AperturaComponent implements OnInit {

  isModalOpen: boolean = false;
  monto: number = 10;
  constructor() { }

  ngOnInit(): void {
  }

 

  toggleModal(modalID: string): void {
    this.isModalOpen = true;
  }

  invoicesData: ChartData<'doughnut'> = {
    labels: ['MONTO INICIAL', 'INGRESOS', 'DEVOLUCIONES', 'PRÉSTAMOS', 'GASTOS'],
    datasets: [{
      data: [100, 30, 0, 0, 0],
      backgroundColor: ['#374151', '#22C55E', '#EF4444', '#EAB308', '#3B82F6'],
    }],
  };

  invoicesLabels = ['MONTO INICIAL', 'INGRESOS', 'DEVOLUCIONES', 'PRÉSTAMOS', 'GASTOS'];


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
    // Lógica para guardar el monto
    console.log('Monto guardado:', this.monto);
    this.closeModal();
  }



}
