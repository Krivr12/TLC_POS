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
          const formatted: ProductTableItem[] = raw.map(row => ({
            id: Number(row.id),
            name: row.name?.trim(),
          }));
          resolve(formatted);
        } catch (error) {
          reject('CSV mapping error: ' + error);
        }
      },
      error: (err: any) => reject('CSV parsing error: ' + err)
    });
  });
}
