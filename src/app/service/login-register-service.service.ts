import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginDTO } from '../models/login';


@Injectable({
  providedIn: 'root'
})
export class LoginRegisterServiceService {

  baseURL= "http://localhost:8080";

  constructor(private http: HttpClient) { 
  }

  login(logreq:loginDTO) :Observable<any> {

     return this.http.post(`${this.baseURL}/auth/login`,logreq);

  }





}
