import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentTableComponent } from '../../components/component-table/component-table.component';
import { FormsModule } from '@angular/forms';
import { ProductShareService } from '../../services/product-share.service';
import { ProductApi, Product } from '../../api/products';
import { CategoryApi, Category } from '../../api/categories';
import { TagApi, Tag } from '../../api/tags';
import { SupplierApi, Supplier } from '../../api/suppliers';
import { OutletApi, Outlet } from '../../api/outlets';
import { ProductOutletPriceApi, ProductOutletPrice } from '../../api/outlets';
import { RecipeApi } from '../../api/recipes';
import { ProductTagApi } from '../../api/product-tags';

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

  @ViewChild(ComponentTableComponent) componentTable!: ComponentTableComponent;

  constructor(
    private productShareService: ProductShareService,
    private productApi: ProductApi,
    private categoryApi: CategoryApi,
    private tagApi: TagApi,
    private supplierApi: SupplierApi,
    private outletApi: OutletApi,
    private productOutletPriceApi: ProductOutletPriceApi,
    private recipeApi: RecipeApi,
    private productTagApi: ProductTagApi
  ) {}

  ngOnInit() {
    this.categoryApi.getAll().subscribe((data) => (this.categories = data));
    this.tagApi.getAll().subscribe((data) => (this.tags = data));
    this.supplierApi.getAll().subscribe((data) => (this.suppliers = data));
    // Load existing outlets to resolve outlet_id by name when creating prices
    this.outletApi.getAll().subscribe((data) => (this.selectedOutlets = data));
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
    // 1) Create Product (include provided product_id if any)
    const maybeId = this.product_form['ProductID']
      ? Number(this.product_form['ProductID'])
      : undefined;
    const productPayload: any = {
      ...(Number.isFinite(maybeId) ? { id: maybeId } : {}),
      name: this.product_form['ProductName'],
      variant_group_id: this.product_form['VariantGroupID'],
      sku: this.product_form['SKU'],
      category_id: this.selectedCategory?.id,
      supplier_id: this.selectedSupplier?.id,
    };

    this.productApi.create(productPayload).subscribe((product) => {
      const productId = product.id;
      
      // 2) Create Outlet prices (send only product_id, name, price)
      this.outlets.forEach((outlet) => {
        if (outlet.price != null && outlet.name) {
          const outletPayload: any = {
            product_id: productId,
            name: outlet.name,
            price: outlet.price,
          };
          this.productOutletPriceApi.create(outletPayload as any).subscribe();
        }
      });
      // 3) Create Recipe components from Component Table
      if (this.componentTable?.dataSource?.data?.length) {
        this.componentTable.dataSource.data.forEach((row: any) => {
          const recipePayload: any = {
            product_id: productId,
            recipe: row.component, // logical recipe item name
            item_id: row.item_id,
            quantity: row.quantity ?? 1,
            isTakeout: false,
            // keep existing fields for compatibility
            name: row.component,
            description: `Qty: ${row.quantity ?? 1} ${row['Quantity'] || ''}`,
          };
          this.recipeApi.create(recipePayload as any).subscribe();
        });
      }

      // 4) Attach Tags (basic)
      this.selectedTags.forEach((tag) => {
        this.productTagApi
          .create({
            name: tag.name,
          })
          .subscribe();
      });
    });
  }
}
