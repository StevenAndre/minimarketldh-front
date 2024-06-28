import { ChangeDetectorRef, Component, Inject, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LoginRegisterServiceService } from '../../service/login-register-service.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  loginServ=inject(LoginRegisterServiceService);
 
  constructor(private router:Router){}

  
  userSignal=this.loginServ.userCurrent;
  user=this.userSignal()






  ngOnInit(): void {
    
  }

  logut(){
    this.loginServ.logou();
    this.router.navigate(['/login']);
  }
 

}
