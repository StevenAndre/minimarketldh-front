import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginDTO } from '../models/login';
import { User } from '../models/user';
import { UserRegister } from '../models/userRegisterAdmin';


@Injectable({
  providedIn: 'root'
})
export class LoginRegisterServiceService {

  baseURL= "http://localhost:8080";

  constructor(private http: HttpClient) { 
  }

  login(logreq:loginDTO) :Observable<any> {
  
  return  this.http.post(`${this.baseURL}/auth/login`,logreq);

  }

  register(user:User):Observable<any>{
    return this.http.post(`${this.baseURL}/auth/register`,user);
  }

  registerByAdmin(user:UserRegister):Observable<any>{
    return this.http.post(`${this.baseURL}/users/register/byadmin`,user);
  }
  

  saveToken(token:string){
    localStorage.setItem('token', token);
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

  getUserByID(userID:string):Observable<any>{
    return this.http.get(`${this.baseURL}/${userID}`);
  }

}
