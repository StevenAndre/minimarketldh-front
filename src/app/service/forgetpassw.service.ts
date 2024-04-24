import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { changePasswordDto } from '../models/changePassword';

@Injectable({
  providedIn: 'root'
})
export class ForgetpasswService {
  baseURL= "http://localhost:8080";
  constructor(private http: HttpClient) { }



  senDVerificactioEmailCode(email:string): Observable<any> {

    return this.http.get(`${this.baseURL}/codes/change?email=${email}`);
  }


  SendVerificationCode(email:string,code:string): Observable<any> {

    return this.http.get(`${this.baseURL}/codes/confirm-code?email=${email}&code=${code}`) ;
  }


  changePassword(changePassword:changePasswordDto): Observable<any> {
    return this.http.post(`${this.baseURL}/users/change-password`,changePassword)
  }


   
}
