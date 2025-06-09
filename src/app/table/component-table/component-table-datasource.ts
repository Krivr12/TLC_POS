import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ComponentTableItem {
  component: string;
  dineIn: number;
  takeout: number;
}

export const EXAMPLE_DATA: ComponentTableItem[] = [
  { component: 'Pizza', dineIn: 15, takeout: 12 },
  { component: 'Burger', dineIn: 8, takeout: 20 },
  { component: 'Salad', dineIn: 10, takeout: 5 },
];

export class ComponentTableDataSource extends DataSource<ComponentTableItem> {
  private dataSubject = new BehaviorSubject<ComponentTableItem[]>([...EXAMPLE_DATA]);

  paginator!: MatPaginator;
  sort!: MatSort;

  connect(): Observable<ComponentTableItem[]> {
    const dataMutations = [
      this.dataSubject,
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(
      map(() => this.getPagedSortedData([...this.data]))
    );
  }

  disconnect(): void {}

  get data(): ComponentTableItem[] {
    return this.dataSubject.value;
  }

  add(item: ComponentTableItem): void {
    const newData = [...this.data, item];
    this.dataSubject.next(newData);
  }

  removeLast(): void {
    const newData = [...this.data];
    newData.pop();
    this.dataSubject.next(newData);
  }

  private getPagedSortedData(data: ComponentTableItem[]): ComponentTableItem[] {
    const sortedData = this.getSortedData([...data]);
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return sortedData.slice(startIndex, startIndex + this.paginator.pageSize);
  }

  private getSortedData(data: ComponentTableItem[]): ComponentTableItem[] {
    if (!this.sort?.active || this.sort.direction === '') return data;

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'component': return compare(a.component, b.component, isAsc);
        case 'dineIn': return compare(a.dineIn, b.dineIn, isAsc);
        case 'takeout': return compare(a.takeout, b.takeout, isAsc);
        default: return 0;
      }
    });
  }
}

function compare<T>(a: T, b: T, isAsc: boolean): number {
  return (a < b ? -1 : a > b ? 1 : 0) * (isAsc ? 1 : -1);
}