import { percentageChange } from '../utils/currency.js';
import CurrencySelect from './CurrencySelect.jsx';
import styles from './HistoryPanel.module.css';
import shared from './Shared.module.css';
import HistoryChart from './HistoryChart.jsx';

export default function HistoryPanel({ currencies, periods, rows, analysis, onChange, ui }) {
  const { base, quote, period, indexed } = analysis;
  const rates = rows.map((row) => row.rate);
  const minimum = rates.length ? Math.min(...rates) : null;
  const maximum = rates.length ? Math.max(...rates) : null;
  const average = rates.length ? rates.reduce((total, rate) => total + rate, 0) / rates.length : null;
  const change = rows.length >= 2 ? percentageChange(rows[0].rate, rows[rows.length - 1].rate) : null;
  const formatRate = (value) => value === null ? '—' : ui.number(value);
  return (
    <section className={shared.card} aria-labelledby="history-title">
      <h2 id="history-title">{ui.t('chart.title')}</h2>
      <div className={shared.actions}>
        <button aria-pressed={!indexed} onClick={() => onChange('indexed', false)}>{ui.t('chart.pair')}</button>
        <button aria-pressed={indexed} onClick={() => onChange('indexed', true)}>{ui.t('chart.individual')}</button>
      </div>
      <div className={shared.fields}>
        <CurrencySelect label={ui.t('chart.currency')} currencies={currencies} selected={base} onChange={(value) => onChange('base', value)} ui={ui} />
        <CurrencySelect label={ui.t('chart.reference')} currencies={currencies} selected={quote} onChange={(value) => onChange('quote', value)} ui={ui} />
        <label>{ui.t('chart.period')}<select value={period} onChange={(event) => onChange('period', event.target.value)}>
          {periods.map((item) => <option key={item.id} value={item.id}>{ui.t('period.' + item.id)}</option>)}
        </select></label>
      </div>
      <p className={shared.muted}>{ui.t('chart.referenceNote')}</p>
      <div className={styles.chartHeading}><h3>{base} / {quote}</h3><label className={styles.inline}><input type="checkbox" checked={indexed} onChange={(event) => onChange('indexed', event.target.checked)} />{ui.t('chart.indexed')}</label></div>
      <div className={styles.stats}>
        <div><span>{ui.t('chart.change')}</span><strong>{change === null ? '—' : (change > 0 ? '+' : '') + ui.number(change, 2) + '%'}</strong></div>
        <div><span>{ui.t('chart.minimum')}</span><strong>{formatRate(minimum)}</strong></div>
        <div><span>{ui.t('chart.maximum')}</span><strong>{formatRate(maximum)}</strong></div>
        <div><span>{ui.t('chart.average')}</span><strong>{formatRate(average)}</strong></div>
      </div>
      <p className={shared.muted}>{indexed ? ui.t('chart.percent') : ui.t('chart.unit', { base, quote })} · {ui.t('chart.observations', { count: rows.length })}</p>
      <HistoryChart rows={rows} base={base} quote={quote} indexed={indexed} ui={ui} />
      <p className={shared.muted}>{ui.t('chart.demo')}</p>
    </section>
  );
}
