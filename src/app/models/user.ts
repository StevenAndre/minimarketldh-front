import { Role } from "./role";
export class User {
 
    name: string;
    password: string;
    lastname: string;
    email: string;
    username: string;
    phone:String;
    address:string;

    constructor( name: string = '', password: string = '', 
    lastname: string = '', email: string = '', username: string = '',phone: string='',
    address:string=''
    ) {
        this.name = name;
        this.password = password;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.phone=phone;
        this.address=address;
    }
}