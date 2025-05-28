import * as Papa from 'papaparse';
import { ProductTableItem } from '../product-table/product-table-datasource'; // Adjust the path if needed

export function csvToElementArray(csv: string): Promise<ProductTableItem[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        try {
          const raw = result.data as any[];
          console.log('Raw parsed data:', raw); // 👈 Log raw parsed rows

          const formatted: ProductTableItem[] = raw.map(row => ({
            // id: Number(row.id),
            // name: row.name?.trim(),

            ProductName: row.ProductName?.trim(),
            ProductID: Number(row.ProductID),
            VariantGroupID: row.ProductName?.trim(),
            SKU: row.ProductName?.trim(),
            CategoryID: row.ProductName?.trim()

          }));

          console.log('Formatted ProductTableItem[]:', formatted); // 👈 Log transformed data

          resolve(formatted);
        } catch (error) {
          reject('CSV mapping error: ' + error);
        }
      },
      error: (err: any) => reject('CSV parsing error: ' + err)
    });
  });
}