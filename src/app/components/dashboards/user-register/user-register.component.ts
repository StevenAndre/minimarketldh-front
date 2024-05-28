import { NgFor, NgIf } from '@angular/common';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserRegister } from '../../../models/userRegisterAdmin';
import { LoginRegisterServiceService } from '../../../service/login-register-service.service';
import { RoleTransformPipePipe } from '../../../pipes/role-transform-pipe.pipe';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { Role } from '../../../models/role';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [FormsModule,NgIf,RouterLink,NgFor,
    RoleTransformPipePipe,MatSelectModule,MatFormFieldModule,MatCardModule,NgMultiSelectDropDownModule,MultiSelectModule,],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {

  constructor(private logser:LoginRegisterServiceService,private router:Router){
    
  }
  dropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings:IDropdownSettings = {};
  idsRoles=new Set<number>();
  isselectAll:boolean=false;
  rolepipe=new RoleTransformPipePipe();
  opcionesControl = new FormControl();
  selectedRoles: Role[]=[];
  confirmPassword:string="";
  roles:Role[]=[];
  user:UserRegister= new UserRegister();

  ngOnInit(): void {
    this.logser.getAllRoles().subscribe({
      next:(data)=>{
        console.log(data);
       this.roles=data;
       
        this.roles.forEach(r=>{
          this.dropdownList=[...this.dropdownList,{code:r.role_id, name:this.rolepipe.transform(r.role_name+"")}];
        });
      },
      error:(err)=>console.log(err)
    });
   
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'code',
      textField: 'name',
      selectAllText: 'seleccionar todos',
      unSelectAllText: 'ninguno',
      itemsShowLimit: 6,
     
      allowSearchFilter: true
    };
  }
  
  
  register(){

    if(!this.comprobarContraseñas(this.user.password,this.confirmPassword)){
      this.user.password="";
      this.confirmPassword="";
      Swal.fire('Cuidado!!','las cotraseñas no coinciden, revisa y vuelve a intentar','warning');
      return;
    }

    if(this.idsRoles.size<1){
      Swal.fire('Atencion!!','Debes seleccionar al menos 1  role para este usuario','warning');
      return;
    }
  
    this.user.roles.push(...this.idsRoles)
    
    this.logser.registerByAdmin(this.user).subscribe(
      {
        next:(res:any)=>{
          console.log(res);
          Swal.fire('Registro Exitoso','El usuario fue registrado con exito','success');
          this.router.navigate(['/dashboard/admin-dashboard/list-users']);
          
      },error:err=>{
        Swal.fire('Vaya :( Lo sentimos, parece que ocurrio un error ',err.error.message,'error');
        console.log(err);
      }
  });
  this.user=new UserRegister();
  this.confirmPassword="";
  this.idsRoles.clear();
  this.selectedItems=[];
  
  }


  private comprobarContraseñas(pss:string,repass:string):boolean{
    return pss===repass;
  }

  onItemSelect(item: any) {

    if(this.isselectAll){
      this.idsRoles.clear();
      this.isselectAll=false;
    }

    this.idsRoles.add(item.code);
   
  }
  onSelectAll(items: any) {
    this.isselectAll=true;
      items.forEach((e:any) => {
      this.idsRoles.add(e.code);
    });
  
    
  }

  onItemDeSelect(item: any){

     this.idsRoles.delete(item.code);
    
  }

  onDeSelectAll(){
    this.idsRoles.clear();
  }

}

