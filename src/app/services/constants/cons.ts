import { Injectable } from '@angular/core';

  
@Injectable({
  providedIn:'root'
  })
export class Cons {
  appName: string = 'CsAdmin';
  static token : string;

static getToken(){
return sessionStorage.getItem("token");
}


 oauthConfiguration= {
    client_id : 'client1',
    client_secret : 'client1',
    grant_type : 'password',
    scope : 'read'
};

 staticRoutes ={
 "apiEndPoint": "http://localhost:8080/csAdmin" , 
 "menu":"/assets/menu/menu.json"
 }

 authRoutes ={
  "login":"/oauth/token"
  }

}
