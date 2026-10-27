function cell(value) {
  return '"' + String(value).replaceAll('"', '""') + '"';
}

// Datas ISO e números sem arredondamento mantêm o arquivo independente do idioma.
export function historyCsv(rows, base, quote) {
  if (!rows.length) throw new Error('status.empty');
  if (!/^[A-Z]{3}$/.test(base) || !/^[A-Z]{3}$/.test(quote)) throw new Error('validation.currencies');
  return '\uFEFF' + [['date', 'base', 'quote', 'rate'], ...rows.map(row => [row.date, base, quote, row.rate])]
    .map(row => row.map(cell).join(',')).join('\r\n') + '\r\n';
}

export function downloadHistory(rows, base, quote) {
  const csv = historyCsv(rows, base, quote);
  const dates = rows.map(row => row.date).sort();
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = ['currency', base, quote, dates[0], dates.at(-1)].join('-') + '.csv';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
