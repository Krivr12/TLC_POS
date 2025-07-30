import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { BranchSelectorComponent } from '../../components/branch-selector/branch-selector.component';
import { InventoryTableComponent } from '../../components/inventory-table/inventory-table.component';
import { BranchApi, Branch } from '../../apis/branches';
import { InventoryItemApi, InventoryItem } from '../../apis/inventory-items';
import { BranchStockCountApi } from '../../apis/branch-stock-count';
import { forkJoin } from 'rxjs';

interface BranchStockCountTableRow {
  itemName: string;
  inStock: number;
  stockWarningLevel: number;
  orderedQty: number;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  templateUrl: './inventory.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    BranchSelectorComponent,
    InventoryTableComponent,
  ],
})
export class InventoryComponent {
  branches: Branch[] = [];
  inventoryItems: InventoryItem[] = [];
  branchStockCounts: any[] = [];
  filteredStockCounts: BranchStockCountTableRow[] = [];
  selectedBranchId: number | null = null;
  displayedColumns: string[] = [
    'itemName',
    'inStock',
    'stockWarningLevel',
    'orderedQty',
  ];
  loadingBranches = true;
  branchError: string | null = null;
  loadingTable = true;
  stockCountError: string | null = null;

  constructor(
    private branchApi: BranchApi,
    private inventoryItemApi: InventoryItemApi,
    private branchStockCountApi: BranchStockCountApi
  ) {
    this.initData();
  }

  initData() {
    this.loadingBranches = true;
    this.loadingTable = true;
    this.branchError = null;
    this.stockCountError = null;
    // Load branches and inventory items first
    forkJoin({
      branches: this.branchApi.getAll(),
      inventoryItems: this.inventoryItemApi.getAll(),
    }).subscribe({
      next: ({ branches, inventoryItems }) => {
        this.branches = branches;
        this.inventoryItems = inventoryItems;
        this.loadingBranches = false;
        if (branches.length > 0) {
          this.selectedBranchId = branches[0].id;
          this.loadBranchStockCounts();
        } else {
          this.loadingTable = false;
        }
      },
      error: (err) => {
        this.branchError = 'Failed to load branches or inventory items';
        this.loadingBranches = false;
        this.loadingTable = false;
      },
    });
  }

  loadBranchStockCounts() {
    this.loadingTable = true;
    this.stockCountError = null;
    this.branchStockCountApi.getAll().subscribe({
      next: (branchStockCounts) => {
        this.branchStockCounts = branchStockCounts;
        this.filterStockCounts();
        this.loadingTable = false;
      },
      error: (err) => {
        this.stockCountError = 'Failed to load branch stock counts';
        this.branchStockCounts = [];
        this.filteredStockCounts = [];
        this.loadingTable = false;
      },
    });
  }

  onBranchChange() {
    this.filterStockCounts();
  }

  filterStockCounts() {
    this.loadingTable = true;
    if (!this.selectedBranchId) {
      this.filteredStockCounts = [];
      this.loadingTable = false;
      return;
    }
    const filtered = this.branchStockCounts.filter(
      (bsc: any) => bsc.branch_id == this.selectedBranchId
    );
    this.filteredStockCounts = filtered.map((bsc: any) => {
      const item = this.inventoryItems.find((i) => i.id == bsc.item_id);
      return {
        itemName: item ? item.name : bsc.item_id,
        inStock: bsc.in_stock,
        stockWarningLevel: item ? item.stock_warning_level : 0,
        orderedQty: bsc.ordered_qty,
      };
    });
    this.loadingTable = false;
  }
}
