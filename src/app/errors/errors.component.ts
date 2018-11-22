import { element } from 'protractor';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpCustomClient } from '../services/httpCustom.service';
import { isNullOrUndefined } from 'util';
import { Url } from 'src/app/services/constants/url';
import { Filters } from '../services/filters';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';




@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
})
export class ErrorsComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['select', 'name', 'clientSpace', 'extension', 'autor', 'contributionDate', 'tries', 'lastTryDate', 'type'];
  selection = new SelectionModel<any>(true, []);
  isLoading = true;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private spinner: NgxSpinnerService,
             private http: HttpCustomClient, private urls: Url, public filters: Filters, public router: Router) {
this.dataSource.data = [];



  }

  ngOnInit() {


    this.spinner.show();

    const params = {clientspaces: '',
    extension: '',
    name: ''
    };
    this.http.get(this.urls.toBackend.conversions, params).subscribe(result => {
      if (!isNullOrUndefined(result)) {
        this.dataSource.data = result;
        this.spinner.hide();

      }

    }, error => {
      console.log('An error has ocurred while loading resume');
    });


  }


  ngAfterViewInit() {
this.dataSource.paginator = this.paginator;
this.dataSource.sort = this.sort;

/**
 * Custom Ordered
 */
this.dataSource.sortingDataAccessor = (item, property) => {

  switch (property) {
    case 'clientSpace': return item.clientspace.csName;
    default: return item[property];
  }
};




//  this.dataSource.filterPredicate =
//    (data: Element, filter: string, param: string) => data.name.indexOf(filter) != -1;
 this.dataSource.filterPredicate = function (data, filter: string) {
const arraykeys = Object.keys(data);
//arraykeys.forEach((propertyName) =>
let find = false;
for (let index = 0; index < arraykeys.length; index++) {
     if (data.hasOwnProperty(arraykeys[index])) {
       switch (arraykeys[index]) {
        case 'clientspace':
        find = data.clientspace ? data.clientspace.csName.toString().toLowerCase().match(new RegExp(filter)) ? true : false : false;

        break;
        default:
        find =  data[arraykeys[index]] ? data[arraykeys[index]].toString().toLowerCase().match(new RegExp(filter)) ? true : false : false;

      };
      if( find ) {
        return true;
      }

   };
   }
   return find;
 };
  }







/** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
}




applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

  }



}








