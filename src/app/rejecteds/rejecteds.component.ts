import { Component, OnInit } from '@angular/core';
import { HttpCustomClient } from '../services/httpCustom.service';
import { Url } from '../services/constants/url';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-rejecteds',
  templateUrl: './rejecteds.component.html',
  styleUrls: ['./rejecteds.component.scss']
})
export class RejectedsComponent implements OnInit {
  ids=[];

  constructor(private http: HttpCustomClient, private urls: Url) { }

  ngOnInit() {

    this.http.get(this.urls.toBackend.masterIds,null).subscribe(result => {
      if (!isNullOrUndefined(result)) {

        result.forEach(element => {
          this.ids.push(element.id);

        });
      }
    }, error => {
      console.log(<any>error);
    }
  );


  }

}
