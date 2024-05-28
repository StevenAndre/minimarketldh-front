import { Role } from "./role";
export class UserRegister {
    name: string="";
    email:string = "";
    password: string="";
    lastname: string="" 
    username: string="";
    phone:string="";
    address:string="";
    roles: number[]=[];
  }


  export class UserUpdate {
    name: string="";
    lastname: string="" 
    phone:string="";
    address:string="";
    roles: Role[]=[];
  }