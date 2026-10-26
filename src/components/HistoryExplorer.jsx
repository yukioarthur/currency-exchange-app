import messages from '../i18n/pt-BR.json';
import styles from './HistoryExplorer.module.css';
import shared from './Shared.module.css';

export default function HistoryExplorer() {
  return (
    <section className={shared.card} aria-labelledby="records-title">
      <h2 id="records-title">{messages['table.title']}</h2>
      <div className={shared.fields}>
        <label>Data inicial<input type="date" disabled /></label><label>Data final<input type="date" disabled /></label>
        <label>Cotação mínima<input type="number" placeholder="Sem limite" disabled /></label><label>Cotação máxima<input type="number" placeholder="Sem limite" disabled /></label>
      </div>
      <div className={shared.actions}><button disabled>Limpar filtros</button><label>Ordenar por<select disabled><option>Data crescente</option><option>Data decrescente</option><option>Cotação crescente</option><option>Cotação decrescente</option></select></label></div>
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
      <button disabled>Exportar CSV</button><p className={shared.muted}>{messages['table.preview']}</p>
    </section>
  );
}
