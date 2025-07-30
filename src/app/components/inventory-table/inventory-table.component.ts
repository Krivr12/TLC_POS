import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

interface BranchStockCountTableRow {
  itemName: string;
  inStock: number;
  stockWarningLevel: number;
  orderedQty: number;
}

@Component({
  selector: 'app-inventory-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './inventory-table.component.html',
})
export class InventoryTableComponent {
  @Input() filteredStockCounts: BranchStockCountTableRow[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() loading: boolean = false;
  @Input() error: string | null = null;
}
