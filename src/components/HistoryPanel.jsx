import messages from '../i18n/pt-BR.json';
import styles from './HistoryPanel.module.css';
import shared from './Shared.module.css';
import HistoryChart from './HistoryChart.jsx';

export default function HistoryPanel() {
  return (
    <section className={shared.card} aria-labelledby="history-title">
      <h2 id="history-title">{messages['chart.title']}</h2>
      <div className={shared.actions}><button disabled aria-pressed="true">Par de moedas</button><button disabled aria-pressed="false">Valorização da moeda</button></div>
      <div className={shared.fields}>
        <label>Moeda analisada<select disabled><option>EUR</option></select></label>
        <label>Moeda de referência<select disabled><option>BRL</option></select></label>
        <label>Período<select disabled><option>7 dias</option><option>15 dias</option><option>30 dias</option><option>3 meses</option><option>6 meses</option><option>1 ano</option><option>5 anos</option><option>10 anos</option></select></label>
      </div>
      <p className={shared.muted}>{messages['chart.referenceNote']}</p>
      <div className={styles.chartHeading}><h3>EUR / BRL</h3><label className={styles.inline}><input type="checkbox" disabled />Variação acumulada (%)</label></div>
      <div className={styles.stats}>
        <div><span>Variação no período</span><strong className={shared.positive}>+1,64%</strong></div>
        <div><span>Mínima</span><strong>6,1000</strong></div>
        <div><span>Máxima</span><strong>6,2000</strong></div>
        <div><span>Média</span><strong>6,1620</strong></div>
      </div>
      <p className={shared.muted}>BRL por 1 EUR · 5 observações fictícias</p>
      {/* Ilustração estática: a biblioteca de gráficos será estudada na etapa 12. */}
      <HistoryChart />
      <p className={shared.muted}>{messages['chart.daily']} · Gráfico ilustrativo</p>
    </section>
  );
}
