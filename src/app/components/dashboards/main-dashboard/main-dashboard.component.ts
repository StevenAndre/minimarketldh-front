import { Component } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css'
})
export class MainDashboardComponent {

  salesData: ChartData<'pie'> = {
    labels: ['Total Cobrado', 'Pendiente de Cobro'],
    datasets: [{
      data: [23, 5],
      backgroundColor: ['#4CAF50', '#FF5252'],
    }],
  };

  salesLabels = ['Total Cobrado', 'Pendiente de Cobro'];

  invoicesData: ChartData<'doughnut'> = {
    labels: ['Total Cobrado', 'Pendiente de Cobro'],
    datasets: [{
      data: [269.50, 23.45],
      backgroundColor: ['#4CAF50', '#FF5252'],
    }],
  };

  invoicesLabels = ['Total Cobrado', 'Pendiente de Cobro'];

  totalsData: ChartData<'bar'> = {
    labels: ['16d', '17d', '18d', '19d', '20d', '21d', '22d', '23d'],
    datasets: [
      { label: 'Total notas de venta', data: [1, 4, 16, 23, 0, 0, 0, 0], backgroundColor: '#FF5252' },
      { label: 'Total comprobantes', data: [0, 3, 1, 269.50, 0, 0, 0, 0], backgroundColor: '#4CAF50' },
      { label: 'Total', data: [0, 0, 0, 292.50, 0, 123.4, 0, 0], backgroundColor: '#9E9E9E' }
    ],
  };

  totalsLabels = ['16d', '17d', '18d', '19d', '20d', '21d', '22d', '23d'];



  purchasesData: ChartData<'bar'> = {
    labels: ['16d', '17d', '18d', '19d', '20d', '21d', '22d', '23d'],
    datasets: [
      { label: 'Total notas de compras', data: [1, 4, 16, 23, 0, 0, 0, 0], backgroundColor: '#FF5252' },
      { label: 'Total comprobantes', data: [0, 3, 1, 269.50, 0, 0, 0, 0], backgroundColor: '#4CAF50' },
      { label: 'Total', data: [0, 0, 0, 292.50, 0, 123.4, 0, 0], backgroundColor: '#9E9E9E' }
    ],
  };

  purchasesLabels= ['16d', '17d', '18d', '19d', '20d', '21d', '22d', '23d'];


}
