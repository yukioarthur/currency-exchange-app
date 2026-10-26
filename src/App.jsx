import messages from './i18n/pt-BR.json';
import styles from './App.module.css';

// Dados de demonstração. A consulta à API entra em uma etapa posterior.
const example = { amount: 100, base: 'EUR', quote: 'BRL', rate: 6.2 };

export default function App() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.brand}>CURRENCY EXCHANGE</p>
          <h1>{messages['app.title']}</h1>
          <p>{messages['app.subtitle']}</p>
        </div>
        <div className={styles.preferences}>
          <label>Idioma<select disabled defaultValue="pt-BR"><option value="pt-BR">Português</option><option value="en-US">English</option></select></label>
          <label>Tema<select disabled defaultValue="light"><option value="light">Claro</option><option value="dark">Escuro</option></select></label>
        </div>
      </header>

      <p className={styles.notice}>Etapa 03 · Interface estática em React · Todos os valores são fictícios. Os controles serão ativados nas próximas etapas.</p>

      <section className={styles.card} aria-labelledby="converter-title">
        <h2 id="converter-title">{messages['converter.title']}</h2>
        <div className={styles.fields}>
          <label>Valor<input type="number" value={example.amount} readOnly /></label>
          <label>De<select disabled defaultValue="EUR"><option value="EUR">EUR — Euro</option></select></label>
          <label>Para<select disabled defaultValue="BRL"><option value="BRL">BRL — Real brasileiro</option></select></label>
        </div>
        <div className={styles.actions}><button disabled>Converter</button><button disabled>Inverter moedas</button></div>
        <div className={styles.result}>
          <span>{example.amount} {example.base} =</span>
          <strong>R$ {(example.amount * example.rate).toFixed(2).replace('.', ',')}</strong>
          <span>1 EUR = 6,2000 BRL · Cotação ilustrativa de 22/10/2026</span>
        </div>
        <p className={styles.muted}>{messages['converter.preview']}</p>
      </section>

      <section className={styles.card} aria-labelledby="history-title">
        <h2 id="history-title">{messages['chart.title']}</h2>
        <div className={styles.actions}><button disabled aria-pressed="true">Par de moedas</button><button disabled aria-pressed="false">Valorização da moeda</button></div>
        <div className={styles.fields}>
          <label>Moeda analisada<select disabled><option>EUR</option></select></label>
          <label>Moeda de referência<select disabled><option>BRL</option></select></label>
          <label>Período<select disabled><option>7 dias</option><option>15 dias</option><option>30 dias</option><option>3 meses</option><option>6 meses</option><option>1 ano</option><option>5 anos</option><option>10 anos</option></select></label>
        </div>
        <p className={styles.muted}>{messages['chart.referenceNote']}</p>
        <div className={styles.chartHeading}><h3>EUR / BRL</h3><label className={styles.inline}><input type="checkbox" disabled />Variação acumulada (%)</label></div>
        <div className={styles.stats}>
          <div><span>Variação no período</span><strong className={styles.positive}>+1,64%</strong></div>
          <div><span>Mínima</span><strong>6,1000</strong></div>
          <div><span>Máxima</span><strong>6,2000</strong></div>
          <div><span>Média</span><strong>6,1620</strong></div>
        </div>
        <p className={styles.muted}>BRL por 1 EUR · 5 observações fictícias</p>
        {/* Ilustração estática: a biblioteca de gráficos será estudada na etapa 12. */}
        <svg className={styles.chart} viewBox="0 0 800 250" role="img" aria-labelledby="chart-description">
          <title id="chart-description">Exemplo fictício: EUR/BRL sobe de 6,10 em 16/10/2026 para 6,20 em 22/10/2026. Os cinco valores estão na tabela abaixo.</title>
          <path className={styles.grid} d="M60 30H760 M60 115H760 M60 200H760" />
          <text x="0" y="35">6,20</text><text x="0" y="120">6,15</text><text x="0" y="205">6,10</text>
          <path className={styles.area} d="M60 200L410 132L527 64L643 47L760 30V200Z" />
          <path className={styles.series} d="M60 200L410 132L527 64L643 47L760 30" />
          <circle className={styles.point} cx="60" cy="200" r="5" /><circle className={styles.point} cx="410" cy="132" r="5" /><circle className={styles.point} cx="527" cy="64" r="5" /><circle className={styles.point} cx="643" cy="47" r="5" /><circle className={styles.point} cx="760" cy="30" r="5" />
          <text x="60" y="235">16/10</text><text x="410" y="235" textAnchor="middle">19/10</text><text x="760" y="235" textAnchor="end">22/10</text>
        </svg>
        <p className={styles.muted}>{messages['chart.daily']} · Gráfico ilustrativo</p>
      </section>

      <section className={styles.card} aria-labelledby="market-title">
        <h2 id="market-title">{messages['market.title']}</h2>
        <div className={styles.indicators}>
          <article><h3>Ibovespa</h3><strong>128.000 pontos</strong><p className={styles.positive}>+0,80% no dia · Exemplo fictício</p><p className={styles.muted}>Provedor a validar</p><span className={styles.badge}>Integração pendente</span></article>
          <article><h3>Meta Selic</h3><strong>10,00% ao ano</strong><p>Taxa-alvo definida pelo Copom · Exemplo fictício</p><p className={styles.muted}>Fonte planejada: Banco Central · SGS 432</p><span className={styles.badge}>Integração pendente</span></article>
        </div>
        <p className={styles.muted}>{messages['market.selicNote']}</p>
      </section>

      <section className={styles.card} aria-labelledby="records-title">
        <h2 id="records-title">{messages['table.title']}</h2>
        <div className={styles.fields}>
          <label>Data inicial<input type="date" disabled /></label><label>Data final<input type="date" disabled /></label>
          <label>Cotação mínima<input type="number" placeholder="Sem limite" disabled /></label><label>Cotação máxima<input type="number" placeholder="Sem limite" disabled /></label>
        </div>
        <div className={styles.actions}><button disabled>Limpar filtros</button><label>Ordenar por<select disabled><option>Data crescente</option><option>Data decrescente</option><option>Cotação crescente</option><option>Cotação decrescente</option></select></label></div>
        <p>5 registros fictícios</p>
        <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Tabela de cotações ilustrativas">
          <table>
            <caption>EUR / BRL · Dados de demonstração</caption>
            <thead><tr><th scope="col">Data</th><th scope="col">Origem</th><th scope="col">Destino</th><th scope="col">Cotação</th></tr></thead>
            <tbody>
              <tr><td>16/10/2026</td><td>EUR</td><td>BRL</td><td>6,1000</td></tr>
              <tr><td>19/10/2026</td><td>EUR</td><td>BRL</td><td>6,1400</td></tr>
              <tr><td>20/10/2026</td><td>EUR</td><td>BRL</td><td>6,1800</td></tr>
              <tr><td>21/10/2026</td><td>EUR</td><td>BRL</td><td>6,1900</td></tr>
              <tr><td>22/10/2026</td><td>EUR</td><td>BRL</td><td>6,2000</td></tr>
            </tbody>
          </table>
        </div>
        <button disabled>Exportar CSV</button><p className={styles.muted}>{messages['table.preview']}</p>
      </section>
      <footer className={styles.muted}>Projeto de aprendizagem · React + Vite · Etapa 03</footer>
    </main>
  );
}
