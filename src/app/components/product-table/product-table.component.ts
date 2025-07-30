import { MatTableModule } from '@angular/material/table';
import { Component, Input } from '@angular/core';
import { Product } from '../../apis/products';
import { ProductTableService } from './product-table.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  standalone: true,
  imports: [MatTableModule],
})
export class ProductTableComponent {
  @Input() pagedProducts: Product[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'sku',
    'category_id',
    'variant_group_id',
  ];
}
export { ProductTableService };
