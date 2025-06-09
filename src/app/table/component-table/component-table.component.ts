import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ComponentTableDataSource, ComponentTableItem } from './component-table-datasource';

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
    MatButtonModule
  ],
  templateUrl: './component-table.component.html',
  styleUrls: ['./component-table.component.scss'],
})
export class ComponentTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ComponentTableItem>;
  dataSource = new ComponentTableDataSource();

  displayedColumns = ['component', 'dineIn', 'takeout'];
  
  // Properties for the new input fields
  newItemComponent: string = '';
  newItemDineIn: number | null = null;
  newItemTakeout: number | null = null;

  addNewItem() {
    if (this.newItemComponent.trim() && 
        this.newItemDineIn !== null && 
        this.newItemTakeout !== null) {
      const newItem: ComponentTableItem = {
        component: this.newItemComponent.trim(),
        dineIn: this.newItemDineIn,
        takeout: this.newItemTakeout
      };
      this.dataSource.add(newItem);
      
      // Clear the input fields after adding
      this.newItemComponent = '';
      this.newItemDineIn = null;
      this.newItemTakeout = null;
    }
  }

  deleteLatestItem() {
    this.dataSource.removeLast();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }
}