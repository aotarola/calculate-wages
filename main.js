'use strict';

const { PdfReader, TableParser } = require('pdfreader');
const console = require('console');

const columnQuantitizer = item => parseFloat(item.x) >= 20;

let table = new TableParser();
let acc = 0;

new PdfReader().parseFileItems('payslips.pdf', (err, item) => {
  if (err) console.error('error:', err);
  else if (!item || item.page) {
    const current = table.getMatrix()[6];
    if (Array.isArray(current) && current.length > 0) {
      const gross = current[0][1].text.replace(',', '');
      acc += parseFloat(gross);
    }

    if (!item) {
      console.log(acc);
    }
    table = new TableParser();
  } else if (item.text) table.processItem(item, columnQuantitizer(item));
});
