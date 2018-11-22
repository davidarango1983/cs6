import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { HttpCustomClient } from '../services/httpCustom.service'
import { isNullOrUndefined } from 'util';
import { Cons } from '../services/constants/cons';

@Injectable()
export class AuthService {
  token: string;
  private conf: Cons;

     







  constructor(private router: Router, private httpCustom: HttpCustomClient, private constants : Cons) { 
    this.conf= constants;

    let httpOptions = {
      headers: new HttpHeaders({
        "Authorization": 'Basic Y2xpZW50MTpjbGllbnQx'
      }),
      data: this.conf.oauthConfiguration
    };
  }

  signupUser(email: string, password: string) {

  }

   signinUser(username: string, password: string) {

    let url = this.conf.staticRoutes.apiEndPoint+this.conf.authRoutes.login+ '?' +
    'grant_type=' + this.conf.oauthConfiguration.grant_type +
    '&username=' + username + '&password=' + password + '&scope=read';

      this.httpCustom.login(url,this.conf.oauthConfiguration)
        .subscribe(result => {
          if (!isNullOrUndefined(result)) {
            sessionStorage.setItem("token", result.access_token);
            Cons.token=result.access_token;
            this.token = result.access_token;
            this.router.navigate(['/csAdmin/resume']);
          
          
          
          }
        }, error => {
          console.log(<any>error);
          this.token = null;
        });
   }



  logout() {

  }


  isAuthenticated() {
    this.token = sessionStorage.getItem("token");
    return this.token != null;
  }

  getToken(){
    return this.token;
  }

 
}
