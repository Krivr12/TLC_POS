import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentTableComponent } from '../../table/component-table/component-table.component';
import { FormsModule } from '@angular/forms';
import { ProductShareService } from '../../services/product-share.service';
import { ProductApi, Product } from '../../api/products';
import { CategoryApi, Category } from '../../api/categories';
import { TagApi, Tag } from '../../api/tags';
import { SupplierApi, Supplier } from '../../api/suppliers';
import { OutletApi, Outlet } from '../../api/outlets';
import { ProductOutletPriceApi, ProductOutletPrice } from '../../api/outlets';

interface UIOutlet {
  name: string;
  price?: number;
}

@Component({
  selector: 'app-add-product',
  imports: [CommonModule, RouterModule, ComponentTableComponent, FormsModule],
  templateUrl: './add-product.component.html',
})
export class AddProductComponent implements OnInit {
  product_form: { [key: string]: any } = {
    ProductName: '',
    ProductID: '',
    VariantGroupID: '',
    SKU: '',
    CategoryID: '',
  };

  categories: Category[] = [];
  tags: Tag[] = [];
  suppliers: Supplier[] = [];
  outlets: UIOutlet[] = [
    { name: 'In-Store', price: undefined },
    { name: 'Take-Out', price: undefined },
    { name: 'GrabFood', price: undefined },
    { name: 'FoodPanda', price: undefined },
  ];

  selectedCategory: Category | null = null;
  selectedTags: Tag[] = [];
  selectedSupplier: Supplier | null = null;
  selectedOutlets: Outlet[] = [];

  selectedImage: File | null = null;
  selectedImageName: string = '';

  activeLink = 'products';

  constructor(
    private productShareService: ProductShareService,
    private productApi: ProductApi,
    private categoryApi: CategoryApi,
    private tagApi: TagApi,
    private supplierApi: SupplierApi,
    private outletApi: OutletApi,
    private productOutletPriceApi: ProductOutletPriceApi
  ) {}

  ngOnInit() {
    this.categoryApi.getAll().subscribe((data) => (this.categories = data));
    this.tagApi.getAll().subscribe((data) => (this.tags = data));
    this.supplierApi.getAll().subscribe((data) => (this.suppliers = data));
    // Outlets are initialized with default values above
  }

  ClickLinkHandler(link: string) {
    this.productShareService.setProduct(this.product_form);
    this.activeLink = link;
    localStorage.setItem('activeLink', link);
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      this.selectedImageName = this.selectedImage.name;
    }
  }

  toggleTag(tag: Tag) {
    const idx = this.selectedTags.findIndex((t) => t.id === tag.id);
    if (idx > -1) {
      this.selectedTags.splice(idx, 1);
    } else {
      this.selectedTags.push(tag);
    }
  }

  addOutlet() {
    this.outlets.push({ name: '', price: undefined });
  }

  createProduct() {
    // Build product payload
    const payload: any = {
      name: this.product_form['ProductName'],
      variant_group_id: this.product_form['VariantGroupID'],
      sku: this.product_form['SKU'],
      category_id: this.selectedCategory?.id,
      supplier_id: this.selectedSupplier?.id,
      // Add more fields as needed
    };

    // Optionally handle image upload here (not implemented)

    // Create product
    this.productApi.create(payload).subscribe((product) => {
      // Attach outlet prices to product
      this.outlets.forEach((outlet) => {
        if (outlet.price != null && outlet.name) {
          this.productOutletPriceApi
            .create({
              product_id: product.id,
              name: outlet.name,
              price: outlet.price,
            })
            .subscribe();
        }
      });

      // Attach tags to product
      this.selectedTags.forEach((tag) => {
        // If you have ProductTagApi, use it here
        // Example: this.productTagApi.create({ product_id: product.id, tag_id: tag.id }).subscribe();
      });

      // Optionally show success message or redirect
    });
  }
}
