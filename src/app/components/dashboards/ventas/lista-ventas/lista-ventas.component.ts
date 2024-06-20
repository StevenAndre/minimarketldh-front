import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-ventas',
  standalone: true,
  imports: [],
  templateUrl: './lista-ventas.component.html',
  styleUrl: './lista-ventas.component.css'
})
export class ListaVentasComponent {


  constructor(private router:Router){}




  openRegistro(){

    this.router.navigate(['/dashboard/admin-dashboard/register-sale'])
  }

}
