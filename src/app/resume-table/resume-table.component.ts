import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpCustomClient } from '../services/httpCustom.service';
import { isNullOrUndefined } from 'util';
import { of, Observable, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Url } from 'src/app/services/constants/url';
import { Filters } from '../services/filters';
import { Router } from '@angular/router';
import { MatPaginator, MatSort } from '@angular/material';
import { ResumeDataSource } from './resume-datasource';




@Component({
  selector: 'app-resume-table',
  templateUrl: './resume-table.component.html',
  styleUrls: ['./resume-table.component.scss'],
})
export class ResumeTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  dataSource: ResumeDataSource;
  displayedColumns = ['name', 'reject', 'pending', 'error'];
  total: Subscription;
  totales = {
    error: 0,
    pending: 0,
    reject: 0
  };
  conteo = 0;
  finished = false;
  loading;


  constructor(private spinner: NgxSpinnerService,
             private http: HttpCustomClient, private urls: Url, public filters: Filters, public router: Router) {


  }

  ngOnInit() {

    this.spinner.show();
    this.http.get(this.urls.toBackend.resume, null).subscribe(result => {
      if (!isNullOrUndefined(result)) {
        this.calcularTotales(result);
        this.dataSource = new ResumeDataSource(this.sort);
        this.dataSource.data = result;
        this.spinner.hide();
      }

    }, error => {
      console.log('An error has ocurred while loading resume');
    });


  }


  ngAfterViewInit() {

    const myNumbers = interval(1)
      .pipe(map(
        (data: number) => {
          return data + 1;
        }
      ));
    this.total = myNumbers.subscribe(
      (number: number) => {
        this.conteo = number;
        if (this.conteo === 200) {
          this.total.unsubscribe();
          this.finished = true;

        }
      }


    );



  }

  setFilter(filter) {
    this.filters[filter.route] = {
      'name': filter.name,
      'value': filter.value
    };
    this.router.navigate(['/csAdmin/' + filter.route]);

  }


  /**
   * TOTALES TABLA
   */
  calcularTotales(result) {
    result.forEach(element => {
      this.totales.error += element.error;
      this.totales.pending += element.pending;
      this.totales.reject += element.reject;
    });
  }

  getTotalCost(item) {
    return this.dataSource.data.map(t => t[item]).reduce((acc, value) => acc + value, 0);
  }
}






