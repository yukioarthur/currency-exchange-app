import { useState } from 'react';
import { filterHistory, sortHistory } from '../utils/history.js';
import { downloadHistory } from '../utils/csv.js';
import styles from './HistoryExplorer.module.css';
import shared from './Shared.module.css';

const emptyFilters = { from: '', to: '', min: '', max: '' };
export default function HistoryExplorer({ rows, base, quote, status, ui }) {
  const [filters, setFilters] = useState(emptyFilters);
  const [order, setOrder] = useState('dateAsc');
  let visibleRows = [];
  let error = '';
  try {
    visibleRows = sortHistory(filterHistory(rows, filters), order);
  } catch {
    error = 'validation.range';
  }
  function change(field, value) {
    setFilters(previous => ({ ...previous, [field]: value }));
  }
  return (
    <section className={shared.card} aria-labelledby="records-title">
      <h2 id="records-title">{ui.t('table.title')}</h2>
      <div className={shared.fields} aria-describedby={error ? "filter-error" : undefined}>
        <label>{ui.t('table.start')}<input type="date" value={filters.from} onChange={event => change('from', event.target.value)} /></label>
        <label>{ui.t('table.end')}<input type="date" value={filters.to} onChange={event => change('to', event.target.value)} /></label>
        <label>{ui.t('table.min')}<input type="number" min="0" step="any" value={filters.min} placeholder={ui.t('common.noLimit')} onChange={event => change('min', event.target.value)} /></label>
        <label>{ui.t('table.max')}<input type="number" min="0" step="any" value={filters.max} placeholder={ui.t('common.noLimit')} onChange={event => change('max', event.target.value)} /></label>
      </div>
      <div className={shared.actions}>
        <button onClick={() => { setFilters(emptyFilters); setOrder('dateAsc'); }}>{ui.t('table.clear')}</button>
        <label>{ui.t('table.sort')}<select value={order} onChange={event => setOrder(event.target.value)}>
          {['dateAsc', 'dateDesc', 'rateAsc', 'rateDesc'].map(value => <option key={value} value={value}>{ui.t('table.' + value)}</option>)}
        </select></label>
      </div>
      {error && <p id="filter-error" role="alert">{ui.t(error)}</p>}
      <p role="status">{ui.t(status === 'loading' ? 'status.loading' : status === 'error' ? 'status.error' : status === 'idle' ? 'api.historyPrompt' : 'table.count', { count: visibleRows.length })}</p>
      {!error && !visibleRows.length && (status === 'success' || status === 'empty') && <p>{ui.t('status.empty')}</p>}
      <div className={styles.tableWrap} tabIndex={0} role="region" aria-label={ui.t('table.title')}>
        <table>
          <caption>{base} / {quote} · {ui.t('api.source')}</caption>
          <thead><tr><th scope="col">{ui.t('table.date')}</th><th scope="col">{ui.t('table.base')}</th><th scope="col">{ui.t('table.quote')}</th><th scope="col">{ui.t('table.rate')}</th></tr></thead>
          <tbody>{visibleRows.map(row => <tr key={row.date}><td>{ui.date(row.date)}</td><td>{base}</td><td>{quote}</td><td>{ui.number(row.rate)}</td></tr>)}</tbody>
        </table>
      </div>
      <button disabled={!visibleRows.length || status !== 'success' || !!error} onClick={() => downloadHistory(visibleRows, base, quote)}>{ui.t('table.export')}</button>
      <p className={shared.muted}>{ui.t('table.exportNote')}</p>
    </section>
  );
}
