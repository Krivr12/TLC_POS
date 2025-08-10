import {
  AfterViewInit,
  Component,
  ViewChild,
  Input,
  OnInit,
} from '@angular/core';
// ...existing imports...
import {
  InventoryItemApi,
  InventoryItem as ApiInventoryItem,
} from '../../api/inventory-items';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';

export interface InventoryItem {
  item_id: string;
  name: string;
  cost: number;
  unit: string;
}

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
export class ComponentTableComponent implements AfterViewInit, OnInit {
  inventoryItems: InventoryItem[] = [];
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
  selectedInventoryItemId: string = '';

  constructor(private inventoryItemApi: InventoryItemApi) {}

  ngOnInit(): void {
    this.inventoryItemApi.getAll().subscribe({
      next: (items: ApiInventoryItem[]) => {
        // Map API items to local InventoryItem interface and sort alphabetically
        this.inventoryItems = items
          .map((item) => ({
            item_id: item.id.toString(),
            name: item.name,
            cost: item.cost,
            unit: item.unit,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
      },
      error: (err) => {
        console.error('Failed to fetch inventory items', err);
      },
    });
  }

  onInventorySelect(row: any): void {
    const selected = this.inventoryItems.find(
      (item) => item.item_id === row.item_id
    );
    if (selected) {
      row.outletPrices['Dine-in'] = selected.cost;
      row['Dine-inUnit'] = selected.unit;
      row.outletPrices['Take-out'] = selected.cost;
      row['Take-outUnit'] = selected.unit;
    }
  }

  addNewItem(): void {
    if (this.selectedInventoryItemId) {
      const selectedItem = this.inventoryItems.find(
        (item) => item.item_id === this.selectedInventoryItemId
      );
      if (selectedItem) {
        const outletPrices: { [outletName: string]: number | null } = {};
        this.outlets.forEach((outlet) => {
          outletPrices[outlet.name] = selectedItem.cost;
        });
        const newItem: ComponentTableItem = {
          component: selectedItem.name,
          outletPrices,
          ['Dine-inUnit']: selectedItem.unit,
          ['Take-outUnit']: selectedItem.unit,
          item_id: selectedItem.item_id,
        } as any;
        this.dataSource.data = [...this.dataSource.data, newItem];
        this.selectedInventoryItemId = '';
      }
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
