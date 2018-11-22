import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cons } from './constants/cons';

@Injectable()
export class HttpCustomClient {


  constructor(private http: HttpClient) {}

  private createHeaders() : HttpHeaders{
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + Cons.getToken());
    return headers;
  }

  /*
  *
  * CUSTOM GET
  *
  */
   get(url, params): Observable<any> {
     return this.http.get(url,{"headers": this.createHeaders(), 'params': params});
   }




  /*
  *
  * CUSTOM POST
  *
  */
   post(url, data) : Observable<any> {
     return this.http.post(url,data,{"headers": this.createHeaders()});
   }



  /*
  *
  * CUSTOM POST FOR LOGIN
  *
  */
   login(url, data) : Observable<any> {

     let headers = new HttpHeaders().append('Authorization', 'Basic Y2xpZW50MTpjbGllbnQx');
     let options = {"client_id":"client1","client_secret":"client1","grant_type":"password","scope":"read" };
     return this.http.post(url, options, {"headers":headers});
   }
}
