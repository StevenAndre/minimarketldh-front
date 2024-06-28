import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../models/DataVenta';

@Injectable({
  providedIn: 'root'
})
export class SunatService {

  constructor (private http:HttpClient) { }


  private PERSONAID="6670c2bab98c560015b1bae5";
  private PERSONATOKEN="DEV_0JPbuTvNtCJDPliltLdhOqNuB8TD1DZnJAHrRbvptigBXXQtZht5XIN3sjKH5WAC";
  private personaId= "6670c2bab98c560015b1bae5";
  private personaToken="DEV_0JPbuTvNtCJDPliltLdhOqNuB8TD1DZnJAHrRbvptigBXXQtZht5XIN3sjKH5WAC";

  obtenerLastNumber(type:string,serie:string):Observable<any>{

    let data:bodyLastNumber={
      personaId:this.personaId,
      personaToken:this.personaToken,
      type:type,
      serie:serie
    }
    return this.http.post("https://back.apisunat.com/personas/lastDocument",data);
  }

  URLPOST="https://back.apisunat.com/personas/v1/sendBill";
  enviarDatasunat(data:any){

    let documetID;
    let status;
    this.http.post(this.URLPOST,data).subscribe({
      next: (data:any) => {
        documetID=data.documentId;
        status=data.status;
        console.log("DATOS  status:"+status+" ,DOCUMENTID:"+documetID);
        this.http.get(`https://back.apisunat.com/documents/${documetID}/getById`).subscribe({
          next: (data:any) => {
            console.log(data);

          },
          error: (err:any) => {
            console.log(err);
          }
        });
      },
      error: (error) => {
        console.log(error);
      }
    });

    
  }






}

interface bodyLastNumber{
    personaId:string,
    personaToken:string,
    type:string,
    serie:string,
}
