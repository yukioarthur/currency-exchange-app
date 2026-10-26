import messages from '../i18n/pt-BR.json';
import styles from './HistoryExplorer.module.css';
import shared from './Shared.module.css';

export default function HistoryExplorer({ rows, base, quote }) {
  return (
    <section className={shared.card} aria-labelledby="records-title">
      <h2 id="records-title">{messages['table.title']}</h2>
      <div className={shared.fields}>
        <label>Data inicial<input type="date" disabled /></label><label>Data final<input type="date" disabled /></label>
        <label>Cotação mínima<input type="number" placeholder="Sem limite" disabled /></label><label>Cotação máxima<input type="number" placeholder="Sem limite" disabled /></label>
      </div>
      <div className={shared.actions}><button disabled>Limpar filtros</button><label>Ordenar por<select disabled><option>Data crescente</option><option>Data decrescente</option><option>Cotação crescente</option><option>Cotação decrescente</option></select></label></div>
      <p>{rows.length} registros fictícios</p>
      <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Tabela de cotações ilustrativas">
        <table>
          <caption>{base} / {quote} · Dados de demonstração</caption>
          <thead><tr><th scope="col">Data</th><th scope="col">Origem</th><th scope="col">Destino</th><th scope="col">Cotação</th></tr></thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.date}>
                <td>{row.date.split('-').reverse().join('/')}</td>
                <td>{base}</td><td>{quote}</td>
                <td>{row.rate.toFixed(4).replace('.', ',')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button disabled>Exportar CSV</button><p className={shared.muted}>{messages['table.preview']}</p>
    </section>
  );
}
