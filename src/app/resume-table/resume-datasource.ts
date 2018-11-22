import { Url } from './../services/constants/url';
import { HttpCustomClient } from './../services/httpCustom.service';
import { HttpClientModule } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';


// TODO: Replace this with your own data model type
export interface ResumeItem {
  error: number;
  idCs: number;
  name: string;
  pending: number;
  reject: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ResumeItem[] = [];

/**
 * Data source for the Errors view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ResumeDataSource extends DataSource<ResumeItem> {
  data: ResumeItem[] = EXAMPLE_DATA;
  http: HttpCustomClient;
  urls: Url;

  constructor(private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ResumeItem[]> {

     // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      // this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
   // this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getSortedData([...this.data]);
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  // private getPagedData(data: ResumeItem[]) {
  //   const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  //   return data.splice(startIndex, this.paginator.pageSize);
  // }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ResumeItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'idCs': return compare(+a.idCs, +b.idCs, isAsc);
        case 'pending': return compare(+a.pending, +b.pending, isAsc);
        case 'reject': return compare(+a.reject, +b.reject, isAsc);
        case 'error': return compare(+a.error, +b.error, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

