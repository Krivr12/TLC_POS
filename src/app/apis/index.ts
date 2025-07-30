import { BranchApi } from './branches';
import { BranchStockCountApi } from './branch-stock-count';
import { CategoryApi } from './categories';
import { InventoryItemApi } from './inventory-items';
import { OutletApi } from './outlets';
import { ProductTagApi } from './product-tags';
import { ProductApi } from './products';
import { RecipeApi } from './recipes';
import { SupplierApi } from './suppliers';
import { TagApi } from './tags';
import { UserApi } from './users';

export const ApiServices = {
  branches: BranchApi,
  branchStockCount: BranchStockCountApi,
  categories: CategoryApi,
  inventoryItems: InventoryItemApi,
  outlets: OutletApi,
  productTags: ProductTagApi,
  products: ProductApi,
  recipes: RecipeApi,
  suppliers: SupplierApi,
  tags: TagApi,
  users: UserApi,
};
