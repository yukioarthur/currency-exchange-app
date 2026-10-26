import CurrencySelect from './CurrencySelect.jsx';
import messages from '../i18n/pt-BR.json';
import styles from './HistoryPanel.module.css';
import shared from './Shared.module.css';
import HistoryChart from './HistoryChart.jsx';

export default function HistoryPanel({ currencies, periods, rows, base, quote }) {
  const rates = rows.map((row) => row.rate);
  const minimum = rates.length ? Math.min(...rates) : null;
  const maximum = rates.length ? Math.max(...rates) : null;
  const average = rates.length ? rates.reduce((total, rate) => total + rate, 0) / rates.length : null;
  const change = rows.length >= 2 && rows[0].rate > 0
    ? (rows[rows.length - 1].rate / rows[0].rate - 1) * 100 : null;
  const formatRate = (value) => value === null ? '—' : value.toFixed(4).replace('.', ',');
  return (
    <section className={shared.card} aria-labelledby="history-title">
      <h2 id="history-title">{messages['chart.title']}</h2>
      <div className={shared.actions}><button disabled aria-pressed="true">Par de moedas</button><button disabled aria-pressed="false">Valorização da moeda</button></div>
      <div className={shared.fields}>
        <CurrencySelect label="Moeda analisada" currencies={currencies} selected={base} />
        <CurrencySelect label="Moeda de referência" currencies={currencies} selected={quote} />
        <label>Período<select disabled defaultValue="7d">
          {periods.map((period) => <option key={period.id} value={period.id}>{period.label}</option>)}
        </select></label>
      </div>
      <p className={shared.muted}>{messages['chart.referenceNote']}</p>
      <div className={styles.chartHeading}><h3>{base} / {quote}</h3><label className={styles.inline}><input type="checkbox" disabled />Variação acumulada (%)</label></div>
      <div className={styles.stats}>
        <div><span>Variação no período</span><strong>{change === null ? '—' : change.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: 'exceptZero' }) + '%'}</strong></div>
        <div><span>Mínima</span><strong>{formatRate(minimum)}</strong></div>
        <div><span>Máxima</span><strong>{formatRate(maximum)}</strong></div>
        <div><span>Média</span><strong>{formatRate(average)}</strong></div>
      </div>
      <p className={shared.muted}>{quote} por 1 {base} · {rows.length} observações fictícias</p>
      {/* Ilustração estática: a biblioteca de gráficos será estudada na etapa 12. */}
      <HistoryChart rows={rows} base={base} quote={quote} />
      <p className={shared.muted}>{messages['chart.daily']} · Gráfico ilustrativo</p>
    </section>
  );
}
