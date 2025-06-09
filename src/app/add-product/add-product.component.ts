import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentTableComponent } from "../table/component-table/component-table.component";
import { FormsModule } from '@angular/forms';
import { ProductShareService } from '../utils/product-share.service';

@Component({
  selector: 'app-add-product',
  imports: [CommonModule, RouterModule, ComponentTableComponent, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  product_form = {
    ProductName: '',
    ProductID: '',
    VariantGroupID: '',
    SKU: '',
    CategoryID: '',
  };

  constructor(private productShareService: ProductShareService) {}

  activeLink: string = 'products';

  ClickLinkHandler(link: string) {
      console.log('Product Form: ', this.product_form)

      this.productShareService.setProduct(this.product_form)

      this.activeLink = link;
      localStorage.setItem('activeLink', link);
      // No overlay logic, no preventDefault
    }
}