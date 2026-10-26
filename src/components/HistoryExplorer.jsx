import styles from './HistoryExplorer.module.css';
import shared from './Shared.module.css';
export default function HistoryExplorer({ rows, base, quote, ui }) {
  return (
    <section className={shared.card} aria-labelledby="records-title">
      <h2 id="records-title">{ui.t('table.title')}</h2>
      <div className={shared.fields}>
        <label>{ui.t('table.start')}<input type="date" disabled /></label><label>{ui.t('table.end')}<input type="date" disabled /></label>
        <label>{ui.t('table.min')}<input type="number" placeholder={ui.t('common.noLimit')} disabled /></label><label>{ui.t('table.max')}<input type="number" placeholder={ui.t('common.noLimit')} disabled /></label>
      </div>
      <div className={shared.actions}><button disabled>{ui.t('table.clear')}</button><label>{ui.t('table.sort')}<select disabled><option>{ui.t('table.dateAsc')}</option><option>{ui.t('table.dateDesc')}</option><option>{ui.t('table.rateAsc')}</option><option>{ui.t('table.rateDesc')}</option></select></label></div>
      <p>{ui.t('table.count', { count: rows.length })}</p>
      <div className={styles.tableWrap} tabIndex={0} role="region" aria-label={ui.t('table.title')}>
        <table>
          <caption>{base} / {quote} · {ui.t('common.sample')}</caption>
          <thead><tr><th scope="col">{ui.t('table.date')}</th><th scope="col">{ui.t('table.base')}</th><th scope="col">{ui.t('table.quote')}</th><th scope="col">{ui.t('table.rate')}</th></tr></thead>
          <tbody>{rows.map((row) => <tr key={row.date}><td>{ui.date(row.date)}</td><td>{base}</td><td>{quote}</td><td>{ui.number(row.rate)}</td></tr>)}</tbody>
        </table>
      </div>
      <button disabled>{ui.t('table.export')}</button><p className={shared.muted}>{ui.t('table.preview')}</p>
    </section>
  );
}
