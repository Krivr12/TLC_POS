import {
  AfterViewInit,
  Component,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
export interface ComponentTableItem {
  component: string;
  outletPrices: { [outletName: string]: number | null };
}

@Component({
  selector: 'app-component-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './component-table.component.html',
  styleUrls: ['./component-table.component.scss'],
})
export class ComponentTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ComponentTableItem>;

  @Input() outlets: { name: string; price?: number }[] = [];
  displayedColumns: string[] = [
    'component',
    'Dine-in',
    'Dine-in-unit',
    'Take-out',
    'Take-out-unit',
  ];

  dataSource = new MatTableDataSource<ComponentTableItem>([]);

  newItemComponent: string = '';

  addNewItem(): void {
    if (this.newItemComponent.trim()) {
      const outletPrices: { [outletName: string]: number | null } = {};
      this.outlets.forEach((outlet) => {
        outletPrices[outlet.name] = null;
      });
      const newItem: ComponentTableItem = {
        component: this.newItemComponent.trim(),
        outletPrices,
      };
      this.dataSource.data = [...this.dataSource.data, newItem];
      this.newItemComponent = '';
    }
  }

  deleteLatestItem(): void {
    this.dataSource.data = this.dataSource.data.slice(0, -1);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
