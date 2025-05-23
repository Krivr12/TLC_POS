

import { readFileSync } from 'fs';
import { csvToElementArray } from './csv-parser.util'; // adjust path if needed

// ✅ Read the actual CSV file
const csvPath = 'src/assets/elements.csv';
const csvContent = readFileSync(csvPath, 'utf-8');

// ✅ Parse it using your reusable function
csvToElementArray(csvContent)
  .then(data => {
    console.log('✅ Parsed Data:', data);
  })
  .catch(err => {
    console.error('❌ Error:', err);
  });
