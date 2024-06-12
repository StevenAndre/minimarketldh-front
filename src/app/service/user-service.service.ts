import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  private baseURLUsers= "http://localhost:8080/users";

  constructor(private http: HttpClient) { 
  }


  getAllUsers():Observable<any>{
    return this.http.get(`${this.baseURLUsers}/all`);
  }
  getUserByID(userID:string):Observable<any>{
    return this.http.get(`${this.baseURLUsers}/${userID}`);
  }

  deleteUser(userID:string):Observable<any>{
    
    return this.http.delete(`${this.baseURLUsers}/delete/${userID}`)
  }




}
