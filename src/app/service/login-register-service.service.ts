import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { loginDTO } from '../models/login';
import { User } from '../models/user';
import { UserRegister } from '../models/userRegisterAdmin';


@Injectable({
  providedIn: 'root'
})
export class LoginRegisterServiceService {

  baseURL= "http://localhost:8080";

  userCurrent: WritableSignal<User | null> = signal(null);
  

  constructor(private http: HttpClient) { 
  }


   loged=false;


  login(logreq:loginDTO) :Observable<any> {
  
  return  this.http.post(`${this.baseURL}/auth/login`,logreq);

  }

  register(user:User):Observable<any>{
    return this.http.post(`${this.baseURL}/auth/register`,user);
  }

  registerByAdmin(user:UserRegister):Observable<any>{
    return this.http.post(`${this.baseURL}/users/register/byadmin`,user);
  }

  getCurrentuser():Observable<User>{
    return this.http.get<User>(`${this.baseURL}/users/current-user`);
  }

  isLogged():boolean{
    return localStorage.getItem("token")!=null;
   //return this.loged;
  }
  

  saveToken(token:string){
  
    localStorage.setItem('token', token);
  }

  saveUser(user:User){

    this.userCurrent.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser():String | null{
    return localStorage.getItem("user");
  }

  getToken():string | null{
    return localStorage.getItem("token");
  }

  getUSerActual():Observable<any>{
    return this.http.get(`${this.baseURL}/users/user-currenly`);
  }


  getAllRoles():Observable<any>{
    return this.http.get(`${this.baseURL}/roles/all`);
  }



  logou(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loged=false;
    this.userCurrent.set(null);
  }
 

}
