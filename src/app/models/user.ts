import { Role } from "./role";
export class User {
 
    name: string;
    password: string;
    lastname: string;
    email: string;
    username: string;

    constructor( name: string = '', password: string = '', lastname: string = '', email: string = '', username: string = '') {
        this.name = name;
        this.password = password;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
    }
}