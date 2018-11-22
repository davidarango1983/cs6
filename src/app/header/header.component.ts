import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { Cons } from '../services/constants/cons';
import { AuthService } from '../auth/auth.service';
import { AppComponent } from '../app.component';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cons = new Cons();
  routes: RoutesMenu[];

  constructor(private http: HttpClient, private authService: AuthService, private appComponent: AppComponent) {

  }

  ngOnInit() {
    this.loadMenu().subscribe(result => {
      if (!isNullOrUndefined(result)) {

        this.routes = result;
      }
    }, error => {
      console.log(<any>error);
    }
  );
  console.log('Cargando Menu.. finalizado');
  }


  loadMenu(): Observable<any> {

    console.log('Cargando Resumen');
    return this.http.get(this.cons.staticRoutes.menu);
  }


}

export interface RoutesMenu {

  name: string;
  link: string;
  icon: string;
  class: string;
  onclick: string;

}


